const mongoose = require('mongoose');

const clusterSchema = new mongoose.Schema(
  {
    clusterId: { type: String, unique: true, required: true },
    center: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    radiusMeters: { type: Number, default: 250 },
    reportCount: { type: Number, default: 0 },
    reportIds: [{ type: String }],
    dominantCategory: { type: String, default: 'Other' },
    categories: [{ type: String }],
    description: { type: String, default: '' },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cluster', clusterSchema);

