#!/usr/bin/env bun

import { $ } from "bun";
import { readdir } from "node:fs/promises";
import { join, parse } from "node:path";

const DOWNLOADS_DIR = "./downloads";
const FORMATS_TO_CONVERT = [".mkv", ".webm"];

async function convertVideo(inputPath: string, outputPath: string) {
  try {
    console.log(`Converting: ${inputPath}`);
    
    // Use ffmpeg with optimized settings for web playback
    await $`ffmpeg -i ${inputPath} -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 192k -movflags +faststart ${outputPath}`;
    
    console.log(`✓ Converted to: ${outputPath}`);
  } catch (error) {
    console.error(`✗ Error converting ${inputPath}:`, error);
  }
}

async function main() {
  // Check if ffmpeg is installed
  try {
    await $`ffmpeg -version`.quiet();
  } catch {
    console.error("ffmpeg is not installed. Please install it with:");
    console.error("  brew install ffmpeg");
    process.exit(1);
  }
  
  // Get all files in downloads directory
  const files = await readdir(DOWNLOADS_DIR);
  
  // Filter files that need conversion
  const filesToConvert = files.filter(file => {
    const ext = parse(file).ext.toLowerCase();
    return FORMATS_TO_CONVERT.includes(ext);
  });
  
  if (filesToConvert.length === 0) {
    console.log("No MKV or WebM files found to convert.");
    return;
  }
  
  console.log(`Found ${filesToConvert.length} videos to convert to MP4:\n`);
  
  // Convert each file
  for (let i = 0; i < filesToConvert.length; i++) {
    const file = filesToConvert[i];
    const { name } = parse(file);
    const inputPath = join(DOWNLOADS_DIR, file);
    const outputPath = join(DOWNLOADS_DIR, `${name}.mp4`);
    
    console.log(`\n[${i + 1}/${filesToConvert.length}] Processing...`);
    await convertVideo(inputPath, outputPath);
  }
  
  console.log("\n✓ All conversions completed!");
}

main().catch(console.error);