import { Link, useRouter } from "@tanstack/react-router";
import { Menu, X, ChevronRight, Sparkles, Database, Video, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const isLandingPage = router.state.location.pathname === "/";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { path: "/videos", label: "Videos", icon: Video },
    { path: "/market-research", label: "AI Research", icon: MessageSquare },
  ];

  const currentPath = router.state.location.pathname;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "nav-glass py-3 shadow-lg"
            : "bg-transparent py-6"
        }`}
      >
        <div className="section-container">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center space-x-2 transform transition-transform duration-200 hover:scale-105"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-cta rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-cta rounded-lg blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-200" />
              </div>
              <span className="font-bold text-xl gradient-text hidden sm:inline">
                GMRX
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = currentPath === link.path;
                
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      relative px-4 py-2 rounded-lg font-medium transition-all duration-200
                      group flex items-center space-x-2
                      ${isActive 
                        ? "text-primary-600 bg-primary-50" 
                        : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? "text-primary-600" : "text-gray-500 group-hover:text-primary-600"
                    }`} />
                    <span>{link.label}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-cta rounded-full" />
                    )}
                  </Link>
                );
              })}
              
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`
                md:hidden relative w-10 h-10 rounded-lg
                flex items-center justify-center
                transition-all duration-200 transform hover:scale-105
                ${isScrolled 
                  ? "bg-white shadow-md" 
                  : "bg-white/90 backdrop-blur-sm shadow-lg"
                }
              `}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <span className={`absolute w-5 h-0.5 bg-gray-900 transition-all duration-200 ${
                  isOpen ? "rotate-45" : "-translate-y-1.5"
                }`} />
                <span className={`absolute w-5 h-0.5 bg-gray-900 transition-all duration-200 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`} />
                <span className={`absolute w-5 h-0.5 bg-gray-900 transition-all duration-200 ${
                  isOpen ? "-rotate-45" : "translate-y-1.5"
                }`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden transition-all duration-300
          ${isOpen ? "visible opacity-100" : "invisible opacity-0"}
        `}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`
            absolute right-0 top-0 h-full w-full max-w-sm
            bg-white shadow-2xl transform transition-transform duration-300
            ${isOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <span className="font-bold text-xl gradient-text">GMRX</span>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-6 space-y-2">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = currentPath === link.path;
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center justify-between p-4 rounded-xl
                    transition-all duration-200 transform hover:scale-105
                    ${isActive 
                      ? "bg-gradient-cta text-white shadow-lg" 
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }
                    animate-slide-up
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-600"}`} />
                    <span className="font-semibold text-lg">{link.label}</span>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                </Link>
              );
            })}
          </div>

          {/* Bottom Section */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <span>Powered by</span>
              <span className="font-semibold gradient-text">AI Market Intelligence</span>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed navigation */}
      <div className={isLandingPage ? "h-20" : "h-24"} />
    </>
  );
}