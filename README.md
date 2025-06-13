# Google Cloud Video Intelligence 데모

Google Cloud Video Intelligence API를 활용한 Next.js 웹 애플리케이션입니다. 비디오를 업로드하고 실시간으로 분석 결과를 확인할 수 있습니다.

## 주요 기능

- 🎬 **비디오 업로드**: 드래그 앤 드롭 또는 파일 선택으로 비디오 업로드
- 🏷️ **라벨 감지**: 비디오에서 객체, 장소, 활동 등을 자동으로 감지
- 📝 **텍스트 인식**: 비디오 내의 텍스트를 추출하고 인식
- 👥 **얼굴 감지**: 비디오에서 얼굴을 감지하고 추적
- 🎯 **객체 추적**: 비디오 전반에 걸쳐 객체의 움직임을 추적
- 🎙️ **음성 전사**: 오디오를 텍스트로 변환 (한국어 지원)
- 📊 **실시간 결과**: 분석 결과를 시각적으로 표시

## 기술 스택

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Cloud Services**: Google Cloud Video Intelligence API, Google Cloud Storage
- **File Handling**: Multer

## 시작하기

### 1. 프로젝트 설치

```bash
git clone <repository-url>
cd video-ai
npm install
```

### 2. Google Cloud 설정

1. [Google Cloud Console](https://console.cloud.google.com/)에서 새 프로젝트를 생성하거나 기존 프로젝트를 선택합니다.

2. Video Intelligence API를 활성화합니다:

   ```bash
   gcloud services enable videointelligence.googleapis.com
   ```

3. 서비스 계정을 생성하고 키를 다운로드합니다:

   - IAM & Admin > Service Accounts
   - "Create Service Account" 클릭
   - 역할: Video Intelligence Admin, Storage Admin
   - JSON 키 파일 다운로드

4. Google Cloud Storage 버킷을 생성합니다:
   ```bash
   gsutil mb gs://your-bucket-name
   ```

### 3. 환경 변수 설정

`.env.local.example` 파일을 `.env.local`로 복사하고 다음 값들을 설정합니다:

```env
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/service-account-key.json
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_STORAGE_BUCKET=your-bucket-name
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인합니다.

## 프로젝트 구조

```
src/
├── app/
│   ├── api/
│   │   └── analyze-video/
│   │       └── route.ts          # Video Intelligence API 엔드포인트
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # 메인 페이지
├── components/
│   ├── VideoUpload.tsx           # 비디오 업로드 컴포넌트
│   └── AnalysisResults.tsx       # 분석 결과 표시 컴포넌트
└── types/
    └── video-intelligence.ts     # TypeScript 타입 정의
```

## 사용 방법

1. **비디오 업로드**: 메인 페이지에서 비디오 파일을 드래그하거나 클릭하여 선택합니다.
2. **분석 시작**: "비디오 분석 시작" 버튼을 클릭합니다.
3. **결과 확인**: 오른쪽 패널에서 실시간으로 분석 결과를 확인합니다.

## 지원되는 비디오 형식

- MP4
- MOV
- AVI
- FLV
- MKV
- WebM

## API 기능

이 데모는 다음 Google Cloud Video Intelligence API 기능들을 사용합니다:

- **LABEL_DETECTION**: 비디오 콘텐츠의 라벨 감지
- **TEXT_DETECTION**: 비디오 내 텍스트 감지
- **FACE_DETECTION**: 얼굴 감지
- **OBJECT_TRACKING**: 객체 추적
- **EXPLICIT_CONTENT_DETECTION**: 부적절한 콘텐츠 감지
- **SPEECH_TRANSCRIPTION**: 음성을 텍스트로 변환

## 개발 모드

개발 환경에서는 Google Cloud 설정이 없어도 데모 데이터를 사용하여 애플리케이션을 테스트할 수 있습니다.

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 참고 자료

- [Google Cloud Video Intelligence API 문서](https://cloud.google.com/video-intelligence/docs)
- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
