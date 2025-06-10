#!/usr/bin/env tsx

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

async function consolidateVideoMetadata() {
  try {
    // Find all metadata JSON files
    const files = await readdir('.');
    const metadataFiles = files.filter(f => f.endsWith('_metadata.json'));
    
    console.log(`Found ${metadataFiles.length} metadata files to consolidate`);
    
    // Object to store all metadata
    const allMetadata: Record<string, any> = {};
    
    // Read each metadata file
    for (const metadataFile of metadataFiles) {
      console.log(`Reading: ${metadataFile}`);
      
      try {
        const content = await readFile(metadataFile, 'utf-8');
        const metadata = JSON.parse(content);
        
        // Extract the video name (remove _metadata.json)
        const videoName = metadataFile.replace('_metadata.json', '');
        allMetadata[videoName] = metadata;
        
        console.log(`✓ Added ${videoName}`);
        
      } catch (error) {
        console.error(`✗ Error reading ${metadataFile}:`, error);
      }
    }
    
    // Write the consolidated metadata
    const outputPath = join('public', 'videos-metadata.json');
    await writeFile(
      outputPath, 
      JSON.stringify({ videos: allMetadata }, null, 2)
    );
    
    console.log(`\n✓ Consolidated metadata written to ${outputPath}`);
    console.log(`  Total videos: ${Object.keys(allMetadata).length}`);
    
    // Show the structure
    console.log('\nVideo keys in the consolidated file:');
    Object.keys(allMetadata).forEach(key => {
      console.log(`  - ${key}`);
    });
    
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run the consolidation
consolidateVideoMetadata();