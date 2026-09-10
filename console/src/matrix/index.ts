export const initMatrixEffect = (): (() => void) => {
  const canvas = document.getElementById("matrix");
  if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
    return () => {};
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return () => {};
  }

  const chars = "01";
  const fontSize = 10;
  const frameInterval = 35;

  let animationFrameId: number | null = null;
  let lastTimestamp = 0;
  let drops: number[] = [];

  const updateDimensions = (): void => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const newColumnCount = Math.floor(canvas.width / fontSize);

    if (drops.length < newColumnCount) {
      const addedDrops = Array(newColumnCount - drops.length).fill(1);
      drops = [...drops, ...addedDrops];
    } else if (drops.length > newColumnCount) {
      drops = drops.slice(0, newColumnCount);
    }
  };

  updateDimensions();

  const drawMatrix = (): void => {
    ctx.fillStyle = "rgba(10, 14, 39, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff41";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  };

  const reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const shouldAnimate = (): boolean => {
    return !reducedMotionQuery.matches && document.visibilityState === "visible";
  };

  const loop = (timestamp: number): void => {
    if (!shouldAnimate()) {
      stopAnimation();
      return;
    }

    if (timestamp - lastTimestamp >= frameInterval) {
      lastTimestamp = timestamp;
      drawMatrix();
    }

    animationFrameId = requestAnimationFrame(loop);
  };

  const startAnimation = (): void => {
    if (animationFrameId !== null || !shouldAnimate()) return;
    lastTimestamp = performance.now();
    animationFrameId = requestAnimationFrame(loop);
  };

  const stopAnimation = (): void => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };

  const handleVisibilityChange = (): void => {
    if (document.visibilityState === "visible") {
      startAnimation();
    } else {
      stopAnimation();
    }
  };

  const handleReducedMotionChange = (event: MediaQueryListEvent): void => {
    if (event.matches) {
      stopAnimation();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
      startAnimation();
    }
  };

  let resizeTimeout: number | null = null;
  const handleResize = (): void => {
    if (resizeTimeout !== null) {
      window.clearTimeout(resizeTimeout);
    }
    resizeTimeout = window.setTimeout(() => {
      updateDimensions();
      resizeTimeout = null;
    }, 100);
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("resize", handleResize);

  if (typeof reducedMotionQuery.addEventListener === "function") {
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
  } else {
    reducedMotionQuery.addListener(handleReducedMotionChange);
  }

  if (shouldAnimate()) {
    startAnimation();
  }

  return () => {
    stopAnimation();
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("resize", handleResize);
    if (typeof reducedMotionQuery.removeEventListener === "function") {
      reducedMotionQuery.removeEventListener(
        "change",
        handleReducedMotionChange
      );
    } else {
      reducedMotionQuery.removeListener(handleReducedMotionChange);
    }
    if (resizeTimeout !== null) {
      window.clearTimeout(resizeTimeout);
    }
  };
};
