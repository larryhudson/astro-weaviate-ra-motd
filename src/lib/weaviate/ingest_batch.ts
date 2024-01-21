import { weaviateClient } from ".";
import chunkify from "chunkify";

export async function ingestBatch(allMixes: any[]) {

  // this was on this page: https://weaviate.io/developers/weaviate/manage-data/import

  const mixChunks = chunkify(allMixes, 100);


  for (const chunk of mixChunks) {
    console.log("chunk", chunk.length)
    let batcher = weaviateClient.batch.objectsBatcher();
    for (const mix of chunk) {

      const dataObj = {
        mixId: mix.id,
        imageUrl: mix.imageUrl,
        date: mix.date,
        title: mix.title,
        blurb: mix.blurb,
        contentUrl: mix.contentUrl,
        content: mix.content,
        textForEmbedding: mix.textForEmbedding,
        iframe: mix.iframe,
        hyperlinkUrl: mix.hyperlinkUrl,
      }
      batcher = batcher.withObject({
        class: "Mix",
        properties: dataObj,
      })

    }

    await batcher.do();
  }
}