import fs from "fs";
import { importMixesFromJson } from "@src/lib/weaviate/ingest_batch";

async function main() {
    const jsonFilePath = "./data.json"
    await importMixesFromJson(jsonFilePath);
}

main();