const haversine = require('./haversine');

/**
 * DBSCAN clustering algorithm for geographic points
 * @param {Array} points - Array of {lat, lng, id, ...} objects
 * @param {number} epsilon - Maximum distance in meters between two points in same cluster
 * @param {number} minPts - Minimum number of points to form a cluster
 * @returns {Array} clusters - Each cluster has {center, radiusMeters, pointIds}
 */
const dbscan = (points, epsilon = 250, minPts = 3) => {
  const NOISE = -1;
  const UNVISITED = 0;
  const labels = new Array(points.length).fill(UNVISITED);
  let clusterCount = 0;

  const getNeighbors = (pointIdx) => {
    const neighbors = [];
    for (let i = 0; i < points.length; i++) {
      if (i === pointIdx) continue;
      const dist = haversine(
        points[pointIdx].lat,
        points[pointIdx].lng,
        points[i].lat,
        points[i].lng
      );
      if (dist <= epsilon) {
        neighbors.push(i);
      }
    }
    return neighbors;
  };

  const expandCluster = (pointIdx, neighbors, clusterLabel) => {
    labels[pointIdx] = clusterLabel;
    let i = 0;
    while (i < neighbors.length) {
      const neighborIdx = neighbors[i];
      if (labels[neighborIdx] === UNVISITED) {
        labels[neighborIdx] = clusterLabel;
        const newNeighbors = getNeighbors(neighborIdx);
        if (newNeighbors.length >= minPts) {
          neighbors.push(...newNeighbors.filter((n) => !neighbors.includes(n)));
        }
      } else if (labels[neighborIdx] === NOISE) {
        labels[neighborIdx] = clusterLabel;
      }
      i++;
    }
  };

  for (let i = 0; i < points.length; i++) {
    if (labels[i] !== UNVISITED) continue;
    const neighbors = getNeighbors(i);
    if (neighbors.length < minPts) {
      labels[i] = NOISE;
    } else {
      clusterCount++;
      expandCluster(i, neighbors, clusterCount);
    }
  }

  // Build cluster objects
  const clusters = [];
  for (let c = 1; c <= clusterCount; c++) {
    const clusterPoints = points.filter((_, idx) => labels[idx] === c);
    if (clusterPoints.length === 0) continue;

    const avgLat = clusterPoints.reduce((s, p) => s + p.lat, 0) / clusterPoints.length;
    const avgLng = clusterPoints.reduce((s, p) => s + p.lng, 0) / clusterPoints.length;

    // Calculate radius as max distance from center
    let maxDist = 0;
    for (const pt of clusterPoints) {
      const d = haversine(avgLat, avgLng, pt.lat, pt.lng);
      if (d > maxDist) maxDist = d;
    }

    clusters.push({
      clusterLabel: c,
      center: { lat: avgLat, lng: avgLng },
      radiusMeters: Math.max(maxDist, epsilon),
      pointIds: clusterPoints.map((p) => p.id),
    });
  }

  return clusters;
};

module.exports = dbscan;

