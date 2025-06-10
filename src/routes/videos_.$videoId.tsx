import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import videosMetadata from "../data/videos-metadata"
import type { VideoMetadata } from "../data/videos-metadata"
import { 
  Play, 
  Clock, 
  Building2, 
  DollarSign,
  Calendar,
  Award,
  ChevronRight,
  FileText,
  Download,
  Share2,
  BookOpen,
  Target,
  Users,
  Shield,
  Zap,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Mail,
  Phone,
  ExternalLink,
  ArrowLeft,
  Sparkles,
  BarChart3
} from "lucide-react"
import { Link } from "@tanstack/react-router"

export const Route = createFileRoute('/videos_/$videoId')({
  component: VideoDetailPage,
})

function VideoDetailPage() {
  const { videoId } = Route.useParams();
  // Find video by id instead of key
  const video = Object.values(videosMetadata).find(v => v.id === videoId);

  if (!video) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Video not found</h1>
          <Link to="/videos" className="text-primary-600 hover:text-primary-700">
            Return to videos
          </Link>
        </div>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShareClick = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    // TODO: Add toast notification
  };

  const handleContactClick = () => {
    if (video.company_info.contact_info) {
      window.location.href = `mailto:${video.company_info.contact_info}?subject=Information Request: ${video.basic_info.title}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Breadcrumb Navigation */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-14 sm:top-16 z-40">
        <div className="section-container py-3 sm:py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/videos" className="text-gray-600 hover:text-primary-600 flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              All Videos
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate max-w-[150px] sm:max-w-xs">
              {video.basic_info.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section with Video Player */}
      <section className="relative">
        <div className="section-container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                {video.basic_info.video_url && video.basic_info.video_platform === 'youtube' ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.basic_info.video_url.split('v=')[1].split('&')[0]}`}
                    title={video.basic_info.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : video.basic_info.video_url && video.basic_info.video_platform === 'vimeo' ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://player.vimeo.com/video/${video.basic_info.video_url.split('/').pop()}`}
                    title={video.basic_info.title}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    controls
                    className="w-full h-full"
                    src={`/app/resources/${video.basic_info.filename}`}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              
              {/* Video Info */}
              <div className="mt-6 space-y-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {video.basic_info.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">{video.company_info.company_name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(video.basic_info.duration_seconds)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{video.basic_info.date_processed}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {video.analysis_metadata.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="bg-gray-100">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Acquisition Actions Sidebar */}
            <div className="lg:col-span-1">
              <Card className="card-elevated lg:sticky lg:top-32 overflow-hidden">
                <CardHeader className="bg-gradient-to-br from-primary-50 to-cyan-50 p-4 sm:p-6 pb-4 sm:pb-6">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary-600" />
                    Acquisition Tools
                  </CardTitle>
                  <CardDescription className="text-gray-700">
                    Start your procurement process
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-4 sm:pt-6">
                  <Button disabled className="w-full opacity-60 cursor-not-allowed">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate J&A Document
                    <Badge variant="secondary" className="ml-auto text-xs">Coming Soon</Badge>
                  </Button>
                  
                  <Button disabled variant="outline" className="w-full opacity-60 cursor-not-allowed">
                    <Download className="w-4 h-4 mr-2" />
                    Download Market Research
                    <Badge variant="secondary" className="ml-auto text-xs">Coming Soon</Badge>
                  </Button>
                  
                  <Button disabled variant="outline" className="w-full opacity-60 cursor-not-allowed">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Acquisition Pathway
                    <Badge variant="secondary" className="ml-auto text-xs">Coming Soon</Badge>
                  </Button>
                  
                  <Button variant="outline" className="w-full hover:bg-gray-50" onClick={handleShareClick}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share with Team
                  </Button>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-3">
                    <h4 className="text-sm font-semibold text-gray-900">Solution Details</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full" />
                          <span className="text-sm text-gray-600">Category</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 text-right max-w-[140px]">
                          {video.solution_overview.category}
                        </span>
                      </div>
                      
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full" />
                          <span className="text-sm text-gray-600">Pricing</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 text-right max-w-[140px]">
                          {video.solution_overview.pricing_model}
                        </span>
                      </div>
                      
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full" />
                          <span className="text-sm text-gray-600">Maturity</span>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            video.solution_overview.maturity_level === 'Mature' 
                              ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                              : video.solution_overview.maturity_level === 'Emerging'
                              ? 'bg-amber-100 text-amber-700 border-amber-200'
                              : 'bg-gray-100 text-gray-700 border-gray-200'
                          }`}
                        >
                          {video.solution_overview.maturity_level || "N/A"}
                        </Badge>
                      </div>
                      
                      {video.solution_overview.certifications_compliance.length > 0 && (
                        <div className="pt-2 border-t">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-3.5 h-3.5 text-blue-600" />
                            <span className="text-xs font-medium text-gray-700">Compliance</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {video.solution_overview.certifications_compliance.map((cert, i) => (
                              <Badge 
                                key={i} 
                                variant="outline" 
                                className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                              >
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {video.company_info.contact_info && (
                    <div className="pt-4 mt-2 border-t">
                      <Button variant="outline" className="w-full bg-white hover:bg-gray-50" size="sm" onClick={handleContactClick}>
                        <Mail className="w-4 h-4 mr-2" />
                        Request Information
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Information Tabs */}
      <section className="py-12">
        <div className="section-container">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 w-full max-w-3xl mx-auto gap-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="solution">Solution</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="implementation">Implementation</TabsTrigger>
              <TabsTrigger value="evidence">Evidence</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="card-data">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary-600" />
                    Executive Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {video.analysis_metadata.summary}
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Card className="card-data">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                      Problem Addressed
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">
                      {video.market_research_insights.problem_addressed.description}
                    </p>
                    <div>
                      <p className="font-medium text-gray-900 mb-2">Key Pain Points:</p>
                      <ul className="space-y-1">
                        {(Array.isArray(video.market_research_insights.problem_addressed.pain_points) 
                          ? video.market_research_insights.problem_addressed.pain_points 
                          : [video.market_research_insights.problem_addressed.pain_points]
                        ).map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-data">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Target Market
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-900 mb-2">Primary Agencies:</p>
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(video.market_research_insights.target_market.primary_agencies)
                          ? video.market_research_insights.target_market.primary_agencies
                          : [video.market_research_insights.target_market.primary_agencies]
                        ).map((agency, i) => (
                          <Badge key={i} className="bg-blue-100 text-blue-700 border-0">
                            {agency}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-900 mb-2">Use Cases:</p>
                      <ul className="space-y-1">
                        {(Array.isArray(video.market_research_insights.target_market.use_cases)
                          ? video.market_research_insights.target_market.use_cases.slice(0, 5)
                          : [video.market_research_insights.target_market.use_cases]
                        ).map((useCase, i) => (
                          <li key={i} className="text-sm text-gray-600">• {useCase}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="solution" className="space-y-6">
              <Card className="card-data">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-slate-600" />
                    Solution Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gradient-to-r from-primary-50 to-cyan-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {video.solution_overview.solution_name}
                    </h4>
                    <p className="text-gray-700">
                      {video.market_research_insights.solution_approach.unique_value_prop}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(Array.isArray(video.market_research_insights.solution_approach.key_features)
                        ? video.market_research_insights.solution_approach.key_features
                        : [video.market_research_insights.solution_approach.key_features]
                      ).map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {video.market_research_insights.solution_approach.technical_approach && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Technical Approach</h4>
                      <p className="text-gray-700">
                        {video.market_research_insights.solution_approach.technical_approach}
                      </p>
                    </div>
                  )}

                  {video.solution_overview.technologies_mentioned.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {video.solution_overview.technologies_mentioned.map((tech, i) => (
                          <Badge key={i} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="benefits" className="space-y-6">
              <Card className="card-data">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    Benefits & Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {video.market_research_insights.benefits_claimed.efficiency_gains && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-emerald-600">
                          <BarChart3 className="w-5 h-5" />
                          <h4 className="font-semibold">Efficiency Gains</h4>
                        </div>
                        <p className="text-gray-700">
                          {video.market_research_insights.benefits_claimed.efficiency_gains}
                        </p>
                      </div>
                    )}

                    {video.market_research_insights.benefits_claimed.cost_savings && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-emerald-600">
                          <DollarSign className="w-5 h-5" />
                          <h4 className="font-semibold">Cost Savings</h4>
                        </div>
                        <p className="text-gray-700">
                          {video.market_research_insights.benefits_claimed.cost_savings}
                        </p>
                      </div>
                    )}

                    {video.market_research_insights.benefits_claimed.risk_reduction && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-blue-600">
                          <Shield className="w-5 h-5" />
                          <h4 className="font-semibold">Risk Reduction</h4>
                        </div>
                        <p className="text-gray-700">
                          {video.market_research_insights.benefits_claimed.risk_reduction}
                        </p>
                      </div>
                    )}

                    {video.market_research_insights.benefits_claimed.quantified_impact && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Award className="w-5 h-5" />
                          <h4 className="font-semibold">Quantified Impact</h4>
                        </div>
                        <p className="text-gray-700">
                          {video.market_research_insights.benefits_claimed.quantified_impact}
                        </p>
                      </div>
                    )}
                  </div>

                  {video.market_research_insights.benefits_claimed.other_benefits && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Additional Benefits</h4>
                      <ul className="space-y-2">
                        {(Array.isArray(video.market_research_insights.benefits_claimed.other_benefits)
                          ? video.market_research_insights.benefits_claimed.other_benefits
                          : [video.market_research_insights.benefits_claimed.other_benefits]
                        ).map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="implementation" className="space-y-6">
              <Card className="card-data">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-gray-600" />
                    Implementation Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {video.market_research_insights.implementation.deployment_model && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Deployment Model</h4>
                      <p className="text-gray-700">
                        {video.market_research_insights.implementation.deployment_model}
                      </p>
                    </div>
                  )}

                  {video.market_research_insights.implementation.integration_points && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Integration Points</h4>
                      <ul className="space-y-2">
                        {(Array.isArray(video.market_research_insights.implementation.integration_points)
                          ? video.market_research_insights.implementation.integration_points
                          : [video.market_research_insights.implementation.integration_points]
                        ).map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {video.market_research_insights.implementation.timeline && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Timeline</h4>
                      <p className="text-gray-700">
                        {video.market_research_insights.implementation.timeline}
                      </p>
                    </div>
                  )}

                  {video.market_research_insights.challenges_limitations.prerequisites && 
                   video.market_research_insights.challenges_limitations.prerequisites.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Prerequisites</h4>
                      <ul className="space-y-2">
                        {video.market_research_insights.challenges_limitations.prerequisites.map((prereq, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{prereq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evidence" className="space-y-6">
              <Card className="card-data">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-indigo-600" />
                    Evidence & Validation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {video.market_research_insights.evidence_provided.case_studies && 
                   video.market_research_insights.evidence_provided.case_studies.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Case Studies</h4>
                      <div className="space-y-3">
                        {video.market_research_insights.evidence_provided.case_studies.map((study, i) => (
                          <div key={i} className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700">{study}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {video.market_research_insights.evidence_provided.metrics && 
                   video.market_research_insights.evidence_provided.metrics.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Metrics</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {video.market_research_insights.evidence_provided.metrics.map((metric, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                            <span className="text-gray-700">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {video.extracted_content.key_quotes && 
                   video.extracted_content.key_quotes.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Quotes</h4>
                      <div className="space-y-3">
                        {video.extracted_content.key_quotes.slice(0, 3).map((quote, i) => (
                          <blockquote key={i} className="border-l-4 border-indigo-400 pl-4 italic text-gray-700">
                            "{quote}"
                          </blockquote>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Quick Actions Footer */}
      <section className="py-12 border-t bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Proceed?</h3>
            <p className="text-gray-600">Start your acquisition process with confidence</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <Card className="card-data hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <FileText className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Generate J&A</h4>
                <p className="text-sm text-gray-600">
                  Create your Justification & Approval document
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-data hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Acquisition Guide</h4>
                <p className="text-sm text-gray-600">
                  View step-by-step procurement pathway
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-data hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Mail className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Contact Vendor</h4>
                <p className="text-sm text-gray-600">
                  Request additional information
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

// Add missing import
import { Settings } from "lucide-react"