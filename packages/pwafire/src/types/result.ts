export type ErrorCode =
  | "unsupported"
  | "insecure-context"
  | "permission-denied"
  | "permission-dismissed"
  | "gesture-required"
  | "cancelled"
  | "invalid-argument"
  | "runtime-error";

export type ResultMeta<C extends ErrorCode = ErrorCode> = {
  ok: boolean;
  message: string;
  code?: C;
  cause?: unknown;
};
