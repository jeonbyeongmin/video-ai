"use client";

import { AnalysisResultsProps } from "@/types/video-intelligence";

export default function AnalysisResults({
  result,
  isAnalyzing,
}: AnalysisResultsProps) {
  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-600">분석 중입니다...</p>
        <p className="text-sm text-gray-500">
          Google Cloud Video Intelligence API가 비디오를 분석하고 있습니다.
        </p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <svg
          className="w-16 h-16 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <p className="text-lg">분석 결과가 여기에 표시됩니다</p>
        <p className="text-sm mt-2">비디오를 업로드하고 분석을 시작해주세요</p>
      </div>
    );
  }

  const annotationResult = result.annotationResults?.[0];

  return (
    <div className="space-y-6 max-h-96 overflow-y-auto">
      {/* 라벨 분석 결과 */}
      {annotationResult?.labelAnnotations &&
        annotationResult.labelAnnotations.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              감지된 라벨
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {annotationResult.labelAnnotations
                .slice(0, 8)
                .map((label, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-white rounded-md px-3 py-2"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {label.entity?.description || "알 수 없음"}
                    </span>
                    {label.segments?.[0]?.confidence && (
                      <span className="text-xs text-gray-500">
                        {Math.round(label.segments[0].confidence * 100)}%
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

      {/* 텍스트 감지 결과 */}
      {annotationResult?.textAnnotations &&
        annotationResult.textAnnotations.length > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
              감지된 텍스트
            </h3>
            <div className="space-y-2">
              {annotationResult.textAnnotations.slice(0, 5).map((text, idx) => (
                <div key={idx} className="bg-white rounded-md p-3">
                  <p className="text-sm text-gray-700">{text.text}</p>
                  {text.segments?.[0]?.confidence && (
                    <span className="text-xs text-gray-500 mt-1 block">
                      신뢰도: {Math.round(text.segments[0].confidence * 100)}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      {/* 객체 추적 결과 */}
      {annotationResult?.objectAnnotations &&
        annotationResult.objectAnnotations.length > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              추적된 객체
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {annotationResult.objectAnnotations
                .slice(0, 6)
                .map((obj, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-white rounded-md px-3 py-2"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {obj.entity?.description || "알 수 없음"}
                    </span>
                    {obj.confidence && (
                      <span className="text-xs text-gray-500">
                        {Math.round(obj.confidence * 100)}%
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

      {/* 얼굴 감지 결과 */}
      {annotationResult?.faceAnnotations &&
        annotationResult.faceAnnotations.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-yellow-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>
              감지된 얼굴
            </h3>
            <p className="text-sm text-gray-600 bg-white rounded-md p-3">
              {annotationResult.faceAnnotations.length}개의 얼굴이
              감지되었습니다.
            </p>
          </div>
        )}

      {/* 음성 전사 결과 */}
      {annotationResult?.speechTranscriptions &&
        annotationResult.speechTranscriptions.length > 0 && (
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-cyan-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                  clipRule="evenodd"
                />
              </svg>
              음성 전사
            </h3>
            <div className="space-y-2">
              {annotationResult.speechTranscriptions
                .slice(0, 3)
                .map((speech, idx) => (
                  <div key={idx} className="bg-white rounded-md p-3">
                    <p className="text-sm text-gray-700">
                      {speech.alternatives?.[0]?.transcript || "전사 결과 없음"}
                    </p>
                    {speech.alternatives?.[0]?.confidence && (
                      <span className="text-xs text-gray-500 mt-1 block">
                        신뢰도:{" "}
                        {Math.round(speech.alternatives[0].confidence * 100)}%
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

      {/* 결과가 없는 경우 */}
      {!annotationResult?.labelAnnotations?.length &&
        !annotationResult?.textAnnotations?.length &&
        !annotationResult?.objectAnnotations?.length &&
        !annotationResult?.faceAnnotations?.length &&
        !annotationResult?.speechTranscriptions?.length && (
          <div className="text-center py-8">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
              />
            </svg>
            <p className="text-gray-500">분석 결과를 찾을 수 없습니다.</p>
          </div>
        )}
    </div>
  );
}
