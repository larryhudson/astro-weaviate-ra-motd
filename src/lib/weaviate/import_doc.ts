import { chunkDocumentText } from "./chunk";
import type { DocumentWithoutId, Chunk } from "./types";
import type { DocumentInput } from "./types";
import { weaviateClient } from ".";

export async function importDocument(documentInput: DocumentInput) {
  const docText = documentInput.text;
  // add the document to weaviate, it will return a uuid
  const createdDocument = await weaviateClient.data
    .creator()
    .withClassName("Document")
    .withProperties(documentInput)
    .do();

  const documentUuid = createdDocument.id;

  // chunk the document text into smaller pieces
  const chunks = await chunkDocumentText(documentInput.text, createdDocument);

  return {
    document: createdDocument,
    chunks: chunks,
  };
}
