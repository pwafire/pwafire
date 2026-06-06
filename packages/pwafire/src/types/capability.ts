export type CapabilityReason =
  | "no-api"
  | "insecure-context"
  | "no-user-activation";

export type Capability = {
  supported: boolean;
  reason?: CapabilityReason;
  secureContext: boolean;
  requiresUserActivation: boolean;
};
