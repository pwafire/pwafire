/**
 * Reason a capability is unavailable. Set only when `supported === false`.
 *
 * - `no-api`: the API isn't present in this runtime (wrong/old browser).
 * - `insecure-context`: API exists but page isn't a secure context (HTTPS).
 * - `no-user-activation`: API exists but requires a recent user gesture.
 */
export type CapabilityReason =
  | "no-api"
  | "insecure-context"
  | "no-user-activation";

/**
 * Structured capability descriptor returned by `pwafire/capability`.
 *
 * Unlike `pwafire/check` (which returns plain booleans, retained for
 * back-compat), this shape carries diagnostic and platform metadata
 * so apps can progressively enhance and surface helpful errors.
 *
 * @since 6.5.0
 */
export type Capability = {
  supported: boolean;
  /** Why the capability is unavailable. Only set when supported === false. */
  reason?: CapabilityReason;
  /** Is the page currently in a secure context (HTTPS or localhost)? */
  secureContext: boolean;
  /** Does the API require user activation to invoke? Static metadata. */
  requiresUserActivation: boolean;
  /** First stable version per browser engine, when known. */
  since?: { chrome?: string; safari?: string; firefox?: string };
  /** Spec URL (WHATWG, W3C, WICG, etc.). */
  spec?: string;
  /** MDN reference URL. */
  mdn?: string;
};
