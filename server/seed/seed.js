require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const connectDB = require('../config/database');
const Report = require('../models/Report');
const User = require('../models/User');
const Cluster = require('../models/Cluster');

const seedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'reports.json'), 'utf-8'));

const seed = async () => {
  try {
    await connectDB();
    console.log('Connected to database');

    // Clear existing data
    await Report.deleteMany({});
    await Cluster.deleteMany({});
    console.log('Cleared existing reports and clusters');

    // Create default admin user if not exists
    const adminExists = await User.findOne({ email: 'admin@civicflow.in' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@civicflow.in',
        password: 'admin123',
        role: 'admin',
      });
      console.log('Created admin user: admin@civicflow.in / admin123');
    }

    const officerExists = await User.findOne({ email: 'officer@civicflow.in' });
    if (!officerExists) {
      await User.create({
        name: 'Municipal Officer',
        email: 'officer@civicflow.in',
        password: 'officer123',
        role: 'officer',
      });
      console.log('Created officer user: officer@civicflow.in / officer123');
    }

    const citizenExists = await User.findOne({ email: 'citizen@civicflow.in' });
    if (!citizenExists) {
      await User.create({
        name: 'Demo Citizen',
        email: 'citizen@civicflow.in',
        password: 'citizen123',
        role: 'citizen',
      });
      console.log('Created citizen user: citizen@civicflow.in / citizen123');
    }

    // Prepare reports with proper dates
    const now = new Date();
    const reportsToInsert = seedData.map((r, index) => {
      const daysAgo = Math.floor(Math.random() * 20) + 1;
      const createdAt = new Date(now - daysAgo * 24 * 60 * 60 * 1000);
      const statusHistory = [
        {
          status: 'Submitted',
          at: createdAt,
          byRole: 'system',
          note: 'Report submitted via seed',
        },
      ];

      if (r.status === 'Reviewed' || r.status === 'Assigned' || r.status === 'In Progress' || r.status === 'Resolved') {
        statusHistory.push({
          status: 'Reviewed',
          at: new Date(createdAt.getTime() + 2 * 60 * 60 * 1000),
          byRole: 'officer',
          note: 'Initial review completed',
        });
      }
      if (r.status === 'Assigned' || r.status === 'In Progress' || r.status === 'Resolved') {
        statusHistory.push({
          status: 'Assigned',
          at: new Date(createdAt.getTime() + 6 * 60 * 60 * 1000),
          byRole: 'admin',
          note: `Assigned to ${r.assignee}`,
        });
      }
      if (r.status === 'In Progress' || r.status === 'Resolved') {
        statusHistory.push({
          status: 'In Progress',
          at: new Date(createdAt.getTime() + 24 * 60 * 60 * 1000),
          byRole: 'officer',
          note: 'Work has started',
        });
      }
      if (r.status === 'Resolved') {
        statusHistory.push({
          status: 'Resolved',
          at: new Date(createdAt.getTime() + 3 * 24 * 60 * 60 * 1000),
          byRole: 'officer',
          note: 'Issue has been resolved',
        });
      }

      return {
        ...r,
        statusHistory,
        createdAt,
        updatedAt: createdAt,
      };
    });

    await Report.insertMany(reportsToInsert);
    console.log(`Inserted ${reportsToInsert.length} seed reports`);

    // Run hotspot detection
    const dbscan = require('../utils/dbscan');
    const { DBSCAN_RADIUS_METERS, DBSCAN_MIN_POINTS } = require('../config/constants');
    
    const points = reportsToInsert.map((r) => ({
      id: r.reportId,
      lat: r.location.lat,
      lng: r.location.lng,
    }));

    const clusters = dbscan(points, DBSCAN_RADIUS_METERS, DBSCAN_MIN_POINTS);
    console.log(`Detected ${clusters.length} geographic cluster(s)`);

    for (let i = 0; i < clusters.length; i++) {
      const cluster = clusters[i];
      const clusterReports = reportsToInsert.filter((r) => cluster.pointIds.includes(r.reportId));
      const catFreq = {};
      clusterReports.forEach((r) => {
        catFreq[r.categoryFinal] = (catFreq[r.categoryFinal] || 0) + 1;
      });
      const dominantCategory = Object.entries(catFreq).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Other';

      await Cluster.create({
        clusterId: `CLU-${String(i + 1).padStart(3, '0')}`,
        center: cluster.center,
        radiusMeters: Math.round(cluster.radiusMeters),
        reportCount: cluster.pointIds.length,
        reportIds: cluster.pointIds,
        dominantCategory,
        categories: Object.keys(catFreq),
        description: `Hotspot with ${cluster.pointIds.length} reports. Main issue: ${dominantCategory}`,
      });
    }

    console.log('\n=== SEED COMPLETE ===');
    console.log(`Reports: ${reportsToInsert.length}`);
    console.log(`Clusters: ${clusters.length}`);
    console.log('\nTest Accounts:');
    console.log('  Admin:   admin@civicflow.in   / admin123');
    console.log('  Officer: officer@civicflow.in / officer123');
    console.log('  Citizen: citizen@civicflow.in / citizen123');
    console.log('\nSample Report IDs: CF-1001 through CF-1035');
    
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();

