/**
 * Kebab-case discriminator added to every pwafire API result in v6.5+.
 *
 * Existing `{ ok, message }` fields are unchanged — `code` and `cause`
 * are additive, opt-in, and let consumers branch on failure modes
 * without string-matching `message`.
 */
export type ErrorCode =
  | "unsupported"
  | "insecure-context"
  | "permission-denied"
  | "permission-dismissed"
  | "gesture-required"
  | "cancelled"
  | "invalid-argument"
  | "runtime-error";

/**
 * The v6.5 additive return contract. Every existing field stays; `code`
 * and `cause` are new.
 *
 * Consumers can keep using `r.ok` and `r.message` — the new fields are
 * opt-in for typed branching and richer diagnostics.
 *
 * @since 6.5.0
 */
export type ResultMeta<C extends ErrorCode = ErrorCode> = {
  ok: boolean;
  message: string;
  /** Present on every result from v6.5 onward. */
  code?: C;
  /** Original error preserved in catch blocks for debugging. */
  cause?: unknown;
};
