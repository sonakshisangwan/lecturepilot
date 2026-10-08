const crypto = require("crypto");
const qdrant = require("../config/qdrant");

const ensureCollection = async (collectionName) => {
  const collections = await qdrant.getCollections();
  const exists = collections.collections.some((c) => c.name === collectionName);

  if (!exists) {
    await qdrant.createCollection(collectionName, {
      vectors: {
        size: 1536,
        distance: "Cosine",
      },
    });
  }
};

const upsertChunks = async ({ collectionName, chunks, embeddings, metadata }) => {
  await ensureCollection(collectionName);

  const points = chunks.map((chunk, index) => ({
    id: crypto.randomUUID(),
    vector: embeddings[index],
    payload: {
      ...metadata,
      chunkIndex: index,
      text: chunk,
    },
  }));

  await qdrant.upsert(collectionName, {
    points,
  });
};

module.exports = { upsertChunks };