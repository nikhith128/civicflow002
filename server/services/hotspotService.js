const Report = require('../models/Report');
const Cluster = require('../models/Cluster');
const dbscan = require('../utils/dbscan');
const { DBSCAN_RADIUS_METERS, DBSCAN_MIN_POINTS } = require('../config/constants');

/**
 * Run DBSCAN on all active reports and update clusters
 */
const updateHotspots = async () => {
  try {
    const reports = await Report.find({ status: { $ne: 'Resolved' } }).lean();

    const points = reports.map((r) => ({
      id: r.reportId,
      lat: r.location.lat,
      lng: r.location.lng,
      category: r.categoryFinal,
    }));

    const clusters = dbscan(points, DBSCAN_RADIUS_METERS, DBSCAN_MIN_POINTS);

    // Clear old clusters
    await Cluster.deleteMany({});

    for (let i = 0; i < clusters.length; i++) {
      const cluster = clusters[i];
      const clusterReports = reports.filter((r) => cluster.pointIds.includes(r.reportId));
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
        lastUpdated: new Date(),
      });

      // Update reports with cluster membership
      await Report.updateMany(
        { reportId: { $in: cluster.pointIds } },
        { $set: { clusterId: `CLU-${String(i + 1).padStart(3, '0')}` } }
      );
    }

    // Clear cluster from reports not in any cluster
    const allClusteredIds = clusters.flatMap((c) => c.pointIds);
    await Report.updateMany(
      { reportId: { $nin: allClusteredIds } },
      { $set: { clusterId: null } }
    );

    return clusters.length;
  } catch (error) {
    console.error('Hotspot detection error:', error.message);
    return 0;
  }
};

const getHotspots = async () => {
  return await Cluster.find().sort({ reportCount: -1 }).lean();
};

module.exports = { updateHotspots, getHotspots };

