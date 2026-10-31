const mongoose = require('mongoose');
const { CATEGORIES, STATUSES, ROLES } = require('../config/constants');

const statusHistorySchema = new mongoose.Schema(
  {
    status: { type: String, enum: STATUSES, required: true },
    at: { type: Date, default: Date.now },
    byRole: { type: String, enum: [...ROLES, 'system'], default: 'system' },
    note: { type: String, default: '' },
  },
  { _id: false }
);

const priorityFactorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contribution: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const reportSchema = new mongoose.Schema(
  {
    reportId: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 200,
      trim: true,
    },
    text: {
      type: String,
      required: true,
      maxlength: 1000,
      trim: true,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    categoryUser: {
      type: String,
      enum: [...CATEGORIES, null, ''],
      default: null,
    },
    categoryAI: {
      type: String,
      enum: CATEGORIES,
      default: 'Other',
    },
    categoryFinal: {
      type: String,
      enum: CATEGORIES,
      default: 'Other',
    },
    summary: {
      type: String,
      default: '',
    },
    location: {
      lat: { type: Number, required: true, min: -90, max: 90 },
      lng: { type: Number, required: true, min: -180, max: 180 },
      address: { type: String, default: '' },
    },
    status: {
      type: String,
      enum: STATUSES,
      default: 'Submitted',
    },
    statusHistory: [statusHistorySchema],
    assignee: {
      type: String,
      default: null,
    },
    priority: {
      score: { type: Number, default: 0 },
      label: { type: String, default: 'Low' },
      factors: [priorityFactorSchema],
    },
    ai: {
      source: {
        type: String,
        enum: ['gemini', 'fallback'],
        default: 'fallback',
      },
      safetyFlag: { type: Boolean, default: false },
      confidence: { type: Number, default: 0 },
      reasonText: { type: String, default: '' },
    },
    duplicate: {
      isDuplicate: { type: Boolean, default: false },
      parentId: { type: String, default: null },
      similarity: { type: Number, default: 0 },
      reason: { type: String, default: '' },
    },
    clusterId: {
      type: String,
      default: null,
    },
    isSeed: {
      type: Boolean,
      default: false,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for geospatial queries
reportSchema.index({ 'location.lat': 1, 'location.lng': 1 });
reportSchema.index({ reportId: 1 });
reportSchema.index({ status: 1 });
reportSchema.index({ 'priority.label': 1 });
reportSchema.index({ categoryFinal: 1 });
reportSchema.index({ submittedBy: 1 });

module.exports = mongoose.model('Report', reportSchema);

