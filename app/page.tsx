"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Video, Zap, TrendingUp, Clock, Download, Play, ArrowRight, CheckCircle2, Sparkles, Eye, Target } from 'lucide-react';

interface Clip {
  id: number;
  title: string;
  duration: string;
  score: number;
  timestamp: string;
  engagement: string;
  thumbnail: string;
}

export default function KlippyApp() {
  const [activeTab, setActiveTab] = useState('landing');
  const [videoUrl, setVideoUrl] = useState('');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [clips, setClips] = useState<Clip[]>([]);
  const [stats, setStats] = useState({ clips: 0, score: 0, time: '0.0', videos: 0 });

  useEffect(() => {
    if (activeTab === 'landing') {
      const timer = setTimeout(() => {
        animateStats();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const animateStats = () => {
    let clipsCount = 0;
    let scoreCount = 0;
    let timeCount = 0;
    let videosCount = 0;

    const interval = setInterval(() => {
      if (clipsCount < 10) clipsCount++;
      if (scoreCount < 94) scoreCount += 3;
      if (timeCount < 5) timeCount += 0.5;
      if (videosCount < 15) videosCount++;

      setStats({
        clips: clipsCount,
        score: Math.min(scoreCount, 94),
        time: Math.min(timeCount, 5).toFixed(1),
        videos: Math.min(videosCount, 15)
      });

      if (clipsCount >= 10 && scoreCount >= 94 && timeCount >= 5 && videosCount >= 15) {
        clearInterval(interval);
      }
    }, 50);
  };

  const handleGenerate = async () => {
    if (!videoUrl) return;

    setActiveTab('processing');
    setProcessing(true);
    setProgress(0);

    const steps = [
      { label: 'Downloading video', duration: 2000 },
      { label: 'Transcribing audio', duration: 2500 },
      { label: 'Detecting highlights', duration: 2000 },
      { label: 'Tracking faces', duration: 1500 },
      { label: 'Reframing clips', duration: 2000 },
      { label: 'Adding captions', duration: 1500 },
      { label: 'Rendering final clips', duration: 2500 }
    ];

    let totalProgress = 0;
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i].label);
      const stepProgress = 100 / steps.length;

      await new Promise<void>(resolve => {
        const interval = setInterval(() => {
          totalProgress += stepProgress / 20;
          setProgress(Math.min(totalProgress, (i + 1) * stepProgress));
        }, steps[i].duration / 20);

        setTimeout(() => {
          clearInterval(interval);
          resolve();
        }, steps[i].duration);
      });
    }

    setProgress(100);
    setProcessing(false);

    setClips([
      {
        id: 1,
        title: "Viral Moment",
        duration: "0:47",
        score: 94,
        timestamp: "2:15 - 3:02",
        engagement: "+285%",
        thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=450&fit=crop"
      },
      {
        id: 2,
        title: "Key Highlight",
        duration: "0:52",
        score: 89,
        timestamp: "5:42 - 6:34",
        engagement: "+247%",
        thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=450&fit=crop"
      },
      {
        id: 3,
        title: "Peak Performance",
        duration: "0:38",
        score: 97,
        timestamp: "8:30 - 9:08",
        engagement: "+312%",
        thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=450&fit=crop"
      },
      {
        id: 4,
        title: "Best Quote",
        duration: "0:44",
        score: 91,
        timestamp: "11:20 - 12:04",
        engagement: "+268%",
        thumbnail: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=450&fit=crop"
      }
    ]);
    setActiveTab('results');
  };

  const ViralScoreChart = ({ score }: { score: number }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="rgba(106, 111, 255, 0.1)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="url(#scoreGradient)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6A6FFF" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold">{score}</div>
            <div className="text-xs text-gray-500">SCORE</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-white overflow-hidden relative" style={{ backgroundColor: '#0B1A2A' }}>

      <header className="relative border-b border-white/5 z-50" style={{ background: 'rgba(11, 26, 42, 0.95)' }}>
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6A6FFF 0%, #8B5CF6 100%)' }}>
              <Video className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">Klippy</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-400 hover:text-white transition">Features</a>
            <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition">Pricing</a>
            <a href="#examples" className="text-sm text-gray-400 hover:text-white transition">Examples</a>
            <button className="px-6 py-2.5 rounded-xl text-sm font-medium" style={{ background: 'linear-gradient(135deg, #6A6FFF 0%, #8B5CF6 100%)' }}>
              Try for Free
            </button>
          </nav>
        </div>
      </header>

      {activeTab === 'landing' && (
        <div className="relative">
          <section className="min-h-screen max-w-6xl mx-auto px-8 pt-32 pb-24 text-center relative flex flex-col justify-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-10 border"
                style={{
                  background: 'rgba(106, 111, 255, 0.08)',
                  borderColor: 'rgba(106, 111, 255, 0.2)'
                }}
              >
                <Sparkles className="w-4 h-4" style={{ color: '#6A6FFF' }} />
                <span className="text-sm font-medium" style={{ color: '#6A6FFF' }}>AI-Powered Clip Generation</span>
              </div>
            </div>

            <h1 className="text-7xl md:text-8xl font-bold mb-6 tracking-tight leading-[1.05]">
              Your content. Viral.
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #6A6FFF 0%, #d4af37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                In minutes.
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed">
              No editing. No guesswork. Automatically detect highlights, track faces, add captions, and reframe your long-form content into 8–15 short viral clips.
            </p>

            <div className="max-w-2xl mx-auto mb-20">
                  <div
                    className="flex items-center gap-3 rounded-2xl p-2 border"
                    style={{
                      background: 'rgba(15, 34, 53, 0.6)',
                      borderColor: 'rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Paste YouTube or video URL..."
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="flex-1 bg-transparent px-5 py-4 text-base outline-none placeholder-gray-500"
                    />
                    <button
                      onClick={handleGenerate}
                      disabled={!videoUrl}
                      className="px-8 py-4 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                      style={{ background: 'linear-gradient(135deg, #6A6FFF 0%, #8B5CF6 100%)' }}
                    >
                      Generate
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
            </div>

            <div className="grid grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { value: stats.clips + 'M+', label: "Clips Generated", icon: Video },
                { value: stats.score + '%', label: "Avg Viral Score", icon: TrendingUp },
                { value: stats.videos + '', label: "Clips Per Video", icon: Target },
                { value: '<' + stats.time + 'min', label: "Processing Time", icon: Clock }
              ].map((stat, i) => (
                <div key={i}>
                  <div
                    className="rounded-2xl p-8 border group cursor-pointer relative overflow-hidden"
                    style={{
                      background: 'rgba(20, 25, 35, 0.6)',
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <stat.icon className="w-8 h-8 mb-3 mx-auto opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: '#6A6FFF' }} />
                    <div className="text-3xl font-bold mb-1" style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #d4af37 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-8 py-32 relative">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                AI that understands
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #6A6FFF 0%, #d4af37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  viral content
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Every frame analyzed to detect engagement peaks, track subjects, and optimize for maximum reach.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: "Highlight Detection",
                  desc: "AI identifies viral moments using waveform and scene analysis",
                  color: "#6A6FFF"
                },
                {
                  icon: Eye,
                  title: "Face Tracking",
                  desc: "Keeps subjects perfectly centered with smart reframing to 9:16",
                  color: "#8B5CF6"
                },
                {
                  icon: Zap,
                  title: "Auto Captions",
                  desc: "Whisper-powered transcription with animated subtitle overlays",
                  color: "#d4af37"
                }
              ].map((feature, i) => (
                <div key={i}>
                  <div
                    className="rounded-2xl p-10 border group cursor-pointer relative overflow-hidden"
                    style={{
                      background: 'rgba(20, 25, 35, 0.95)',
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                      style={{ background: 'radial-gradient(circle at center, ' + feature.color + ' 0%, transparent 70%)' }}
                    />
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10"
                      style={{ background: feature.color + '15' }}
                    >
                      <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 relative z-10">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed relative z-10">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-8 py-32 relative">
            <div
              className="rounded-3xl p-12 border"
              style={{
                background: 'rgba(15, 34, 53, 0.95)',
                borderColor: 'rgba(255, 255, 255, 0.05)'
              }}
            >
              <h3 className="text-4xl font-bold mb-4">Performance increase with Klippy</h3>
              <p className="text-lg text-gray-400 mb-12">
                AI-generated clips consistently outperform manual editing
              </p>

              <div className="relative h-80">
                <svg className="w-full h-full">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6A6FFF" />
                      <stop offset="100%" stopColor="#d4af37" />
                    </linearGradient>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#6A6FFF" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#6A6FFF" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1="80"
                      y1={60 + i * 55}
                      x2="100%"
                      y2={60 + i * 55}
                      stroke="rgba(255,255,255,0.03)"
                      strokeWidth="1"
                    />
                  ))}

                  <path
                    d="M 80 260 L 200 255 L 320 250 L 440 248 L 560 246 L 680 244 L 800 242"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="6,6"
                  />

                  <path
                        d="M 80 260 L 200 210 L 320 160 L 440 110 L 560 80 L 680 65 L 800 60"
                        stroke="url(#lineGradient)"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        filter="url(#glow)"
                        className="animate-pulse"
                        style={{
                          strokeDasharray: 1000,
                          strokeDashoffset: 1000,
                          animation: 'drawLine 2s ease-out forwards'
                        }}
                      />
                      <path
                        d="M 80 260 L 200 210 L 320 160 L 440 110 L 560 80 L 680 65 L 800 60 L 800 280 L 80 280 Z"
                        fill="url(#areaGradient)"
                        style={{
                          opacity: 0,
                          animation: 'fadeIn 1s ease-out 1s forwards'
                        }}
                      />

                  {[[80, 260], [200, 210], [320, 160], [440, 110], [560, 80], [680, 65], [800, 60]].map(([x, y], i) => (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="6"
                      fill="#6A6FFF"
                      style={{
                        opacity: 0,
                        animation: 'fadeIn 0.5s ease-out ' + (1.5 + i * 0.1) + 's forwards'
                      }}
                    />
                  ))}
                </svg>

                <div className="absolute bottom-2 left-16 text-xs text-gray-600 font-mono">0</div>
                <div className="absolute bottom-2 right-8 text-xs text-gray-600 font-mono">500 CLIPS</div>
                <div className="absolute top-8 left-2 text-xs text-gray-600 font-mono transform -rotate-90 origin-left">ENGAGEMENT</div>

                <div className="absolute top-8 right-8 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-1 rounded" style={{ background: 'linear-gradient(90deg, #6A6FFF 0%, #d4af37 100%)' }} />
                    <span className="text-sm text-gray-300">Klippy AI</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-0.5 bg-white/15 rounded" />
                    <span className="text-sm text-gray-400">Manual Editing</span>
                  </div>
                </div>

                <div
                  className="absolute top-1/3 right-1/4 rounded-xl px-5 py-4 border"
                  style={{
                    background: 'rgba(11, 26, 42, 0.98)',
                    borderColor: 'rgba(106, 111, 255, 0.3)',
                    animation: 'slideInRight 0.8s ease-out 2s forwards',
                    opacity: 0
                  }}
                >
                  <div className="text-3xl font-bold mb-1" style={{ color: '#6A6FFF' }}>+247%</div>
                  <div className="text-xs text-gray-400">Avg Increase</div>
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-4xl mx-auto px-8 py-32 text-center relative">
            <div
              className="rounded-3xl p-16 border relative overflow-hidden"
              style={{
                background: 'rgba(15, 34, 53, 0.95)',
                borderColor: 'rgba(106, 111, 255, 0.2)'
              }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{ background: 'radial-gradient(circle at center, #6A6FFF 0%, transparent 70%)' }}
              />
              <h2 className="text-5xl font-bold mb-6 relative z-10">
                Ready to go viral?
              </h2>
              <p className="text-xl text-gray-400 mb-10 relative z-10">
                Join 500K+ creators making viral content with AI
              </p>
              <button
                onClick={() => document.querySelector('input')?.focus()}
                className="px-10 py-5 rounded-xl text-lg font-semibold"
                style={{
                  background: 'linear-gradient(135deg, #6A6FFF 0%, #d4af37 100%)',
                  boxShadow: '0 10px 40px rgba(106, 111, 255, 0.3)'
                }}
              >
                Make Your First Viral Clip
              </button>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'processing' && (
        <div className="flex items-center justify-center min-h-screen px-8">
          <div className="max-w-2xl w-full">
            <div className="text-center mb-16">
              <div className="relative w-40 h-40 mx-auto mb-12">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="72"
                    stroke="rgba(106, 111, 255, 0.1)"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="72"
                    stroke="url(#progressGradient)"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 72}
                    strokeDashoffset={2 * Math.PI * 72 * (1 - progress / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6A6FFF" />
                      <stop offset="100%" stopColor="#d4af37" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-10 h-10 mx-auto mb-2 animate-pulse" style={{ color: '#6A6FFF' }} />
                    <div className="text-4xl font-bold">{Math.round(progress)}%</div>
                  </div>
                </div>
              </div>

              <h2 className="text-4xl font-bold mb-3">Analyzing your video</h2>
              <p className="text-xl text-gray-400 mb-12">{currentStep}...</p>

              <div className="space-y-3 text-left max-w-md mx-auto">
                {[
                  'Downloading video',
                  'Transcribing audio',
                  'Detecting highlights',
                  'Tracking faces',
                  'Reframing clips',
                  'Adding captions',
                  'Rendering final clips'
                ].map((step, i) => {
                  const stepProgress = (i + 1) * (100 / 7);
                  const isComplete = progress >= stepProgress;
                  const isCurrent = currentStep === step;

                  return (
                    <div key={i} className={'flex items-center gap-3 text-sm transition ' + (isComplete ? 'text-white' : isCurrent ? 'text-white' : 'text-gray-600')} style={{ color: isComplete ? '#6A6FFF' : undefined }}>
                      {isComplete ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <div className={'w-5 h-5 rounded-full border-2 ' + (isCurrent ? 'border-white' : 'border-gray-700')} style={{ borderColor: isCurrent ? '#6A6FFF' : undefined }} />
                      )}
                      <span>{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'results' && (
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-2">Your viral clips are ready</h2>
              <p className="text-lg text-gray-400">Generated {clips.length} high-performing clips</p>
            </div>
            <button
              onClick={() => {
                setActiveTab('landing');
                setVideoUrl('');
                setClips([]);
              }}
              className="px-6 py-3 rounded-xl border"
              style={{
                background: 'rgba(15, 34, 53, 0.6)',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              Generate New
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {clips.map((clip: any) => (
              <div key={clip.id} className="group rounded-2xl overflow-hidden border" style={{
                background: 'rgba(15, 34, 53, 0.95)',
                borderColor: 'rgba(255, 255, 255, 0.05)'
              }}>
                <div className="relative aspect-video">
                  <img
                    src={clip.thumbnail}
                    alt={clip.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0B1A2A 0%, transparent 50%)' }} />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 ml-1" style={{ color: '#0B1A2A' }} fill="currentColor" />
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold mb-2">{clip.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {clip.duration}
                      </span>
                      <span>{clip.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Predicted Engagement</div>
                      <div className="text-2xl font-bold" style={{ color: '#d4af37' }}>{clip.engagement}</div>
                    </div>
                    <ViralScoreChart score={clip.score} />
                  </div>

                  <button className="w-full px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #6A6FFF 0%, #8B5CF6 100%)' }}>
                    <Download className="w-5 h-5" />
                    Download Clip
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <footer className="border-t px-8 py-10" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-400">
          <span>More from us:</span>
          <a href="https://usefella.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Fella — iPhone app blocker</a>
          <a href="https://leadline.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Leadline — Reddit lead generation</a>
          <a href="https://rankpad.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Rankpad — AI visibility tracking</a>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: '@keyframes drawLine { to { stroke-dashoffset: 0; } } @keyframes fadeIn { to { opacity: 1; } } @keyframes slideInRight { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } } @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } } .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }'}} />
    </div>
  );
}
