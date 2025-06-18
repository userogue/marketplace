// app/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  ArrowRight, 
  PlayCircle, 
  FileText, 
  Search, 
  BarChart3, 
  Users, 
  Shield, 
  TrendingUp,
  Sparkles,
  Database,
  Zap,
  Globe,
  ChevronRight,
  Star,
  Building2,
  Mail,
  Send
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    title: "GMRX | Tradewinds Marketplace Video Research Platform",
    meta: [
      {
        name: "description",
        content: "AI-powered analysis of Tradewinds Solution Marketplace vendor videos. Extract insights, capabilities, and procurement data instantly."
      },
      {
        property: "og:title",
        content: "GMRX | Tradewinds Marketplace Video Research Platform"
      },
      {
        property: "og:description",
        content: "Analyze Tradewinds vendor videos with AI. Get instant insights on capabilities, solutions, and procurement opportunities."
      }
    ]
  }),
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Premium Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Morphing gradients */}
        <div className="absolute top-20 left-10 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 morphing-gradient opacity-30" />
        <div className="absolute bottom-20 right-20 w-80 sm:w-96 md:w-[32rem] h-80 sm:h-96 md:h-[32rem] morphing-gradient opacity-20" style={{ animationDelay: "4s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[32rem] md:w-[48rem] h-96 sm:h-[32rem] md:h-[48rem] morphing-gradient opacity-10" style={{ animationDelay: "2s" }} />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230a1929' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          animation: 'float 20s ease-in-out infinite'
        }} />
      </div>
      
      {/* Noise texture overlay */}
      <div className="fixed inset-0 noise-overlay pointer-events-none" />

      {/* Hero Section */}
      <section className="relative px-4 py-16 md:px-8 md:py-24 lg:py-32">
        <div className="section-container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Premium Badge */}
            <div className="relative inline-flex items-center mb-8 group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-cyan-400 rounded-full blur-lg opacity-40 group-hover:opacity-60 animate-pulse transition-opacity" />
              <div className="relative inline-flex items-center space-x-2 px-6 py-3 rounded-full gradient-border bg-white/90 backdrop-blur-sm text-primary-700 text-sm font-semibold animate-fade-in hover:scale-105 transition-transform cursor-default">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>Tradewinds Marketplace Intelligence</span>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              </div>
            </div>
            
            {/* Premium Main Heading */}
            <h1 className="mb-8 relative">
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight animate-slide-up">
                <span className="inline-block hover:animate-glitch cursor-default bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 bg-clip-text text-transparent">GMRX</span>
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2 animate-slide-up animation-delay-100">
                <span className="relative inline-block">
                  <span className="absolute inset-0 gradient-text blur-lg opacity-70"></span>
                  <span className="relative gradient-text">Tradewinds Video Research</span>
                </span>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 opacity-20">
                <div className="w-full h-full bg-gradient-to-br from-primary-400 to-cyan-400 rounded-full blur-2xl animate-pulse" />
              </div>
            </h1>
            
            {/* Subheading */}
            <p className="mx-auto mb-10 max-w-2xl text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed animate-slide-up animation-delay-100 px-4">
              Instantly analyze Tradewinds Solution Marketplace vendor videos. Extract key insights, 
              capabilities, and procurement data with AI-powered research tools.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-200">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <Button asChild size="lg" className="relative btn-primary min-w-[200px] hover-glow">
                  <Link to="/videos">
                    <Database className="mr-2 h-5 w-5" />
                    Browse Vendors
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              <Button asChild size="lg" className="btn-secondary min-w-[200px] group backdrop-blur-sm">
                <Link to="/market-research">
                  <PlayCircle className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                  <span>Analyze Videos</span>
                </Link>
              </Button>
            </div>

            {/* Premium Stats - Real Data */}
            <div className="mt-20 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-100/20 to-cyan-100/20 blur-3xl" />
              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                <StatCard number="50+" label="Vendor Videos" delay="0" />
                <StatCard number="12" label="Categories" delay="100" />
                <StatCard number="100+" label="Solutions" delay="200" />
                <StatCard number="24/7" label="AI Analysis" delay="300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-4 py-20 md:px-8">
        <div className="section-container relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">
              Procurement tools that work
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Purpose-built for defense acquisitions. No fluff.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <FeatureCard
              icon={<FileText className="h-8 w-8" />}
              title="J&A Generator"
              description="Create compliant justification documents in minutes. Not hours."
              color="text-blue-600"
              bgColor="bg-blue-50"
            />
            <FeatureCard
              icon={<Search className="h-8 w-8" />}
              title="Market Research"
              description="Real vendor data. Real contract history. Real insights."
              color="text-slate-700"
              bgColor="bg-slate-50"
            />
            <FeatureCard
              icon={<TrendingUp className="h-8 w-8" />}
              title="Acquisition Pathway"
              description="Navigate FAR/DFAR requirements without the headache."
              color="text-emerald-600"
              bgColor="bg-emerald-50"
            />
            <FeatureCard
              icon={<FileText className="h-8 w-8" />}
              title="Contract Mods"
              description="Amendments that pass legal review. First time."
              color="text-orange-600"
              bgColor="bg-orange-50"
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8" />}
              title="Performance Tracking"
              description="Know if vendors deliver. Before it's too late."
              color="text-gray-700"
              bgColor="bg-gray-50"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Compliance Check"
              description="Sleep better knowing you're audit-ready."
              color="text-indigo-600"
              bgColor="bg-indigo-50"
            />
          </div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="relative px-4 py-20 md:px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="section-container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-0 px-6 py-2 shadow-md">
              <BarChart3 className="w-4 h-4 mr-2" />
              Platform Metrics
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-primary-900 bg-clip-text text-transparent">
                Real-Time Intelligence
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              Real-time insights from Tradewinds Solution Marketplace videos
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            <MetricCard
              icon={<Building2 className="w-6 h-6" />}
              title="Video Library"
              value="50+"
              subtitle="Tradewinds vendor presentations"
              gradient="from-blue-500 to-cyan-500"
            />
            <MetricCard
              icon={<Shield className="w-6 h-6" />}
              title="Categories"
              value="12"
              subtitle="From AI/ML to Cybersecurity"
              gradient="from-emerald-500 to-green-500"
            />
            <MetricCard
              icon={<Zap className="w-6 h-6" />}
              title="Insights Generated"
              value="1000+"
              subtitle="Daily AI-powered analyses"
              gradient="from-amber-500 to-orange-500"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-20 md:px-8">
        <div className="section-container">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-hero p-8 sm:p-12 md:p-16 text-center shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            <div className="relative z-10">
              <h3 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white text-shadow-md">
                Ready to Transform Your Market Research?
              </h3>
              <p className="mb-8 text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                Join thousands of defense professionals leveraging AI-powered insights for smarter procurement decisions.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-primary-700 hover:bg-gray-100 min-w-[200px]">
                  <Link to="/videos">
                    Browse Vendors
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 min-w-[200px]">
                  <a href="#demo">
                    Schedule Demo
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative px-4 py-20 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-0 px-6 py-2 shadow-md">
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-gray-900 to-primary-900 bg-clip-text text-transparent">
                  Have Questions?
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Whether you're a program manager, vendor, or just curious about GMRX, we'd love to hear from you.
              </p>
            </div>

            <Card className="shadow-xl border-0 overflow-hidden">
              <div className="bg-gradient-to-br from-primary-50 via-white to-cyan-50 p-8 md:p-12">
                <form 
                  action="https://formspree.io/f/myzjpokl" 
                  method="POST"
                  className="space-y-6"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="organization" className="block text-sm font-semibold text-gray-700 mb-2">
                      Organization (Optional)
                    </label>
                    <input
                      type="text"
                      name="organization"
                      id="organization"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                      placeholder="Your organization"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  
                  <div className="flex justify-center">
                    <Button type="submit" size="lg" className="btn-primary min-w-[200px] group">
                      <Send className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t bg-gray-50 px-4 py-12 md:px-8">
        <div className="section-container">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-cta rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl gradient-text">GMRX</span>
            </div>
            <p className="text-gray-600 mb-2">
              © {new Date().getFullYear()} GMRX - Government Market Research Exchange
            </p>
            <p className="text-sm text-gray-500">
              Empowering defense innovation through intelligent market analysis
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ number, label, delay }: { number: string; label: string; delay: string }) {
  return (
    <div className={`
      relative group cursor-pointer
      animate-slide-up animation-delay-${delay}
    `}>
      <div className="
        relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm 
        border border-gray-100 shadow-lg hover:shadow-xl
        transform transition-all duration-300 hover:-translate-y-1
        overflow-hidden
      ">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-100 to-cyan-100 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
        <div className="relative text-center">
          <div className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-br from-primary-600 to-cyan-600 bg-clip-text text-transparent">
            {number}
          </div>
          <div className="text-sm font-medium text-gray-700 mt-2">{label}</div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  color,
  bgColor
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="group relative h-full">
      {/* Premium glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
      
      <Card className="relative h-full bg-white/95 backdrop-blur-sm border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-transparent transform hover:-translate-y-1 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-gray-50/30" />
        
        {/* Animated corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-100/20 to-cyan-100/20 blur-2xl transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700" />
        
        <CardHeader className="relative">
          <div className="relative inline-flex">
            {/* Icon glow effect */}
            <div className={`absolute inset-0 ${bgColor} blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />
            <div className={`relative inline-flex p-4 rounded-xl ${bgColor} ${color} shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
              {icon}
            </div>
          </div>
          <CardTitle className="text-xl font-bold text-gray-900 mt-5 group-hover:text-primary-700 transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
            {description}
          </p>
          
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({
  icon,
  title,
  value,
  subtitle,
  gradient
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  gradient: string;
}) {
  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300" />
      <div className="relative p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div className={`inline-flex p-3 rounded-xl text-white bg-gradient-to-br ${gradient} mb-4`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="text-4xl font-black gradient-text mb-2">{value}</div>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}