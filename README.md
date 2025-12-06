# Klippy - AI-Powered Viral Clip Generator

A Next.js-based SaaS frontend for generating viral short-form clips from long-form video content using AI.

## Features

- **AI-Powered Clip Generation**: Automatically detect highlights and create viral clips
- **Face Tracking**: Smart reframing to keep subjects centered in 9:16 format
- **Auto Captions**: Whisper-powered transcription with animated subtitles
- **Viral Score Analysis**: Predict engagement potential for each clip
- **Beautiful UI**: Modern, animated interface with gradient effects

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Runtime**: React 19

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
.
├── app/
│   ├── page.tsx        # Main Klippy component
│   ├── layout.tsx      # Root layout with metadata
│   └── globals.css     # Global styles and Tailwind imports
├── public/             # Static assets
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Improvements Needed

### Backend Integration

The current implementation uses mock data. The following backend integrations are needed:

1. **Video Processing API**
   - Endpoint to accept video URLs (YouTube, direct uploads)
   - Video download and preprocessing
   - Audio extraction for transcription

2. **AI Services**
   - Whisper API integration for transcription
   - Highlight detection using audio waveform analysis
   - Face tracking and detection ML models
   - Scene change detection

3. **Clip Generation**
   - FFmpeg integration for video processing
   - Automated reframing to 9:16 aspect ratio
   - Caption overlay rendering
   - Clip export in multiple formats

4. **User Management**
   - Authentication (OAuth, email/password)
   - User dashboard and clip history
   - Storage for generated clips
   - Usage tracking and quotas

5. **Payment Integration**
   - Stripe/payment gateway setup
   - Subscription management
   - Usage-based billing

### Frontend Improvements

1. **Error Handling**
   - Add proper error boundaries
   - Display user-friendly error messages
   - Retry logic for failed API calls

2. **Loading States**
   - Skeleton loaders
   - Better progress indicators
   - Optimistic UI updates

3. **Responsive Design**
   - Mobile optimization
   - Tablet layouts
   - Touch interactions

4. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

5. **Performance**
   - Image optimization
   - Lazy loading for clips
   - Code splitting

6. **Features**
   - Clip preview player
   - Download options (format, quality)
   - Share functionality
   - Clip editing tools

### API Endpoints Needed

```typescript
// Example API structure needed

POST /api/videos/analyze
- Accept video URL or file upload
- Return job ID for processing

GET /api/jobs/:id
- Check processing status
- Return progress percentage

GET /api/clips/:jobId
- Retrieve generated clips
- Return array of clip metadata and URLs

POST /api/clips/:id/download
- Download specific clip
- Support different formats/qualities

POST /api/auth/login
POST /api/auth/register
GET /api/user/profile
GET /api/user/clips
```

## Environment Variables

Create a `.env.local` file with the following variables (when backend is ready):

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
OPENAI_API_KEY=your_openai_key
AWS_S3_BUCKET=your_bucket
STRIPE_SECRET_KEY=your_stripe_key
```

## License

All rights reserved.
