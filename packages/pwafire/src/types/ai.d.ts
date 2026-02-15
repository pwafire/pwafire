// AI-related types (Summarizer API)
interface AICreateMonitor extends EventTarget {
  addEventListener(type: "downloadprogress", listener: (event: ProgressEvent) => void): void;
}

interface SummarizerOptions {
  type?: "key-points" | "tldr" | "teaser" | "headline";
  format?: "plain-text" | "markdown";
  length?: "short" | "medium" | "long";
  context?: string;
  sharedContext?: string;
  monitor?: (monitor: AICreateMonitor) => void;
  expectedInputLanguages?: string[];
  outputLanguage?: string;
  expectedContextLanguages?: string[];
}

interface SummarizerSession {
  summarize(text: string, options?: { context?: string }): Promise<string>;
  summarizeStreaming(text: string, options?: { context?: string }): AsyncIterable<string>;
  destroy(): void;
}

declare const Summarizer: {
  availability(): Promise<"unavailable" | "downloadable">;
  create(options?: SummarizerOptions): Promise<SummarizerSession>;
};

// Translator API
interface TranslatorOptions {
  sourceLanguage: string;
  targetLanguage: string;
  monitor?: (monitor: AICreateMonitor) => void;
}

interface TranslatorSession {
  translate(text: string): Promise<string>;
  translateStreaming(text: string): AsyncIterable<string>;
  destroy(): void;
}

declare const Translator: {
  availability(options: { sourceLanguage: string; targetLanguage: string }): Promise<string>;
  create(options: TranslatorOptions): Promise<TranslatorSession>;
};
