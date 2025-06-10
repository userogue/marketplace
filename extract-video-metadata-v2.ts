#!/usr/bin/env bun

import { $ } from "bun";
import { GoogleGenAI, Type } from "@google/genai";
import { readdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";
import dedent from "dedent";

// Initialize Google GenAI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// Helper function to create user content
function createUserContent(parts: any[]) {
  return [{ role: "user", parts }];
}

// Helper function to create part from URI
function createPartFromUri(uri: string, mimeType: string) {
  return { fileData: { fileUri: uri, mimeType } };
}

// Helper function to create text part
function createTextPart(text: string) {
  return { text };
}

// Sleep helper
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Define the response schema
const metadataSchema = {
  type: Type.OBJECT,
  properties: {
    basic_info: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, nullable: true },
        filename: { type: Type.STRING },
        duration_seconds: { type: Type.NUMBER },
        date_processed: { type: Type.STRING },
        source: { type: Type.STRING },
      },
    },
    company_info: {
      type: Type.OBJECT,
      properties: {
        company_name: { type: Type.STRING, nullable: true },
        speaker_name: { type: Type.STRING, nullable: true },
        speaker_title: { type: Type.STRING, nullable: true },
        contact_info: { type: Type.STRING, nullable: true },
      },
    },
    solution_overview: {
      type: Type.OBJECT,
      properties: {
        solution_name: { type: Type.STRING, nullable: true },
        category: { type: Type.STRING, nullable: true },
        keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
        technologies_mentioned: { type: Type.ARRAY, items: { type: Type.STRING } },
        maturity_level: { type: Type.STRING, nullable: true },
        contract_vehicles: { type: Type.ARRAY, items: { type: Type.STRING } },
        pricing_model: { type: Type.STRING, nullable: true },
        certifications_compliance: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
    },
    market_research_insights: {
      type: Type.OBJECT,
      properties: {
        problem_addressed: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING, nullable: true },
            pain_points: { type: Type.ARRAY, items: { type: Type.STRING } },
            current_state_issues: { type: Type.STRING, nullable: true },
            stakeholders_affected: { type: Type.STRING, nullable: true },
            problem_magnitude: { type: Type.STRING, nullable: true },
            cost_of_inaction: { type: Type.STRING, nullable: true },
          },
        },
        solution_approach: {
          type: Type.OBJECT,
          properties: {
            methodology: { type: Type.STRING, nullable: true },
            key_features: { type: Type.ARRAY, items: { type: Type.STRING } },
            unique_value_prop: { type: Type.STRING, nullable: true },
            technical_approach: { type: Type.STRING, nullable: true },
            innovation_aspects: { type: Type.STRING, nullable: true },
            success_factors: { type: Type.STRING, nullable: true },
          },
        },
        target_market: {
          type: Type.OBJECT,
          properties: {
            primary_agencies: { type: Type.ARRAY, items: { type: Type.STRING } },
            use_cases: { type: Type.ARRAY, items: { type: Type.STRING } },
            user_personas: { type: Type.ARRAY, items: { type: Type.STRING } },
            scale: { type: Type.STRING, nullable: true },
          },
        },
        benefits_claimed: {
          type: Type.OBJECT,
          properties: {
            efficiency_gains: { type: Type.STRING, nullable: true },
            cost_savings: { type: Type.STRING, nullable: true },
            quality_improvements: { type: Type.STRING, nullable: true },
            risk_reduction: { type: Type.STRING, nullable: true },
            roi_timeline: { type: Type.STRING, nullable: true },
            quantified_impact: { type: Type.STRING, nullable: true },
            other_benefits: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
        },
        implementation: {
          type: Type.OBJECT,
          properties: {
            deployment_model: { type: Type.STRING, nullable: true },
            integration_points: { type: Type.ARRAY, items: { type: Type.STRING } },
            timeline: { type: Type.STRING, nullable: true },
            training_requirements: { type: Type.STRING, nullable: true },
          },
        },
        evidence_provided: {
          type: Type.OBJECT,
          properties: {
            case_studies: { type: Type.ARRAY, items: { type: Type.STRING } },
            metrics: { type: Type.ARRAY, items: { type: Type.STRING } },
            demonstrations: { type: Type.STRING, nullable: true },
            pilot_results: { type: Type.STRING, nullable: true },
          },
        },
        competitive_landscape: {
          type: Type.OBJECT,
          properties: {
            alternatives_mentioned: { type: Type.ARRAY, items: { type: Type.STRING } },
            differentiation: { type: Type.STRING, nullable: true },
            market_gaps: { type: Type.STRING, nullable: true },
            competitive_advantages: { type: Type.STRING, nullable: true },
            market_positioning: { type: Type.STRING, nullable: true },
          },
        },
        challenges_limitations: {
          type: Type.OBJECT,
          properties: {
            acknowledged_limitations: { type: Type.ARRAY, items: { type: Type.STRING } },
            prerequisites: { type: Type.ARRAY, items: { type: Type.STRING } },
            best_fit_scenarios: { type: Type.STRING, nullable: true },
          },
        },
      },
    },
    extracted_content: {
      type: Type.OBJECT,
      properties: {
        key_quotes: { type: Type.ARRAY, items: { type: Type.STRING } },
        acronyms_defined: { 
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              acronym: { type: Type.STRING },
              definition: { type: Type.STRING }
            }
          }
        },
        numbers_mentioned: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
    },
    analysis_metadata: {
      type: Type.OBJECT,
      properties: {
        tags: { type: Type.ARRAY, items: { type: Type.STRING } },
        summary: { type: Type.STRING },
        processing_date: { type: Type.STRING },
      },
    },
  },
};

