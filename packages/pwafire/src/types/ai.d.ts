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
