import type { ErrorCode } from "../../types/result";

const DEFAULT_CHANNEL_NAME = "pwafire-broadcast-demo";

const channel = (
  name: string,
): {
  ok: boolean;
  message: string;
  channel: BroadcastChannel | null;
  code?: ErrorCode;
  cause?: unknown;
} => {
  try {
    if (!("BroadcastChannel" in globalThis)) {
      return {
        ok: false as const,
        code: "unsupported",
        message: "Broadcast Channel API not supported",
        channel: null,
      };
    }
    const bc = new (globalThis as typeof globalThis & { BroadcastChannel: new (name: string) => BroadcastChannel }).BroadcastChannel(name);
    return {
      ok: true as const,
      message: "Channel created",
      channel: bc,
    };
  } catch (error) {
    return {
      ok: false as const,
      code: "runtime-error",
      message: error instanceof Error ? error.message : "Failed to create channel",
      channel: null,
      cause: error,
    };
  }
};

const send = (
  channelName = DEFAULT_CHANNEL_NAME,
): {
  ok: boolean;
  message: string;
  channel?: BroadcastChannel | null;
  code?: ErrorCode;
  cause?: unknown;
} => {
  try {
    const result = channel(channelName);
    if (!result.ok || !result.channel) {
      return result;
    }
    const payload = { test: true, timestamp: Date.now(), source: "pwafire-console" };
    result.channel.postMessage(payload);
    result.channel.close();
    return {
      ok: true as const,
      message: "Message broadcast. Open this page in another tab and run Listen to receive it.",
    };
  } catch (error) {
    return {
      ok: false as const,
      code: "runtime-error",
      message: error instanceof Error ? error.message : "Failed to broadcast",
      cause: error,
    };
  }
};

const listen = (
  channelName = DEFAULT_CHANNEL_NAME,
  onMessage?: (data: unknown) => void,
): {
  ok: boolean;
  message: string;
  channel?: BroadcastChannel | null;
  code?: ErrorCode;
  cause?: unknown;
} => {
  try {
    const result = channel(channelName);
    if (!result.ok || !result.channel) {
      return result;
    }
    const bc = result.channel;
    bc.onmessage = (event: MessageEvent) => {
      onMessage?.(event.data);
    };
    return {
      ok: true as const,
      message: "Listening for messages. Send from another tab using Broadcast Send.",
      channel: bc,
    };
  } catch (error) {
    return {
      ok: false as const,
      code: "runtime-error",
      message: error instanceof Error ? error.message : "Failed to listen",
      cause: error,
    };
  }
};

export const broadcast = {
  channel,
  send,
  listen,
};
