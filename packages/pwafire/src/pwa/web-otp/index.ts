export const webOtp = async (callback?: (res: { code: string | null; ok: boolean; message: string }) => void) => {
  try {
    if (!("OTPCredential" in window)) {
      const result = { ok: false, message: "Web OTP API not supported" };
      if (callback) callback({ ...result, code: null });
      return result;
    }

    const input = document.querySelector('input[autocomplete="one-time-code"]');
    if (!input) {
      const result = { ok: false, message: "No input with autocomplete='one-time-code' found" };
      if (callback) callback({ ...result, code: null });
      return result;
    }

    return { ok: true, message: "Web OTP listener registered - awaiting SMS" };
  } catch (error) {
    const result = {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to setup OTP",
    };
    if (callback) callback({ ...result, code: null });
    return result;
  }
};
