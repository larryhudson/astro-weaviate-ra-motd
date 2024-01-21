import { weaviateClient } from ".";
import { chunk } from "llm-chunk";
import type { DocumentWithId, Chunk } from "./types";

export async function chunkDocumentText(text: string, document: any) {
  // chunk the document into smaller pieces
  const chunkStrings = chunk(text, {
    minLength: 0,
    maxLength: 512,
    splitter: "sentence",
  });

  const chunksInput = chunkStrings.map((chunkString) => {
    return {
      text: chunkString,
      doc_uuid: document.id,
      doc_name: document.properties.doc_name,
      doc_type: document.properties.doc_type,
    };
  });

  let chunkBatcher = weaviateClient.batch.objectsBatcher();
  // i don't really get how this works. why would you redefine the batcher?
  // https://weaviate.io/developers/weaviate/manage-data/import#basic-import
  for (const chunkInput of chunksInput) {
    chunkBatcher = chunkBatcher.withObject({
      class: "Chunk",
      properties: chunkInput,
    });
  }

  await chunkBatcher.do();
}
