import videosMetadata from "../../data/videos-metadata";
import type { VideoMetadata } from "../../data/videos-metadata";

export function formatVideoMetadataForAI(): string {
  const formattedVideos = Object.entries(videosMetadata).map(([key, video]) => {
    return formatSingleVideo(key, video);
  }).join('\n\n---\n\n');

  return `
AVAILABLE DEFENSE TECHNOLOGY SOLUTIONS:

${formattedVideos}

Total Solutions Available: ${Object.keys(videosMetadata).length}
`;
}

function formatSingleVideo(key: string, video: VideoMetadata): string {
  const { 
    basic_info, 
    company_info, 
    solution_overview, 
    market_research_insights,
    analysis_metadata 
  } = video;

  return `
SOLUTION: ${solution_overview.solution_name}
Company: ${company_info.company_name}
Category: ${solution_overview.category}
Maturity Level: ${solution_overview.maturity_level || 'Not specified'}
Pricing Model: ${solution_overview.pricing_model || 'Contact vendor'}

OVERVIEW:
${analysis_metadata.summary}

PROBLEM ADDRESSED:
${market_research_insights.problem_addressed.description}

KEY BENEFITS:
- Cost Savings: ${market_research_insights.benefits_claimed.cost_savings || 'Not specified'}
- Efficiency Gains: ${market_research_insights.benefits_claimed.efficiency_gains || 'Not specified'}
- ROI Timeline: ${market_research_insights.benefits_claimed.roi_timeline || 'Not specified'}

TARGET MARKET:
- Primary Agencies: ${Array.isArray(market_research_insights.target_market.primary_agencies) 
    ? market_research_insights.target_market.primary_agencies.join(', ') 
    : market_research_insights.target_market.primary_agencies}
- Use Cases: ${Array.isArray(market_research_insights.target_market.use_cases)
    ? market_research_insights.target_market.use_cases.join(', ')
    : market_research_insights.target_market.use_cases}

TECHNOLOGIES:
${solution_overview.technologies_mentioned.join(', ')}

TAGS: ${analysis_metadata.tags.join(', ')}
`;
}

export function findRelevantSolutions(query: string): VideoMetadata[] {
  const queryLower = query.toLowerCase();
  
  return Object.entries(videosMetadata)
    .filter(([_, video]) => {
      const searchableText = [
        video.solution_overview.solution_name,
        video.company_info.company_name,
        video.analysis_metadata.summary,
        video.market_research_insights.problem_addressed.description,
        ...video.analysis_metadata.tags,
        ...video.solution_overview.technologies_mentioned,
        video.solution_overview.category
      ].join(' ').toLowerCase();
      
      return searchableText.includes(queryLower);
    })
    .map(([_, video]) => video);
}