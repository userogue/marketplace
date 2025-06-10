#!/usr/bin/env bun

import { $ } from "bun";
import { mkdir } from "node:fs/promises";

const videoUrls = [
  "https://www.youtube.com/watch?v=FB7AztYy2DA",
  "https://vimeo.com/1071532289",
  "https://www.youtube.com/watch?v=Pdyj_3YfyHA&t=1s",
  "https://www.youtube.com/watch?v=RPMITpiei4U",
  "https://www.youtube.com/watch?v=89gmMm9uRD4",
  "https://www.youtube.com/watch?v=6Sh3MIRgtg4&t=1s",
  "https://www.youtube.com/watch?v=Et2yEkKKZPM&t=1s"
];

async function downloadVideo(url: string, index: number) {
  try {
    console.log(`\n[${index + 1}/${videoUrls.length}] Downloading: ${url}`);
    
    await $`yt-dlp -o "downloads/%(title)s.%(ext)s" --no-playlist ${url}`;
    
    console.log(`✓ Successfully downloaded video ${index + 1}`);
  } catch (error) {
    console.error(`✗ Error downloading ${url}:`, error);
  }
}

async function main() {
  // Check if yt-dlp is installed
  try {
    await $`yt-dlp --version`.quiet();
  } catch {
    console.error("yt-dlp is not installed. Please install it with:");
    console.error("  brew install yt-dlp");
    console.error("  or");
    console.error("  pip install yt-dlp");
    process.exit(1);
  }
  
  // Create downloads directory
  await mkdir("downloads", { recursive: true });
  
  // Download all videos
  for (let i = 0; i < videoUrls.length; i++) {
    await downloadVideo(videoUrls[i], i);
  }
  
  console.log("\n✓ All downloads completed!");
}

main().catch(console.error);