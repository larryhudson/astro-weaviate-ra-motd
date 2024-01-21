import { weaviateClient } from ".";
import chunkify from "chunkify";
import fs from 'fs';
import parser from 'stream-json';
import StreamArray from 'stream-json/streamers/StreamArray';
import Chain from 'stream-chain';

export async function importMixesFromJson(filePath) {
  let batcher = weaviateClient.batch.objectsBatcher();
  let counter = 0;
  const batchSize = 20;

  async function addMix(mix: any): Promise<void> {
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
    // Add the object to the batch queue
    batcher = batcher.withObject({
      class: 'Mix',
      properties: dataObj,
    });
    counter++;

    // When the batch counter reaches batchSize, push the objects to Weaviate
    if (counter % batchSize === 0) {
      // Flush the batch queue and restart it
      const response = await batcher.do();
      batcher = weaviateClient.batch.objectsBatcher();

      // Handle errors
      for (const r of response)
        if (r.result.errors) {
          console.log(r.result.errors)
          throw r.result.errors;
        }


      console.log(`Imported ${counter} articles...`);
    }
  }

  const pipeline = new Chain([
    fs.createReadStream(filePath),
    parser(),
    new StreamArray(),
  ]);

  for await (const { value } of pipeline) {
    await addMix(value);
  }

  // Flush any remaining objects
  if (batcher.payload().objects.length > 0) {
    await batcher.do();
  }
}
