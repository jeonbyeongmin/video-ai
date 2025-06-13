"use client";

import { useState } from "react";
import VideoUpload from "@/components/VideoUpload";
import AnalysisResults from "@/components/AnalysisResults";
import { VideoAnalysisResponse } from "@/types/video-intelligence";

export default function Home() {
  const [analysisResult, setAnalysisResult] =
    useState<VideoAnalysisResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Google Cloud Video Intelligence 데모
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            비디오를 업로드하고 Google Cloud Video Intelligence API를 사용하여
            실시간으로 분석 결과를 확인해보세요.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              비디오 업로드 및 분석
            </h2>
            <VideoUpload
              onAnalysisStart={() => setIsAnalyzing(true)}
              onAnalysisComplete={(result) => {
                setAnalysisResult(result);
                setIsAnalyzing(false);
              }}
              isAnalyzing={isAnalyzing}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              분석 결과
            </h2>
            <AnalysisResults
              result={analysisResult}
              isAnalyzing={isAnalyzing}
            />
          </div>
        </div>

        <footer className="text-center mt-12 text-gray-500">
          <p>
            Powered by{" "}
            <a
              href="https://cloud.google.com/video-intelligence"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google Cloud Video Intelligence API
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
