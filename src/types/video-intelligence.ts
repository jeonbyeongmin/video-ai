// Google Cloud Video Intelligence API 응답 타입 정의

export interface VideoAnalysisResponse {
  annotationResults: AnnotationResult[];
}

export interface AnnotationResult {
  inputUri?: string;
  segment?: VideoSegment;
  labelAnnotations?: LabelAnnotation[];
  faceAnnotations?: FaceAnnotation[];
  textAnnotations?: TextAnnotation[];
  objectAnnotations?: ObjectTrackingAnnotation[];
  explicitAnnotation?: ExplicitContentAnnotation;
  speechTranscriptions?: SpeechTranscription[];
}

export interface VideoSegment {
  startTimeOffset?: string;
  endTimeOffset?: string;
}

export interface LabelAnnotation {
  entity?: Entity;
  categoryEntities?: Entity[];
  segments?: LabelSegment[];
  frames?: LabelFrame[];
}

export interface Entity {
  entityId?: string;
  description?: string;
  languageCode?: string;
}

export interface LabelSegment {
  segment?: VideoSegment;
  confidence?: number;
}

export interface LabelFrame {
  timeOffset?: string;
  confidence?: number;
}

export interface FaceAnnotation {
  thumbnail?: string;
  segments?: FaceSegment[];
  frames?: FaceFrame[];
}

export interface FaceSegment {
  segment?: VideoSegment;
}

export interface FaceFrame {
  normalizedBoundingBoxes?: NormalizedBoundingBox[];
  timeOffset?: string;
}

export interface NormalizedBoundingBox {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
}

export interface TextAnnotation {
  text?: string;
  segments?: TextSegment[];
}

export interface TextSegment {
  segment?: VideoSegment;
  confidence?: number;
  frames?: TextFrame[];
}

export interface TextFrame {
  rotatedBoundingBox?: NormalizedVertex[];
  timeOffset?: string;
}

export interface NormalizedVertex {
  x?: number;
  y?: number;
}

export interface ObjectTrackingAnnotation {
  entity?: Entity;
  confidence?: number;
  frames?: ObjectTrackingFrame[];
  segment?: VideoSegment;
  trackId?: string;
}

export interface ObjectTrackingFrame {
  normalizedBoundingBox?: NormalizedBoundingBox;
  timeOffset?: string;
}

export interface ExplicitContentAnnotation {
  frames?: ExplicitContentFrame[];
}

export interface ExplicitContentFrame {
  timeOffset?: string;
  pornographyLikelihood?: Likelihood;
}

export interface SpeechTranscription {
  alternatives?: SpeechRecognitionAlternative[];
  languageCode?: string;
}

export interface SpeechRecognitionAlternative {
  transcript?: string;
  confidence?: number;
  words?: WordInfo[];
}

export interface WordInfo {
  startTime?: string;
  endTime?: string;
  word?: string;
  confidence?: number;
  speakerTag?: number;
}

export enum Likelihood {
  LIKELIHOOD_UNSPECIFIED = "LIKELIHOOD_UNSPECIFIED",
  VERY_UNLIKELY = "VERY_UNLIKELY",
  UNLIKELY = "UNLIKELY",
  POSSIBLE = "POSSIBLE",
  LIKELY = "LIKELY",
  VERY_LIKELY = "VERY_LIKELY",
}

// 컴포넌트 Props 타입
export interface VideoUploadProps {
  onAnalysisStart: () => void;
  onAnalysisComplete: (result: VideoAnalysisResponse) => void;
  isAnalyzing: boolean;
}

export interface AnalysisResultsProps {
  result: VideoAnalysisResponse | null;
  isAnalyzing: boolean;
}
