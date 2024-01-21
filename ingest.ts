import fs from "fs";
import { ingestBatch } from "@src/lib/weaviate/ingest_batch";

async function main() {
    const jsonFilePath = "./data.json"
    const jsonStr = fs.readFileSync(jsonFilePath, "utf8");
    const mixes = JSON.parse(jsonStr);
    await ingestBatch(mixes);
}

main();