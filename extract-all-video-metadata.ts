#!/usr/bin/env tsx

import { readdir } from 'fs/promises';
import { join } from 'path';
import { execSync } from 'child_process';
import { writeFile, readFile } from 'fs/promises';

async function extractAllVideoMetadata() {
  try {
    // Find all video files in the app/resources directory
    const resourcesDir = join('app', 'resources');
    const files = await readdir(resourcesDir);
    const videoFiles = files.filter(f => f.endsWith('.mp4'));
    
    console.log(`Found ${videoFiles.length} video files to process`);
    
    // Object to store all metadata
    const allMetadata: Record<string, any> = {};
    
    // Process each video file
    for (const videoFile of videoFiles) {
      console.log(`\nProcessing: ${videoFile}`);
      
      try {
        // Run the extract-video-metadata-v2.ts script for this video
        const videoPath = join(resourcesDir, videoFile);
        execSync(`bun extract-video-metadata-v2.ts "${videoPath}"`, {
          stdio: 'inherit'
        });
        
        // Read the generated metadata file (it should be created in app/resources)
        const metadataFile = join(resourcesDir, videoFile.replace('.mp4', '_metadata.json'));
        const metadataContent = await readFile(metadataFile, 'utf-8');
        const metadata = JSON.parse(metadataContent);
        
        // Use the video filename (without .mp4) as the key
        const key = videoFile.replace('.mp4', '');
        allMetadata[key] = metadata;
        
        console.log(`✓ Successfully processed ${videoFile}`);
        
      } catch (error) {
        console.error(`✗ Error processing ${videoFile}:`, error);
      }
    }
    
    // Generate TypeScript content
    const tsContent = `// Auto-generated video metadata
// Generated on: ${new Date().toISOString()}

export interface VideoMetadata {
  analysis_metadata: {
    processing_date: string;
    summary: string;
    tags: string[];
  };
  basic_info: {
    date_processed: string;
    duration_seconds: number;
    filename: string;
    source: string;
    title: string;
  };
  company_info: {
    company_name: string;
    contact_info: string;
    speaker_name: string;
    speaker_title: string;
  };
  extracted_content: {
    acronyms_defined: Array<{ acronym: string; definition: string }>;
    key_quotes: string[];
    numbers_mentioned: string[];
  };
  market_research_insights: {
    benefits_claimed: {
      cost_savings: string;
      efficiency_gains: string;
      other_benefits: string;
      quality_improvements: string;
      quantified_impact: string;
      risk_reduction: string;
      roi_timeline: string;
    };
    challenges_limitations: {
      acknowledged_limitations: string;
      best_fit_scenarios: string;
      prerequisites: string;
    };
    competitive_landscape: {
      alternatives_mentioned: string;
      competitive_advantages: string;
      differentiation: string;
      market_gaps: string;
      market_positioning: string;
    };
    evidence_provided: {
      case_studies: string;
      demonstrations: string;
      metrics: string;
      pilot_results: string;
    };
    implementation: {
      deployment_model: string;
      integration_points: string;
      timeline: string;
      training_requirements: string;
    };
    problem_addressed: {
      cost_of_inaction: string;
      current_state_issues: string;
      description: string;
      pain_points: string;
      problem_magnitude: string;
      stakeholders_affected: string;
    };
    solution_approach: {
      innovation_aspects: string;
      key_features: string;
      methodology: string;
      success_factors: string;
      technical_approach: string;
      unique_value_prop: string;
    };
    target_market: {
      primary_agencies: string;
      scale: string;
      use_cases: string;
      user_personas: string;
    };
  };
  solution_overview: {
    category: string;
    certifications_compliance: string;
    contract_vehicles: string;
    keywords: string[];
    maturity_level: string;
    pricing_model: string;
    solution_name: string;
    technologies_mentioned: string[];
  };
  id: string;
}

export const videosMetadata: Record<string, VideoMetadata> = ${JSON.stringify(allMetadata, null, 2)};

export default videosMetadata;
`;

    // Write the TypeScript file
    const outputPath = join('app', 'data', 'videos-metadata.ts');
    
    // Create the data directory if it doesn't exist
    const dataDir = join('app', 'data');
    try {
      await readdir(dataDir);
    } catch {
      execSync(`mkdir -p "${dataDir}"`);
    }
    
    await writeFile(outputPath, tsContent);
    
    console.log(`\n✓ TypeScript metadata written to ${outputPath}`);
    console.log(`  Total videos processed: ${Object.keys(allMetadata).length}`);
    
    // Optionally, remove individual metadata files
    console.log('\nCleaning up individual metadata files...');
    for (const videoFile of videoFiles) {
      const metadataFile = join(resourcesDir, videoFile.replace('.mp4', '_metadata.json'));
      try {
        execSync(`rm -f "${metadataFile}"`);
      } catch (error) {
        // Ignore errors for missing files
      }
    }
    console.log('✓ Cleanup complete');
    
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run the extraction
extractAllVideoMetadata();