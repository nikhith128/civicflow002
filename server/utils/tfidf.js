/**
 * TF-IDF with cosine similarity for duplicate detection
 */

const tokenize = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2);
};

const computeTFIDF = (corpus) => {
  const docCount = corpus.length;
  const tf = corpus.map((doc) => {
    const tokens = tokenize(doc);
    const freq = {};
    tokens.forEach((t) => {
      freq[t] = (freq[t] || 0) + 1;
    });
    const total = tokens.length || 1;
    const tfMap = {};
    Object.keys(freq).forEach((t) => {
      tfMap[t] = freq[t] / total;
    });
    return tfMap;
  });

  // IDF
  const dfMap = {};
  tf.forEach((tfMap) => {
    Object.keys(tfMap).forEach((t) => {
      dfMap[t] = (dfMap[t] || 0) + 1;
    });
  });

  const idf = {};
  Object.keys(dfMap).forEach((t) => {
    idf[t] = Math.log(docCount / dfMap[t]) + 1;
  });

  const tfidf = tf.map((tfMap) => {
    const vec = {};
    Object.keys(tfMap).forEach((t) => {
      vec[t] = tfMap[t] * (idf[t] || 1);
    });
    return vec;
  });

  return tfidf;
};

const cosineSimilarity = (vecA, vecB) => {
  const allKeys = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  allKeys.forEach((k) => {
    const a = vecA[k] || 0;
    const b = vecB[k] || 0;
    dotProduct += a * b;
    normA += a * a;
    normB += b * b;
  });

  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  if (denom === 0) return 0;
  return dotProduct / denom;
};

/**
 * Compute cosine similarity between two text strings using TF-IDF
 */
const textSimilarity = (textA, textB) => {
  const corpus = [textA, textB];
  const tfidf = computeTFIDF(corpus);
  return cosineSimilarity(tfidf[0], tfidf[1]);
};

module.exports = { textSimilarity, computeTFIDF, cosineSimilarity, tokenize };

