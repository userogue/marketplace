#!/usr/bin/env bun

import { $ } from "bun";
import { GoogleGenAI, Schema } from "@google/genai";
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
      Analyze this Tradewinds solution pitch video and extract comprehensive metadata.

      INSTRUCTIONS:
      1. Watch/listen to the entire video carefully
      2. Extract all mentioned information and return it as a JSON object
      3. For each field, only include information that is explicitly mentioned or clearly demonstrated
      4. Use null for any fields where information is not available
      5. Be specific and accurate - do not make assumptions
      6. Focus especially on the problem being solved and the solution approach
      7. Capture specific metrics, numbers, and claims made
      8. Note any government agencies or use cases mentioned
      9. Extract key quotes that summarize the value proposition
      10. Generate relevant tags based on the content
      11. Write a concise executive summary (2-3 sentences)

      Return the data in this JSON structure:
      {
        "basic_info": {
          "title": "string or null",
          "filename": "string",
          "duration_seconds": number,
          "date_processed": "string",
          "source": "string"
        },
        "company_info": {
          "company_name": "string or null",
          "speaker_name": "string or null",
          "speaker_title": "string or null",
          "contact_info": "string or null"
        },
        "solution_overview": {
          "solution_name": "string or null",
          "category": "string or null",
          "keywords": ["array of strings"],
          "technologies_mentioned": ["array of strings"]
        },
        "market_research_insights": {
          "problem_addressed": {
            "description": "string or null",
            "pain_points": ["array of strings"],
            "current_state_issues": "string or null"
          },
          "solution_approach": {
            "methodology": "string or null",
            "key_features": ["array of strings"],
            "unique_value_prop": "string or null",
            "technical_approach": "string or null"
          },
          "target_market": {
            "primary_agencies": ["array of strings"],
            "use_cases": ["array of strings"],
            "user_personas": ["array of strings"],
            "scale": "string or null"
          },
          "benefits_claimed": {
            "efficiency_gains": "string or null",
            "cost_savings": "string or null",
            "quality_improvements": "string or null",
            "risk_reduction": "string or null",
            "other_benefits": ["array of strings"]
          },
          "implementation": {
            "deployment_model": "string or null",
            "integration_points": ["array of strings"],
            "timeline": "string or null",
            "training_requirements": "string or null"
          },
          "evidence_provided": {
            "case_studies": ["array of strings"],
            "metrics": ["array of strings"],
            "demonstrations": "string or null",
            "pilot_results": "string or null"
          },
          "competitive_landscape": {
            "alternatives_mentioned": ["array of strings"],
            "differentiation": "string or null",
            "market_gaps": "string or null"
          },
          "challenges_limitations": {
            "acknowledged_limitations": ["array of strings"],
            "prerequisites": ["array of strings"],
            "best_fit_scenarios": "string or null"
          }
        },
        "extracted_content": {
          "key_quotes": ["array of strings"],
          "acronyms_defined": {"object with acronym: definition pairs"},
          "numbers_mentioned": ["array of strings"]
        },
        "analysis_metadata": {
          "tags": ["array of strings"],
          "summary": "string",
          "processing_date": "string"
        }
      }
    `;
    
    // Analyze video
    console.log("Analyzing video content...");
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: createUserContent([
        createPartFromUri(uploadedFile.uri, uploadedFile.mimeType),
        createTextPart(prompt)
      ]),
    });
    
    const responseText = result.text;
    console.log("Received response from Gemini");
    
    // Parse JSON from response
    let metadata;
    try {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        metadata = JSON.parse(jsonMatch[0]);
      } else {
        metadata = JSON.parse(responseText);
      }
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      console.log("Response text:", responseText.substring(0, 500) + "...");
      throw parseError;
    }
    
    // Add computed fields
    metadata.id = filename.replace('.mp4', '').toLowerCase().replace(/\s+/g, '-');
    metadata.basic_info = metadata.basic_info || {};
    metadata.basic_info.filename = filename;
    metadata.basic_info.duration_seconds = duration;
    metadata.basic_info.date_processed = new Date().toISOString().split('T')[0];
    metadata.basic_info.source = "tradewinds";
    
    metadata.analysis_metadata = metadata.analysis_metadata || {};
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
  const DOWNLOADS_DIR = "./downloads";
  
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
    console.log("No MP4 files found in downloads directory");
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
    
    // Ask if user wants to process all videos
    console.log("\n🤔 Would you like to process all videos? (y/n)");
    
    for await (const line of console) {
      const answer = line.trim().toLowerCase();
      
      if (answer === 'y' || answer === 'yes') {
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
      }
      
      break;
    }
    
  } catch (error) {
    console.error("Failed to process video:", error);
  }
}

// Run the script
main().catch(console.error);