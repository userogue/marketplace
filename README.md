# GMRX - Government Market Research Exchange

> **Live at [gmrx.us](https://gmrx.us)**

AI-powered platform for defense contractors to instantly analyze 50+ hours of vendor presentations from the Tradewinds Solution Marketplace.

## Why GMRX?

The DOD has 50+ hours of vendor pitch videos on Tradewinds. Program managers waste days watching them. GMRX turns days into seconds with AI-powered analysis that actually understands defense technology.

## Features

### 🎯 Instant Vendor Discovery
- Ask any question about defense vendors
- Get answers backed by actual video content
- No more watching hours of presentations

### 🧠 Intelligent Analysis
Our scripts extract:
- Technical capabilities mentioned in demos
- Certifications and clearance levels
- Past performance indicators
- Real technology stacks (not marketing speak)
- Contract vehicles and pricing models
- Team compositions and expertise

### ⚡ Built for Speed
- 5 messages per minute rate limiting
- Client-side protection against abuse
- Responsive design that works everywhere
- Modern stack for instant responses

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) - Modern React meta-framework
- **UI**: React 19 + Tailwind CSS 4.0
- **AI**: Google Gemini 2.0 Flash
- **Runtime**: Node.js 20+
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- Google Cloud account with Gemini API access

### Installation

```bash
# Clone the repository
git clone https://github.com/userogue/marketplace.git
cd marketplace

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Add your Gemini API key to .env
# GEMINI_API_KEY=your_actual_api_key_here
```

### Development

```bash
# Start development server
npm run dev

# Visit http://localhost:5173
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
marketplace/
├── src/
│   ├── routes/          # TanStack Start routes
│   │   ├── index.tsx    # Homepage
│   │   ├── videos.tsx   # Video library
│   │   ├── market-research.tsx  # AI chat interface
│   │   └── api.chat.ts  # Server API route
│   ├── components/      # React components
│   ├── lib/            # Utilities and AI logic
│   └── data/           # Video metadata
├── scripts/            # Video processing scripts
└── downloads/          # Video files (gitignored)
```

## The Power of Our Scripts

The real magic is in our video processing scripts:

```bash
# Download all Tradewinds videos
./download-videos.ts

# Extract comprehensive metadata
./extract-video-metadata.ts

# Consolidate into AI-ready format
./consolidate-video-metadata.ts
```

These scripts don't just transcribe - they understand:
- Contract vehicles mentioned
- Technology stacks used
- Clearance requirements
- Past performance claims
- Pricing models
- Team expertise

## Deployment

Configured for one-click Vercel deployment:

```bash
vercel
```

Or use the Vercel button in your GitHub repo.

## Why Open Source?

Good procurement tooling shouldn't be a profit center. It should be infrastructure. When procurement is efficient, taxpayers save money and warfighters get better technology faster.

## Contributing

Found a bug? Want to add a feature? PRs welcome!

1. Fork the repo
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT - see [LICENSE](LICENSE) file

## For Program Managers

Stop accepting garbage. Stop watching hours of videos. Start making informed decisions in minutes.

## For Vendors

Your capabilities are now discoverable by every government buyer. Make sure your Tradewinds video showcases your real capabilities, not just marketing fluff.

## For Developers

Fork it. Improve it. Deploy your own version. Show the government what modern tooling looks like.

---

Built with taxpayer interests in mind 🇺🇸