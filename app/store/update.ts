import { FETCH_COMMIT_URL, FETCH_TAG_URL, StoreKey } from "../constant";
import { createPersistStore } from "../utils/store";

type VersionType = "date" | "tag";

export const useUpdateStore = createPersistStore(
  {
    versionType: "tag" as VersionType,
    lastUpdate: 0,
    version: "unknown",
    remoteVersion: "",
    used: 0,
    subscription: 0,

    lastUpdateUsage: 0,
  },
  (set, get) => ({
    async getLatestVersion(force = false) {
      // Version checking functionality is disabled.
      return;
    },

    async updateUsage(force = false) {
      // Usage checking functionality is disabled.
      return;
    },
  }),
  {
    name: StoreKey.Update,
    version: 1,
  },
);
