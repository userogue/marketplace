import { createFileRoute, Link } from "@tanstack/react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import videosMetadata from "../data/videos-metadata"
import type { VideoMetadata } from "../data/videos-metadata"
import { 
  Play, 
  Clock, 
  Building2, 
  Tag, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Award,
  ChevronRight,
  Search,
  Grid3x3,
  List,
  Sparkles,
  Video,
  ExternalLink,
  Info
} from "lucide-react"
import { useState } from "react"

export const Route = createFileRoute('/videos')({
  component: VideosPage,
})

function VideosPage() {
  const videos = videosMetadata;
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter videos based on search
  const filteredVideos = Object.entries(videos).filter(([key, video]) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      video.basic_info.title.toLowerCase().includes(searchLower) ||
      video.company_info.company_name.toLowerCase().includes(searchLower) ||
      video.analysis_metadata.summary.toLowerCase().includes(searchLower) ||
      video.analysis_metadata.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative">
      {/* Grid pattern for entire page */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 py-12 md:px-8 md:py-16 overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 morphing-gradient opacity-20" />
          <div className="absolute bottom-0 left-0 w-80 sm:w-96 md:w-[32rem] h-80 sm:h-96 md:h-[32rem] morphing-gradient opacity-15" style={{ animationDelay: "3s" }} />
        </div>

        <div className="section-container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 border-0 animate-fade-in">
              <Video className="w-3 h-3 mr-1" />
              Vendor Showcase Library
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-slide-up">
              <span className="gradient-text">Market Research Videos</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed animate-slide-up animation-delay-100 px-4 sm:px-0">
              Explore in-depth presentations from government marketplace vendors. 
              Discover cutting-edge defense technologies and solutions.
            </p>
          </div>

          {/* Premium Search and Filter Bar */}
          <div className="max-w-4xl mx-auto animate-slide-up animation-delay-200">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
              <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-primary-600" />
                    <input
                      type="text"
                      placeholder="Search vendors, technologies, or solutions..."
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-xl border-2 border-gray-200 
                        focus:border-primary-400 focus:ring-4 focus:ring-primary-100 
                        transition-all duration-200 bg-gray-50 focus:bg-white
                        text-gray-900 placeholder-gray-500 text-sm sm:text-base font-medium"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-3 self-end sm:self-auto">
                    <div className="flex rounded-xl border-2 border-gray-200 overflow-hidden bg-gray-50">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-3 sm:p-4 transition-all duration-200 ${
                          viewMode === 'grid' 
                            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg transform scale-105' 
                            : 'bg-transparent text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-3 sm:p-4 transition-all duration-200 ${
                          viewMode === 'list' 
                            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg transform scale-105' 
                            : 'bg-transparent text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <List className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Videos Grid/List */}
      <section className="px-4 pb-16 md:px-8">
        <div className="section-container">
          {filteredVideos.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-xl font-semibold text-gray-700 mb-2">No videos found</p>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
              : "space-y-4 sm:space-y-6"
            }>
              {filteredVideos.map(([key, video], index) => (
                viewMode === 'grid' 
                  ? <VideoCard key={key} videoId={video.id} video={video} index={index} />
                  : <VideoListItem key={key} videoId={video.id} video={video} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      {filteredVideos.length > 0 && (
        <section className="px-4 pb-16 md:px-8">
          <div className="section-container">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary-900 via-primary-800 to-cyan-900 p-6 sm:p-8 md:p-12">
              <div className="absolute inset-0 noise-overlay opacity-5" />
              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                <div className="text-center group cursor-pointer">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 transform transition-transform group-hover:scale-110">
                    {filteredVideos.length}
                  </div>
                  <div className="text-xs sm:text-sm text-blue-200 font-medium">Videos Available</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 transform transition-transform group-hover:scale-110">
                    {Math.floor(filteredVideos.reduce((acc, [_, v]) => acc + v.basic_info.duration_seconds, 0) / 60)}
                  </div>
                  <div className="text-xs sm:text-sm text-blue-200 font-medium">Minutes of Content</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 transform transition-transform group-hover:scale-110">
                    {new Set(filteredVideos.map(([_, v]) => v.solution_overview.category)).size}
                  </div>
                  <div className="text-xs sm:text-sm text-blue-200 font-medium">Categories</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 transform transition-transform group-hover:scale-110">
                    {new Set(filteredVideos.flatMap(([_, v]) => v.analysis_metadata.tags)).size}
                  </div>
                  <div className="text-xs sm:text-sm text-blue-200 font-medium">Unique Tags</div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

// ADD: helper to compute thumbnail URL
function getThumbnailUrl(video: VideoMetadata) {
  // Handle YouTube thumbnails
  if (video.basic_info.video_platform === 'youtube' && video.basic_info.video_url) {
    const match = video.basic_info.video_url.match(/[?&]v=([^&]+)/) || video.basic_info.video_url.match(/youtu\.be\/([^?&]+)/);
    const id = match ? match[1] : null;
    if (id) {
      return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }
  }
  // Handle Vimeo thumbnails (using vumbnail service)
  if (video.basic_info.video_platform === 'vimeo' && video.basic_info.video_url) {
    const id = video.basic_info.video_url.split('/').pop();
    if (id) {
      return `https://vumbnail.com/${id}.jpg`;
    }
  }
  // Fallback to serving the raw video (first frame) if hosted locally
  return `/app/resources/${video.basic_info.filename}`;
}

function VideoCard({ videoId, video, index }: { videoId: string; video: VideoMetadata; index: number }) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Link 
      to="/videos/$videoId" 
      params={{ videoId }}
      className="block h-full"
    >
      <Card className={`
        relative group overflow-hidden flex flex-col h-full cursor-pointer
        animate-slide-up animation-delay-${Math.min(index * 100, 300)}
        bg-white/90 backdrop-blur-sm border border-gray-100
        hover:border-transparent hover:shadow-2xl
        transform transition-all duration-300 hover:-translate-y-2
        premium-card
      `}>
        {/* Premium Video Preview */}
        <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-700 overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          
          {/* Video Thumbnail */}
          <img
            className="w-full h-full object-cover"
            src={getThumbnailUrl(video)}
            alt={video.basic_info.title}
          />
        
          {/* Premium Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <div className="relative group/btn">
                <div className="absolute -inset-1 bg-white/20 rounded-lg blur group-hover/btn:bg-white/30 transition duration-300" />
                <Button size="sm" className="relative btn-primary w-full backdrop-blur-sm">
                  <Play className="w-4 h-4 mr-2 animate-pulse" />
                  Watch Now
                </Button>
              </div>
            </div>
          </div>

          {/* Premium Duration Badge */}
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-white/20 shadow-lg">
            <Clock className="w-3 h-3" />
            <span className="font-medium">{formatDuration(video.basic_info.duration_seconds)}</span>
          </div>
          
          {/* Platform Badge */}
          {video.basic_info.video_platform && (
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-white/20 shadow-lg capitalize">
              <ExternalLink className="w-3 h-3" />
              <span className="font-medium">{video.basic_info.video_platform}</span>
            </div>
          )}
      </div>

      <CardHeader className="p-4 sm:p-6 pb-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 min-h-[1.5rem]">
            <Building2 className="w-4 h-4" />
            <span className="font-medium">{video.company_info.company_name}</span>
          </div>
          <CardTitle className="text-base sm:text-lg leading-tight line-clamp-2 sm:line-clamp-3 group-hover:text-primary-600 transition-colors min-h-[3rem] sm:min-h-[5.25rem]">
            {video.basic_info.title}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 pt-0 flex-1 flex flex-col gap-3 sm:gap-4">
        {/* Solution Name */}
        <div className="bg-gradient-to-r from-primary-50 to-cyan-50 rounded-lg p-2 sm:p-3">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-primary-600 mt-0.5" />
            <div>
              <p className="text-xs text-gray-600 mb-1">Solution</p>
              <p className="font-semibold text-sm text-gray-900">{video.solution_overview.solution_name}</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <p className="text-sm text-gray-600 line-clamp-3 flex-1">
          {video.analysis_metadata.summary}
        </p>

        {/* Key Insights */}
        <div className="space-y-3">
          {video.solution_overview.pricing_model && (
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span className="text-gray-700">{video.solution_overview.pricing_model}</span>
            </div>
          )}
          
          {video.solution_overview.maturity_level && (
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">{video.solution_overview.maturity_level}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t">
          {video.analysis_metadata.tags.slice(0, 4).map((tag, i) => (
            <Badge 
              key={i} 
              variant="secondary" 
              className="text-xs bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {tag}
            </Badge>
          ))}
          {video.analysis_metadata.tags.length > 4 && (
            <Badge variant="secondary" className="text-xs bg-gray-100">
              +{video.analysis_metadata.tags.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}

function VideoListItem({ videoId, video, index }: { videoId: string; video: VideoMetadata; index: number }) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Link 
      to="/videos/$videoId" 
      params={{ videoId }}
      className="block"
    >
      <Card className={`
        card-data hover:shadow-lg transition-all duration-300
        animate-slide-up animation-delay-${Math.min(index * 100, 300)}
        cursor-pointer
      `}>
        <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Video Thumbnail */}
          <div className="relative w-full sm:w-48 md:w-64 aspect-video bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg overflow-hidden flex-shrink-0">
            <img
              className="w-full h-full object-cover"
              src={getThumbnailUrl(video)}
              alt={video.basic_info.title}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
                <Play className="w-8 h-8 text-gray-900 ml-1" />
              </div>
            </div>
            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
              {formatDuration(video.basic_info.duration_seconds)}
            </div>
            {video.basic_info.video_platform && (
              <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md capitalize flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                {video.basic_info.video_platform}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 min-h-[1.5rem]">
                <Building2 className="w-4 h-4" />
                <span className="font-medium">{video.company_info.company_name}</span>
              </div>
              <CardTitle className="text-base sm:text-lg leading-tight line-clamp-2 sm:line-clamp-3 group-hover:text-primary-600 transition-colors min-h-[3rem] sm:min-h-[5.25rem]">
                {video.basic_info.title}
              </CardTitle>
            </div>

            <p className="text-gray-600 line-clamp-2">
              {video.analysis_metadata.summary}
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-100 text-emerald-700 border-0">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {video.solution_overview.pricing_model}
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 border-0">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {video.solution_overview.maturity_level}
                </Badge>
                <Badge className="bg-slate-100 text-slate-700 border-0">
                  <Tag className="w-3 h-3 mr-1" />
                  {video.solution_overview.category}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {video.analysis_metadata.tags.slice(0, 5).map((tag, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {video.analysis_metadata.tags.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{video.analysis_metadata.tags.length - 5} more
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-1 text-primary-600">
                <span className="text-sm font-medium">View Details</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
    </Link>
  );
}