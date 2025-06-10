#!/usr/bin/env bun

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

async function consolidateExistingMetadata() {
  try {
    const resourcesDir = join('app', 'resources');
    
    // Find all metadata JSON files
    const files = await readdir(resourcesDir);
    const metadataFiles = files.filter(f => f.endsWith('_metadata.json'));
    
    console.log(`Found ${metadataFiles.length} metadata files to consolidate`);
    
    // Object to store all metadata
    const allMetadata: Record<string, any> = {};
    
    // Read each metadata file
    for (const metadataFile of metadataFiles) {
      console.log(`Reading: ${metadataFile}`);
      
      try {
        const content = await readFile(join(resourcesDir, metadataFile), 'utf-8');
        const metadata = JSON.parse(content);
        
        // Extract the video name (remove _metadata.json)
        const videoName = metadataFile.replace('_metadata.json', '');
        allMetadata[videoName] = metadata;
        
        console.log(`✓ Added ${videoName}`);
        
      } catch (error) {
        console.error(`✗ Error reading ${metadataFile}:`, error);
      }
    }
    
    // Generate TypeScript content
    const tsContent = `// Auto-generated video metadata
// Generated on: ${new Date().toISOString()}
// Total videos: ${Object.keys(allMetadata).length}

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
      other_benefits: string | string[];
      quality_improvements: string;
      quantified_impact: string;
      risk_reduction: string;
      roi_timeline: string;
    };
    challenges_limitations: {
      acknowledged_limitations: string | string[];
      best_fit_scenarios: string;
      prerequisites: string | string[];
    };
    competitive_landscape: {
      alternatives_mentioned: string | string[];
      competitive_advantages: string;
      differentiation: string;
      market_gaps: string;
      market_positioning: string;
    };
    evidence_provided: {
      case_studies: string | string[];
      demonstrations: string;
      metrics: string | string[];
      pilot_results: string;
    };
    implementation: {
      deployment_model: string;
      integration_points: string | string[];
      timeline: string;
      training_requirements: string;
    };
    problem_addressed: {
      cost_of_inaction: string;
      current_state_issues: string;
      description: string;
      pain_points: string | string[];
      problem_magnitude: string;
      stakeholders_affected: string;
    };
    solution_approach: {
      innovation_aspects: string;
      key_features: string | string[];
      methodology: string;
      success_factors: string;
      technical_approach: string;
      unique_value_prop: string;
    };
    target_market: {
      primary_agencies: string | string[];
      scale: string;
      use_cases: string | string[];
      user_personas: string | string[];
    };
  };
  solution_overview: {
    category: string;
    certifications_compliance: string | string[];
    contract_vehicles: string | string[];
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
    if (!existsSync(dataDir)) {
      await Bun.write(dataDir + '/.gitkeep', ''); // This creates the directory
    }
    
    await writeFile(outputPath, tsContent);
    
    console.log(`\n✓ TypeScript metadata written to ${outputPath}`);
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
consolidateExistingMetadata();