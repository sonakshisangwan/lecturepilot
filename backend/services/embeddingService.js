const generateEmbedding = async (text) => {
  const response = await fetch("https://api.tokenfactory.nebius.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEBIUS_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "BAAI/bge-en-icl",
      input: text,
      encoding_format: "float",
      dimensions: 1536,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Embedding request failed: ${errorText}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
};

module.exports = generateEmbedding;