async function getVideoDuration(videoPath: string): Promise<number> {
  try {
    const result = await $`ffprobe -v quiet -print_format json -show_format ${videoPath}`.json();
    return Math.round(parseFloat(result.format.duration));
  } catch {
    return 0;
  }
}

async function getFileSize(filePath: string): Promise<number> {
  const stats = await stat(filePath);
  return stats.size;
}

async function extractVideoMetadata(videoPath: string): Promise<any> {
  const filename = parse(videoPath).base;
  console.log(`\n🎥 Processing video: ${filename}`);
  
  // Get video duration
  const duration = await getVideoDuration(videoPath);
  console.log(`Duration: ${duration} seconds`);
  
  // Check file size
  const fileSize = await getFileSize(videoPath);
  const fileSizeMB = fileSize / (1024 * 1024);
  console.log(`File size: ${fileSizeMB.toFixed(2)} MB`);
  
  try {
    // Upload video
    console.log("Uploading video to Gemini...");
    let uploadedFile = await ai.files.upload({
      file: videoPath,
      config: { mimeType: "video/mp4" }
    });
    console.log(`Uploaded. File URI: ${uploadedFile.uri}`);
    
    // Wait for processing
    while (!uploadedFile.state || uploadedFile.state.toString() !== "ACTIVE") {
      console.log("Processing video... State:", uploadedFile.state);
      await sleep(5000);
      uploadedFile = await ai.files.get({ name: uploadedFile.name });
    }
    
    console.log("✓ Video ready for analysis");
    
    // Create prompt
    const prompt = dedent`
      You are an expert market research analyst specializing in government technology solutions. 
      Analyze this Tradewinds solution pitch video and extract COMPREHENSIVE, DETAILED metadata for market research purposes.

      CRITICAL INSTRUCTIONS FOR MARKET RESEARCH:
      
      1. **BE EXTREMELY DETAILED AND DESCRIPTIVE** - This data will be used for market analysis and competitive intelligence
      
      2. **Problem Analysis**: Don't just state the problem - explain:
         - WHO specifically faces this problem (roles, departments, agencies)
         - WHAT makes this problem significant (impact, scale, urgency)
         - WHY current solutions fail (specific gaps, limitations)
         - HOW MUCH this problem costs (time, money, resources)
      
      3. **Solution Details**: Go beyond features - explain:
         - HOW the solution works technically (architecture, approach, methodology)
         - WHAT makes it different from alternatives (unique capabilities, innovations)
         - WHO specifically benefits and HOW (use cases, workflows)
         - WHAT outcomes/results are promised or demonstrated
      
      4. **Market Intelligence**: Extract:
         - Specific contract vehicles mentioned (GSA schedules, IDIQs, etc.)
         - Pricing information or cost comparisons
         - Implementation timelines and milestones
         - Technical requirements and dependencies
         - Integration capabilities with existing systems
         - Compliance standards met (FedRAMP, CMMI, etc.)
      
      5. **Evidence & Validation**: Document:
         - Specific customer success stories with outcomes
         - Quantified benefits (percentages, dollar amounts, time saved)
         - Pilot program results and lessons learned
         - Awards, certifications, or recognitions
      
      6. **Competitive Positioning**: Analyze:
         - How they compare to specific competitors
         - What gaps in the market they're filling
         - Their unique selling propositions
         - Barriers to entry they've overcome
      
      7. **Key Quotes**: Extract VERBATIM quotes that:
         - Demonstrate value proposition
         - Show customer testimonials
         - Reveal strategic insights
         - Indicate future direction
      
      8. **Summary**: Write a 3-5 sentence executive summary that captures:
         - The core problem and its impact
         - The solution's unique approach
         - Key benefits and outcomes
         - Target market and use cases
         - Competitive advantages
      
      REMEMBER: Be as descriptive and detailed as possible. Include context, specifics, and nuances that would help someone understand the full market opportunity and competitive landscape.
    `;
    
    // Analyze video
    console.log("Analyzing video content...");
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: createUserContent([
        createPartFromUri(uploadedFile.uri, uploadedFile.mimeType),
        createTextPart(prompt)
      ]),
      config: {
        responseMimeType: "application/json",
        responseSchema: metadataSchema,
      },
    });
    
    const responseText = result.text;
    console.log("Received response from Gemini");
    
    // Parse the JSON response
    const metadata = JSON.parse(responseText);
    
    // Add computed fields
    metadata.id = filename.replace('.mp4', '').toLowerCase().replace(/\s+/g, '-');
    metadata.basic_info.filename = filename;
    metadata.basic_info.duration_seconds = duration;
    metadata.basic_info.date_processed = new Date().toISOString().split('T')[0];
    metadata.basic_info.source = "tradewinds";
    metadata.analysis_metadata.processing_date = new Date().toISOString();
    
    console.log("✓ Metadata extracted successfully");
    
    // Clean up uploaded file
    try {
      await ai.files.delete({ name: uploadedFile.name });
      console.log("✓ Cleaned up uploaded file");
    } catch (deleteError) {
      console.warn("Could not delete uploaded file:", deleteError);
    }
    
    return metadata;
    
  } catch (error) {
    console.error("Error extracting metadata:", error);
    throw error;
  }
}

