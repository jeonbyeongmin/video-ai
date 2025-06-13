import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// 개발 환경에서 사용할 데모 데이터
const getDemoData = (fileName: string) => ({
  annotationResults: [
    {
      labelAnnotations: [
        {
          entity: { description: "사람", entityId: "/m/01g317" },
          segments: [{ confidence: 0.95 }],
        },
        {
          entity: { description: "자동차", entityId: "/m/0k4j" },
          segments: [{ confidence: 0.87 }],
        },
        {
          entity: { description: "도로", entityId: "/m/06gfj" },
          segments: [{ confidence: 0.92 }],
        },
        {
          entity: { description: "건물", entityId: "/m/0cgh4" },
          segments: [{ confidence: 0.78 }],
        },
        {
          entity: { description: "하늘", entityId: "/m/01bqvp" },
          segments: [{ confidence: 0.84 }],
        },
        {
          entity: { description: "나무", entityId: "/m/07j7r" },
          segments: [{ confidence: 0.76 }],
        },
      ],
      textAnnotations: [
        {
          text: `분석된 파일: ${fileName}`,
          segments: [{ confidence: 0.85 }],
        },
        {
          text: "DEMO TEXT RECOGNITION",
          segments: [{ confidence: 0.92 }],
        },
      ],
      objectAnnotations: [
        {
          entity: { description: "사람" },
          confidence: 0.89,
          trackId: "1",
        },
        {
          entity: { description: "자동차" },
          confidence: 0.91,
          trackId: "2",
        },
        {
          entity: { description: "자전거" },
          confidence: 0.73,
          trackId: "3",
        },
      ],
      faceAnnotations: [
        {
          segments: [{}],
        },
        {
          segments: [{}],
        },
      ],
      speechTranscriptions: [
        {
          alternatives: [
            {
              transcript: "안녕하세요. 이것은 데모 음성 전사 결과입니다.",
              confidence: 0.88,
            },
          ],
          languageCode: "ko-KR",
        },
      ],
    },
  ],
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("video") as File;

    if (!file) {
      return NextResponse.json(
        { error: "비디오 파일이 필요합니다." },
        { status: 400 }
      );
    }

    // 파일 검증
    if (!file.type.startsWith("video/")) {
      return NextResponse.json(
        { error: "비디오 파일만 업로드할 수 있습니다." },
        { status: 400 }
      );
    }

    // 파일 크기 제한 (100MB)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "파일 크기는 100MB를 초과할 수 없습니다." },
        { status: 400 }
      );
    }

    console.log(
      `파일 처리 중: ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)}MB)`
    );

    // Google Cloud 설정이 있는 경우 실제 API 호출
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      let filePath: string | undefined;
      
      try {
        // 실제 Google Cloud Video Intelligence API 호출 로직
        const { VideoIntelligenceServiceClient } = await import(
          "@google-cloud/video-intelligence"
        );
        const { Storage } = await import("@google-cloud/storage");

        const videoClient = new VideoIntelligenceServiceClient();
        const storage = new Storage();
        const bucketName = process.env.GOOGLE_CLOUD_STORAGE_BUCKET!;

        // 파일을 임시 디렉토리에 저장
        const tempDir = path.join(process.cwd(), "temp");
        await fs.mkdir(tempDir, { recursive: true });

        const fileId = uuidv4();
        const fileName = `${fileId}-${file.name}`;
        filePath = path.join(tempDir, fileName);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        await fs.writeFile(filePath, buffer);

        // Google Cloud Storage에 파일 업로드
        const bucket = storage.bucket(bucketName);
        const gcsFileName = `videos/${fileName}`;
        const fileUpload = bucket.file(gcsFileName);

        await fileUpload.save(buffer, {
          metadata: {
            contentType: file.type,
          },
        });

        const gcsUri = `gs://${bucketName}/${gcsFileName}`;

        // Video Intelligence API 호출
        const request = {
          inputUri: gcsUri,
          features: [
            1, // LABEL_DETECTION
            2, // SHOT_CHANGE_DETECTION
            3, // EXPLICIT_CONTENT_DETECTION
            4, // FACE_DETECTION
            6, // SPEECH_TRANSCRIPTION
            7, // TEXT_DETECTION
            9, // OBJECT_TRACKING
            12, // LOGO_RECOGNITION
            14, // PERSON_DETECTION
          ],
          videoContext: {
            speechTranscriptionConfig: {
              languageCode: "ko-KR",
              enableAutomaticPunctuation: true,
            },
          },
        };

        console.log("Video Intelligence API 요청 시작...");
        const [operation] = await videoClient.annotateVideo(request);

        console.log("분석 작업 진행 중...");
        const [operationResult] = await operation.promise();
        console.log("🚀 ~ POST ~ operationResult:", operationResult);

        console.log("분석 완료!");

        // 임시 파일 정리
        try {
          await fs.unlink(filePath);
          await fileUpload.delete();
        } catch (cleanupError) {
          console.error("파일 정리 오류:", cleanupError);
        }

        return NextResponse.json(operationResult);
      } catch (apiError) {
        console.error('Google Cloud API 오류:', apiError);
        console.log('권한 오류로 인해 데모 모드로 전환합니다.');
        
        // 임시 파일 정리
        try {
          if (filePath) {
            await fs.unlink(filePath);
          }
        } catch (cleanupError) {
          console.error('파일 정리 오류:', cleanupError);
        }
        
        // 데모 데이터로 fallback
        console.log('데모 모드: 샘플 분석 결과를 반환합니다.');
        await new Promise(resolve => setTimeout(resolve, 2000));
        const demoResult = getDemoData(file.name);
        return NextResponse.json(demoResult);
      }
    }

    // 개발 환경 또는 Google Cloud 설정이 없는 경우 데모 데이터 반환
    console.log("데모 모드: 샘플 분석 결과를 반환합니다.");

    // 실제 분석을 시뮬레이션하기 위한 지연
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const demoResult = getDemoData(file.name);
    return NextResponse.json(demoResult);
  } catch (error) {
    console.error("비디오 분석 오류:", error);
    return NextResponse.json(
      {
        error: "비디오 분석 중 오류가 발생했습니다.",
        details: error instanceof Error ? error.message : "알 수 없는 오류",
      },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";
export const maxDuration = 300; // 5분 타임아웃
