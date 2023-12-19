import tauriConfig from "../../src-tauri/tauri.conf.json";

export const getBuildConfig = () => {
  if (typeof process === "undefined") {
    throw Error(
      "[Server Config] you are importing a nodejs-only module outside of nodejs",
    );
  }

  const buildMode = process.env.BUILD_MODE ?? "standalone";
  const isApp = !!process.env.BUILD_APP;
  const version = "v" + tauriConfig.package.version;

  const commitInfo = (() => {
      return {
        commitDate: "unknown",
        commitHash: "unknown",
      };
  })();

  return {
    version,
    ...commitInfo,
    buildMode,
    isApp,
  };
};

export type BuildConfig = ReturnType<typeof getBuildConfig>;
