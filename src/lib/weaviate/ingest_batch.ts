import { weaviateClient } from ".";

export async function ingestBatch(mixes: any[]) {

  // this was on this page: https://weaviate.io/developers/weaviate/manage-data/import
  let batcher = weaviateClient.batch.objectsBatcher();

  for (const mix of mixes) {
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