#!/usr/bin/env bun

import { readdir, unlink } from "node:fs/promises";
import { join, parse } from "node:path";

const DOWNLOADS_DIR = "./downloads";
const FORMATS_TO_DELETE = [".mkv", ".webm"];

async function main() {
  // Get all files in downloads directory
  const files = await readdir(DOWNLOADS_DIR);
  
  // Filter files that need to be deleted
  const filesToDelete = files.filter(file => {
    const ext = parse(file).ext.toLowerCase();
    return FORMATS_TO_DELETE.includes(ext);
  });
  
  if (filesToDelete.length === 0) {
    console.log("No MKV or WebM files found to delete.");
    return;
  }
  
  console.log(`Found ${filesToDelete.length} non-MP4 files to delete:\n`);
  
  // Delete each file
  for (const file of filesToDelete) {
    const filePath = join(DOWNLOADS_DIR, file);
    try {
      await unlink(filePath);
      console.log(`✓ Deleted: ${file}`);
    } catch (error) {
      console.error(`✗ Error deleting ${file}:`, error);
    }
  }
  
  console.log("\n✓ Cleanup completed!");
}

main().catch(console.error);