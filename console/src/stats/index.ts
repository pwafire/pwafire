import type { Stats } from "../types";

export const stats: Stats = { run: 0, success: 0, failed: 0 };

export const updateStats = (): void => {
  const testCount = document.getElementById("test-count");
  const testsRun = document.getElementById("tests-run");
  const testsSuccess = document.getElementById("tests-success");
  const testsFailed = document.getElementById("tests-failed");

  if (testCount) testCount.textContent = String(stats.run);
  if (testsRun) testsRun.textContent = String(stats.run);
  if (testsSuccess) testsSuccess.textContent = String(stats.success);
  if (testsFailed) testsFailed.textContent = String(stats.failed);
};
