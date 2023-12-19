export const OWNER = "ClarenceDan";
export const REPO = "Aivesa-Chat";
export const REPO_URL = `https://sourl.cn/vCDKuc`;
export const ISSUE_URL = `https://sourl.cn/vCDKuc`;
export const UPDATE_URL = `https://sourl.cn/vCDKuc`;
export const RELEASE_URL = `https://sourl.cn/vCDKuc`;
export const FETCH_COMMIT_URL = `https://sourl.cn/vCDKuc`;
export const FETCH_TAG_URL = `https://sourl.cn/vCDKuc`;
export const RUNTIME_CONFIG_DOM = "danger-runtime-config";

export const DEFAULT_CORS_HOST = "https://a01.aivesa.fun";
export const DEFAULT_API_HOST = "https://aichat-admin:8080/api/proxy";
export const CURRENT_VERSION = "v3.2.3";
export const IMAGE_HELLO = `
🎨 **欢迎使用绘图模式**

🚀 我们使用 Midjourney v5.2，提供高质量图像生成服务。
💰 成功生成将消耗 12000 tokens。

**快速指南：**
- 📝 文生图：描述想要的场景，模型将生成四张图像供您选择。
- 🎞️ 图像微调：上传一张图片，描述您的微调需求，模型将根据描述优化图像。
- 🔀 图像混合：上传2-5张图像，模型将融合图片特点，创造出全新的作品。
- 🔍 图像识别：上传一张图，模型识别后将给出英文描述。

**进阶操作：**
- 🔎 U：选择一张图，我们将为您放大细节。
- 🔄 V：基于一张图，产生四张风格相似的新图像。
- 🔍 Z：改变焦距，按倍率填充图像的边缘细节。
- 🌈 Vary：轻微或显著变化原图，激发新的灵感。
- ⬛ Pan：向指定方向扩展图像，开阔视野。

**小提示：**
- ⚠使用英文描述效果更佳，不妨用对话模型生成描述再来生成图像吧！

**一起开始创作吧！** ✨
`

export enum Path {
  Home = "/",
  Chat = "/chat",
  Login = "/login",
  PrivacyPage = "/privacy",
  WechatCallback = "/wechatCallback",
  Register = "/register",
  ForgetPassword = "/forget-password",
  Settings = "/settings",
  NewChat = "/new-chat",
  Masks = "/masks",
  Auth = "/auth",
  Profile = "/profile",
  Pricing = "/pricing",
  RedeemCode = "/redeemCode",
  Pay = "/pay",
  Balance = "/balance",
  Invitation = "/invitation",
  Order = "/order",
}

export enum ApiPath {
  Cors = "/api/cors",
}

export enum SlotID {
  AppBody = "app-body",
}

export enum FileName {
  Masks = "masks.json",
  Prompts = "prompts.json",
}

export enum StoreKey {
  Auth = "auth",
  Chat = "aivesa-chat-store",
  Access = "access-control",
  Config = "app-config",
  Mask = "mask-store",
  Prompt = "prompt-store",
  Update = "chat-update",
  Sync = "sync",
  Balance = "balance",
  Profile = "profile",
  WebsiteConfig = "websiteCofnig",
  NoticeConfig = "noticeConfig",
  WechatConfig = "wechatConfig",
}

export const DEFAULT_SIDEBAR_WIDTH = 300;
export const MAX_SIDEBAR_WIDTH = 500;
export const MIN_SIDEBAR_WIDTH = 230;
export const NARROW_SIDEBAR_WIDTH = 100;

export const ACCESS_CODE_PREFIX = "nk-";

export const LAST_INPUT_KEY = "last-input";
export const UNFINISHED_INPUT = (id: string) => "unfinished-input-" + id;

export const STORAGE_KEY = "aivesa-pro";

export const REQUEST_TIMEOUT_MS = 60000;

export const EXPORT_MESSAGE_CLASS_NAME = "export-markdown";

export const OpenaiPath = {
  ChatPath: "v1/chat/completions",
  UsagePath: "dashboard/billing/usage",
  SubsPath: "dashboard/billing/subscription",
  ListModelPath: "v1/models",
};

export const DEFAULT_INPUT_TEMPLATE = `{{input}}`; // input / time / model / lang
export const DEFAULT_SYSTEM_TEMPLATE = `
You are Aivesa, a large language model trained by OpenAI.
Knowledge cutoff: {{cutoff}}
Current model: {{model}}
Current time: {{time}}
`;

export const SUMMARIZE_MODEL = "gpt-3.5-turbo";

export const KnowledgeCutOffDate: Record<string, string> = {
  default: "2021-09",
  "gpt-4-1106-preview": "2023-04",
  "gpt-4-vision-preview": "2023-04",
};


export const DEFAULT_MODELS = [
  {
    name: "gpt-4",
    available: true,
  },
  {
    name: "gpt-4-0314",
    available: true,
  },
  {
    name: "gpt-4-0613",
    available: true,
  },
  {
    name: "gpt-4-32k",
    available: true,
  },
  {
    name: "gpt-4-32k-0314",
    available: true,
  },
  {
    name: "gpt-4-32k-0613",
    available: true,
  },
  {
    name: "gpt-3.5-turbo",
    available: true,
  },
  {
    name: "gpt-4-1106-preview",
    available: true,
  },
  {
    name: "gpt-4-vision-preview",
    available: true,
  },
  {
    name: "gpt-3.5-turbo-0301",
    available: true,
  },
  {
    name: "gpt-3.5-turbo-0613",
    available: true,
  },
  {
    name: "gpt-3.5-turbo-1106",
    available: true,
  },
  {
    name: "gpt-3.5-turbo-16k",
    available: true,
  },
  {
    name: "gpt-3.5-turbo-16k-0613",
    available: true,
  },
] as const;

export const CHAT_PAGE_SIZE = 15;
export const MAX_RENDER_MSG_COUNT = 45;
