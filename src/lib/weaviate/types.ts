export type DocumentInput = {
  text: string;
  doc_name: string;
  doc_type: string;
};
export type DocumentWithoutId = {
  text: string;
  doc_name: string;
  doc_type: string;
  doc_link: string;
  timestamp: string;
  chunk_count: number;
};

export type DocumentWithId = DocumentWithoutId & {
  id: string;
};

export type ChunkWithoutId = {
  text: string;
  doc_name: string;
  doc_type: string;
  doc_uuid: string;
};

export type ChunkWithId = ChunkWithoutId & {
  id: number;
};
