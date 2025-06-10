# GMRX - Government Market Research Exchange

AI-powered platform for defense contractors to analyze vendor capabilities through video content from the Tradewinds Solution Marketplace.

## Overview

GMRX leverages Google's Gemini AI to help government agencies and defense contractors quickly understand vendor capabilities by analyzing video presentations. The platform provides an intelligent chat interface that can answer questions about vendor offerings, technical capabilities, and market research insights.

## Features

- **AI-Powered Video Analysis**: Chat with AI about 50+ vendor presentations
- **Intelligent Search**: Find solutions by category (AI/ML, Cybersecurity, Data Analytics, etc.)
- **Interactive Chat**: Ask detailed questions about vendor capabilities
- **Responsive Design**: Premium UI/UX optimized for mobile and desktop
- **Fast Performance**: Built with modern web technologies for instant responses

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React-based full-stack framework)
- **UI**: React 19 + Tailwind CSS 4.0
- **AI**: Google Gemini 2.0 Flash
- **Runtime**: Bun
- **Build**: Vinxi (Vite-based)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20+ or Bun
- Google Cloud account with Gemini API access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/userogue/marketplace.git
cd marketplace
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up environment variables:
```bash
cp .env.local .env
```

4. Add your Gemini API key to `.env`:
```
GEMINI_API_KEY=your_api_key_here
```

### Development

Start the development server:
```bash
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:3000`.

### Building for Production

```bash
npm run build
# or
bun run build
```

### Deployment

The app is configured for deployment on Vercel:

```bash
npm run deploy
# or
vercel
```

## Project Structure

```
tw-marketplace/
├── app/                    # Application code
│   ├── routes/            # Page routes
│   ├── components/        # React components
│   ├── lib/              # Utilities and AI logic
│   └── data/             # Video metadata
├── public/               # Static assets
└── scripts/             # Data processing scripts
```

## Usage

1. **Browse Videos**: Explore vendor presentations from the homepage
2. **Ask Questions**: Use the chat interface to ask about specific capabilities
3. **Filter by Category**: Find vendors in specific technology areas
4. **Get Insights**: Receive AI-powered analysis of vendor offerings

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Tradewinds Solution Marketplace for vendor video content
- Google Gemini for AI capabilities
- The defense technology community