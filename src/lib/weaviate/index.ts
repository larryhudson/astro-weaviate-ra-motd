import weaviate, { EmbeddedOptions } from "weaviate-ts-embedded";
import { initialiseSchema } from "./schema";

async function initialiseWeaviate(client: typeof weaviateClient) {
  console.log("Here we would do the initialisation stuff");
  console.log("Data path:", client.embedded?.options.persistenceDataPath);
  await initialiseSchema(client);
}

export const weaviateClient = weaviate.client(
  new EmbeddedOptions({
    port: 9898,
    env: {
      DEFAULT_VECTORIZER_MODULE: "text2vec-openai",
      OPENAI_APIKEY: import.meta?.env?.VITE_OPENAI_APIKEY || process.env.VITE_OPENAI_APIKEY,
    },
  }),
  {
    scheme: "http",
    host: "127.0.0.1:9898",
  },
);

await weaviateClient.embedded.start();
await initialiseWeaviate(weaviateClient);
