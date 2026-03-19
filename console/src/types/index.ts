import type * as PwafireModule from "pwafire";
import type * as CheckModule from "pwafire/check";

export type Pwafire = typeof PwafireModule;
export type Check = typeof CheckModule;
export type ApiName = keyof Pwafire;

export type LogType = "info" | "success" | "error";

export interface Stats {
  run: number;
  success: number;
  failed: number;
}

export interface SummarizerConfig {
  text: string;
  options: { type: string; format: string; length: string };
  closeModal: () => void;
}

export interface TranslatorConfig {
  text: string;
  options: { sourceLanguage: string; targetLanguage: string };
  closeModal: () => void;
}

export interface LanguageDetectorConfig {
  text: string;
  closeModal: () => void;
}

export interface ApiResult {
  ok: boolean;
  message: string;
  stream?: ReadableStream<Uint8Array>;
  file?: File;
  handle?: FileSystemFileHandle;
}

export interface ApiConfig {
  title: string;
  params?: () => unknown[] | Promise<unknown[] | null> | null;
  executeLabel?: string;
  cardHint?: string;
}