async function main() {
  const DOWNLOADS_DIR = "./app/resources";
  
  // Check if Gemini API key is set
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY environment variable not set");
    console.error("Please set it with: export GEMINI_API_KEY='your-api-key'");
    process.exit(1);
  }
  
  // Get all MP4 files
  const files = await readdir(DOWNLOADS_DIR);
  const videos = files.filter(f => f.endsWith('.mp4')).sort();
  
  if (videos.length === 0) {
    console.log("No MP4 files found in app/resources directory");
    return;
  }
  
  console.log(`Found ${videos.length} videos to process\n`);
  
  // Process single video for testing
  const testVideo = videos[0];
  console.log(`🧪 Testing with first video: ${testVideo}`);
  
  try {
    const metadata = await extractVideoMetadata(join(DOWNLOADS_DIR, testVideo));
    
    // Save metadata to file
    const outputPath = join(DOWNLOADS_DIR, `${testVideo.replace('.mp4', '')}_metadata.json`);
    await Bun.write(outputPath, JSON.stringify(metadata, null, 2));
    
    console.log(`\n✅ Metadata saved to: ${outputPath}`);
    console.log("\n📊 Summary:");
    console.log(`Company: ${metadata.company_info?.company_name || 'Unknown'}`);
    console.log(`Solution: ${metadata.solution_overview?.solution_name || 'Unknown'}`);
    console.log(`Category: ${metadata.solution_overview?.category || 'Unknown'}`);
    if (metadata.analysis_metadata?.summary) {
      console.log(`\nSummary: ${metadata.analysis_metadata.summary}`);
    }
    
    // Process all videos
    console.log("\n📹 Processing all videos...\n");
    
    const allMetadata = [];
    
    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      console.log(`\n[${i + 1}/${videos.length}] Processing ${video}`);
      
      try {
        const metadata = await extractVideoMetadata(join(DOWNLOADS_DIR, video));
        allMetadata.push(metadata);
        
        // Save individual metadata
        const outputPath = join(DOWNLOADS_DIR, `${video.replace('.mp4', '')}_metadata.json`);
        await Bun.write(outputPath, JSON.stringify(metadata, null, 2));
        
      } catch (error) {
        console.error(`Failed to process ${video}:`, error);
      }
      
      // Add a small delay between videos to avoid rate limiting
      if (i < videos.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    // Save combined metadata
    const combinedPath = join(DOWNLOADS_DIR, 'all_videos_metadata.json');
    await Bun.write(combinedPath, JSON.stringify(allMetadata, null, 2));
    
    console.log(`\n✅ All metadata saved to: ${combinedPath}`);
    console.log(`✅ Processed ${allMetadata.length} videos successfully`);
    
  } catch (error) {
    console.error("Failed to process video:", error);
  }
}

// Run the script
main().catch(console.error);