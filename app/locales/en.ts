import { getClientConfig } from "../config/client";
import { SubmitKey } from "../store/config";
import { LocaleType } from "./index";

// if you are adding a new translation, please use PartialLocaleType instead of LocaleType

const isApp = !!getClientConfig()?.isApp;
const en: LocaleType = {
  WIP: "Coming Soon...",
  Error: {
    Unauthorized:
      "Login session expired. Click here👉 **[Log in](/login)** . For new users, click here👉 **[Register For a Free Trial](/register)**",
    Login: "You are already logged in. Please click the 'Retry' button below.",
  },
  Auth: {
    Title: "Access Code Required",
    Tips: "Please enter the access code below",
    SubTips: "Or enter your OpenAI API Key",
    Input: "Access Code",
    Confirm: "Confirm",
    Later: "Later",
  },
  Sidebar: {
    Title: "Anouncement",
    Close: "Close",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} messages`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} messages`,
    EditMessage: {
      Title: "Edit All Messages",
      Topic: {
        Title: "Topic",
        SubTitle: "Change the current topic",
      },
    },
    Actions: {
      ChatList: "Go To Chat List",
      CompressedHistory: "Compressed History Memory Prompt",
      Export: "Export All Messages as Markdown",
      Copy: "Copy",
      Stop: "Stop",
      Retry: "Retry",
      Pin: "Pin",
      PinToastContent: "Pinned 1 messages to contextual prompts",
      PinToastAction: "View",
      Delete: "Delete",
      Edit: "Edit",
    },
    Commands: {
      new: "Start a new chat",
      newm: "Start a new chat with mask",
      next: "Next Chat",
      prev: "Previous Chat",
      clear: "Clear Context",
      del: "Delete Chat",
    },
    InputActions: {
      Stop: "Stop",
      ToBottom: "To Latest",
      Theme: {
        auto: "Auto",
        light: "Light Theme",
        dark: "Dark Theme",
      },
      Prompt: "Prompts",
      Masks: "Masks",
      Clear: "Clear Context",
      Settings: "Settings",
      Internet: "Access Internet",
    },
    TooFrequently: "Sending too much, try again later.",
    Rename: "Rename Chat",
    Typing: "Typing…",
    SensitiveWordsTip: (question: string) =>
      `Your message seems to violate our policy：${question}`,
    BalanceNotEnough: "Your quota are insufficent, click here 👉 **[Recharge Now](/pricing)** ",
    Input: (submitKey: string, action: string, append?: boolean) => {
      var inputHints = `${submitKey} to ${action}`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", Shift + Enter to wrap";
      }
      return (
        inputHints + (append ? ", / to search prompts, : to use commands" : "")
      );
    },
    Send: "Send",
    Draw: "Draw",
    Config: {
      Reset: "Reset to Default",
      SaveAs: "Save as Mask",
    },
    IsContext: "System Prompt",
  },
  Midjourney: {
    Uploading: "Uploading",
    SelectImgMax: (max: number) => `Select up to ${max} images`,
    InputDisabled: "Input is disabled in this mode",
    NotSupports: "not supports",
    HasImgTip:
      "Tip: In the mask mode, only the first image will be used. In the blend mode, the five selected images will be used in order (click the image to remove it)",
    ModeImagineUseImg: "Mask Mode",
    ModeBlend: "Blend Mode",
    ModeDescribe: "Describe Mode",
    NeedInputUseImgPrompt:
      "You need to enter content to use the image in the mask mode, please input the content",
    ImagineMaxImg: (max: number) =>
      `up to ${max} iamges are required in the Mask mode`,
    BlendMinImg: (min: number, max: number) =>
      `At least ${min} images are required in the mixed image mode, and up to ${max} images are required`,
    DescribeMaxImg: (max: number) =>
      `up to ${max} iamges are required in the describe mode`,
    TaskErrUnknownType: "Task submission failed: unknown task type",
    TaskErrNotSupportType: (type: string) =>
      `Task submission failed: unsupported task type -> ${type}`,
    StatusCode: (code: number) => `Status code: ${code}`,
    TaskSubmitErr: (err: string) => `Task submission failed: ${err}`,
    RespBody: (body: string) => `Response body: ${body}`,
    None: "None",
    UnknownError: "Unknown error",
    UnknownReason: "Unknown reason",
    TaskPrefix: (prompt: string, taskId: string) =>
      `**Prompt:** ${prompt}\n**Task ID:** ${taskId}\n`,
    PleaseWait: "Please wait a moment",
    TaskSubmitOk: "Task submitted successfully",
    TaskStatusFetchFail: "Failed to get task status",
    TaskStatus: "Task status",
    TaskRemoteSubmit: "Task has been submitted to Midjourney server",
    TaskProgressTip: (progress: number | undefined) =>
      `Drawing${progress ? `, current progress: ${progress}%` : ""}`,
    TaskNotStart: "Task has not started",
    Refresh: "Refresh",
    Url: "URL",
    SettingProxyCoverTip:
      "The MidjourneyProxy address defined here will override the MIDJOURNEY_PROXY_URL in the environment variables",
    ImageAgent: "Image Agent",
    ImageAgentOpenTip:
      "After turning it on, the returned Midjourney image will be proxied by this program itself, so this program needs to be in a network environment that can access cdn.discordapp.com to be effective",
  },
  Export: {
    Title: "Export Messages",
    Copy: "Copy All",
    Download: "Download",
    MessageFromYou: "Message From You",
    MessageFromAivesa: "Message From Aivesa",
    Share: "Share to ShareGPT",
    Format: {
      Title: "Export Format",
      SubTitle: "Markdown or PNG Image",
    },
    IncludeContext: {
      Title: "Including Context",
      SubTitle: "Export context prompts in mask or not",
    },
    Steps: {
      Select: "Select",
      Preview: "Preview",
    },
    Image: {
      Toast: "Capturing Image...",
      Modal: "Long press or right click to save image",
    },
  },
  Select: {
    Search: "Search",
    All: "Select All",
    Latest: "Select Latest",
    Clear: "Clear",
  },
  Memory: {
    Title: "Memory Prompt",
    EmptyContent: "Nothing yet.",
    Send: "Send Memory",
    Copy: "Copy Memory",
    Reset: "Reset Session",
    ResetConfirm:
      "Resetting will clear the current conversation history and historical memory. Are you sure you want to reset?",
  },
  Home: {
    NewChat: "New Chat",
    DeleteChat: "Confirm to delete the selected conversation?",
    DeleteToast: "Chat Deleted",
    Revert: "Revert",
    NoNotice: "No Announcements",
  },
  LoginPage: {
    Title: "Login",
    SubTitle: "Login to chat with Aivesa",
    Username: {
      Title: "Username or Email",
      SubTitle: "",
      Placeholder: "Enter username or email",
    },
    Password: {
      Title: "Password",
      SubTitle: "",
      Placeholder: "Enter password",
    },
    Actions: {
      Close: "Close",
      Login: "Login",
      Logout: "Logout",
    },
    Toast: {
      Success: "Logged in successfully.",
      Logining: "Logging in...",
      EmptyUserName: "Please provide a username or email.",
      EmptyPassword: "PPassword field is empty.",
    },
    GoToRegister: "Sign Up",
    ForgetPassword: "Forgot or Reset Password",
  },
  RegisterPage: {
    Title: "Sign Up",
    SubTitle: "Receive a free quota upon registration.",
    Name: {
      Title: "Nickname",
      SubTitle: "",
      Placeholder: "Enter a nickname (optional)",
    },
    Email: {
      Title: "Email",
      SubTitle: "",
      Placeholder: "Provide your email",
    },
    EmailCode: {
      Title: "Verification Code",
      SubTitle: "A code will be sent to your email.",
      Placeholder: "请输入验证码",
    },
    Phone: {
      Title: "手机号",
      SubTitle: "",
      Placeholder: "请输入手机号",
    },
    PhoneCode: {
      Title: "验证码",
      SubTitle: "系统将向您手机号发送的短信验证码",
      Placeholder: "请输入短信验证码",
    },
    Username: {
      Title: "Username",
      SubTitle: "",
      Placeholder: "Enter username",
    },
    Password: {
      Title: "Set Password",
      SubTitle: "",
      Placeholder: "More than 6 charaters",
    },
    ConfirmedPassword: {
      Title: "Confirm password",
      SubTitle: "",
      Placeholder: "Re-enter your password",
    },
    Actions: {
      Close: "Close",
    },
    Toast: {
      Success: "注册成功，正在前往聊天……",
      Registering: "注册中……",
      Failed: "注册失败！",
      FailedWithReason: "注册失败！原因：",
      PasswordNotTheSame: "两次输入的密码不一致！",
      PasswordEmpty: "密码不能为空！",
      SendEmailCode: "发送验证码",
      EmailCodeSending: "验证码发送中",
      EmailCodeSent: "验证码已发送，请查看邮箱",
      EmailIsEmpty: "请输入邮箱",
      EmailCodeSentFrequently: "验证码发送过于频繁，请稍后再试",
      EmailFormatError: "邮箱格式不正确",
      EmailCodeEmpty: "请输入邮箱验证码",
      EmailExistsError: "该邮箱已注册",
      SendPhoneCode: "发送短信验证码",
      PhoneCodeSending: "验证码发送中",
      PhoneCodeSent: "验证码已发送，请查看短信",
      PhoneIsEmpty: "请输入手机号",
      PhoneCodeSentFrequently: "验证码发送过于频繁，请稍后再试",
      PhoneFormatError: "手机号格式不正确",
      PhoneCodeEmpty: "请输入短信验证码",
      PhoneExistsError: "该手机号已注册",
    },
    GoToLogin: "Login",
    Captcha: "",
    CaptchaTitle: "Refresh captcha",
    CaptchaIsEmpty: "Captcha is required.",
    CaptchaLengthError: "Captcha length is incorrect.",
    CaptchaInput: {
      Title: "Captcha",
      SubTitle: "",
      Placeholder: "Enter the captcha shown in the image",
    },
  },
  ForgetPasswordPage: {
    Title: "Reset Password",
    SubTitle: "",
    Toast: {
      PasswordResetting: "Working on resetting your password...",
      PasswordResetFailed: "Password reset encountered an issue.",
      PasswordResetSuccess: "Password reset successful. Redirecting to chat...",
      PasswordResetFailedWithReason: "Password reset failed due to:",
    },
    Actions: {
      Close: "Close",
    },
  },
  Profile: {
    Title: "个人中心",
    SubTitle: "个人中心",
    Username: "账号",
    Email: "邮箱",
    Phone: "手机号",
    Invitor: {
      Title: "邀请人",
    },
    InviteCode: {
      Title: "邀请码",
      TitleRequired: "邀请码(必填)",
      Placeholder: "输入邀请码获得额外权益",
    },
    Tokens: {
      Title: "Tokens",
      SubTitle: "Valid Tokens",
    },
    ChatCount: {
      Title: "Basic Queries",
      SubTitle: "Query count（GPT3.5 etc.）",
    },
    AdvanceChatCount: {
      Title: "Pro Queries（GPT4）",
      SubTitle: "Query count（GPT4）",
    },
    DrawCount: {
      Title: "Drawings",
      SubTitle: "Drawing count",
    },
    Actions: {
      Close: "Close",
      Pricing: "Store",
      Order: "Orders",
      GoToBalanceList: "More Details",
      ConsultAdministrator: "Please contact support",
      All: "All Plans",
      CreateInviteCode: "Generate",
      Copy: "Copy Link",
      Redeem: "Redeem Code",
    },
    BalanceItem: {
      Title: "Plan Type",
      SubTitle: "",
      CalcTypes: {
        Total: "Total",
        Daily: "Daily",
        Hourly: "Hourly",
        ThreeHourly: "Every 3 Hours",
      },
    },
    ExpireList: {
      Title: "Expiration Date",
      SubTitle: "",
    },
  },
  RedeemCodePage: {
    Title: "Redeem Code",
    SubTitle: "Add tokens by redeem code",
    RedeemCodeInput: {
      Title: "Redeem Code",
      Placeholder: "Please enter a valid Code",
    },
    Actions: {
      Close: "Close",
      Redeem: "Redeem Code",
    },
  },
  PricingPage: {
    Title: "Recharge",
    SubTitle: "Browse, Select, and Purchase",
    Actions: {
      Close: "Close",
      Buy: " Purchase ",
      Order: "Order",
      RedeemCode: "Redeem Code",
    },
    NoPackage: "No Available Plan",
    Loading: "Loading...",
    PleaseLogin: "Please Log In",
    ConsultAdministrator: "Please contant support",
    BuyFailedCause: "Plan purchase failed due to：",
    TOO_FREQUENCILY: "Too many requests, try again later",
    CREATE_ORDER_FAILED: "Failed to create order",
  },
  PayPage: {
    PaidSuccess: "Payment Successful",
    Actions: {
      Close: "Close",
    },
  },
  BalancePage: {
    Title: "Purchased Plan",
    NoBalance: "No Plan Purchased",
    Loading: "Loading...",
    Actions: {
      Close: "Close",
      Pricing: "Purchase Plan",
      Order: "Order",
      Profile: "Profile",
      Refresh: "Reload",
      Refreshing: "Loading...",
      RedeemCode: "Redeem Code",
    },
  },
  InvitationPage: {
    Title: "Invite Records",
    SubTitle: "View all invitation records",
    NoInvitation: "Share your invitation link to your friends.",
    Loading: "Loading...",
    Actions: {
      Close: "Close",
      Profile: "Profile",
      Refresh: "Refresh",
      Refreshing: "Loading",
    },
  },
  OrderPage: {
    Title: "Order Center",
    NoOrder: "No Order Found",
    Loading: "Loading...",
    StateError: "Status Error",
    CancelFailedForStateError: "Cancellation Failed, Please try again later",
    CancelSuccess: "Order Successfully Cancelled",
    CancelFailure: "Order Failed to Cancel",
    TryAgainLaster: "Operation failed, try again later",
    PleaseWaitForDataSync:
      "Data might be delayed, please check order status later",
    Actions: {
      Pay: "Pay",
      Cancel: "Cancel",
      Pricing: "Purchase Plan",
      Profile: "Profile",
      Copy: "Copy",
      Refresh: "Reload",
      Refreshing: "Reloading...",
    },
  },
  Settings: {
    Title: "Settings",
    SubTitle: "All Settings",
    Danger: {
      Reset: {
        Title: "Reset All Settings",
        SubTitle: "Reset all setting items to default",
        Action: "Reset",
        Confirm: "Are you sure you want to reset all settings to default?",
      },
      Clear: {
        Title: "Clear All Data",
        SubTitle: "Clear all messages and settings",
        Action: "Clear",
        Confirm: "Are you sure you want to clear all messages and settings?",
      },
    },
    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "All Languages",
    },
    Avatar: "Avatar",
    FontSize: {
      Title: "Font Size",
      SubTitle: "Adjust font size of chat content",
    },
    InjectSystemPrompts: {
      Title: "Inject System Prompts",
      SubTitle: "Inject a global system prompt for every request",
    },
    InputTemplate: {
      Title: "Input Template",
      SubTitle: "Newest message will be filled to this template",
    },

    Update: {
      Version: (x: string) => `Version: ${x}`,
      IsLatest: "Latest version",
      CheckUpdate: "Check Update",
      IsChecking: "Checking update...",
      FoundUpdate: (x: string) => `Found new version: ${x}`,
      GoToUpdate: "Update",
    },
    SendKey: "Send Key",
    Theme: "Theme",
    TightBorder: "Tight Border",
    SendPreviewBubble: {
      Title: "Send Preview Bubble",
      SubTitle: "Preview markdown in bubble",
    },
    AutoGenerateTitle: {
      Title: "Auto Generate Title",
      SubTitle: "Generate a suitable title based on the conversation content",
    },
    Sync: {
      CloudState: "Last Update",
      NotSyncYet: "Not sync yet",
      Success: "Sync Success",
      Fail: "Sync Fail",

      Config: {
        Modal: {
          Title: "Config Sync",
          Check: "Check Connection",
        },
        SyncType: {
          Title: "Sync Type",
          SubTitle: "Choose your favorite sync service",
        },
        Proxy: {
          Title: "Enable CORS Proxy",
          SubTitle: "Enable a proxy to avoid cross-origin restrictions",
        },
        ProxyUrl: {
          Title: "Proxy Endpoint",
          SubTitle:
            "Only applicable to the built-in CORS proxy for this project",
        },

        WebDav: {
          Endpoint: "WebDAV Endpoint",
          UserName: "User Name",
          Password: "Password",
        },

        UpStash: {
          Endpoint: "UpStash Redis REST Url",
          UserName: "Backup Name",
          Password: "UpStash Redis REST Token",
        },
      },

      LocalState: "Local Data",
      Overview: (overview: any) => {
        return `${overview.chat} chats，${overview.message} messages，${overview.prompt} prompts，${overview.mask} masks`;
      },
      ImportFailed: "Failed to import from file",
    },
    Mask: {
      Splash: {
        Title: "Mask Splash Screen",
        SubTitle: "Show a mask splash screen before starting new chat",
      },
      Builtin: {
        Title: "Hide Builtin Masks",
        SubTitle: "Hide builtin masks in mask list",
      },
    },
    Prompt: {
      Disable: {
        Title: "Disable auto-completion",
        SubTitle: "Input / to trigger auto-completion",
      },
      List: "Prompt List",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} built-in, ${custom} user-defined`,
      Edit: "Edit",
      Modal: {
        Title: "Prompt List",
        Add: "Add One",
        Search: "Search Prompts",
      },
      EditModal: {
        Title: "Edit Prompt",
      },
    },
    HistoryCount: {
      Title: "Attached Messages Count",
      SubTitle: "Number of sent messages attached per request",
    },
    CompressThreshold: {
      Title: "History Compression Threshold",
      SubTitle:
        "Will compress if uncompressed messages length exceeds the value",
    },
    Token: {
      Title: "API Key",
      SubTitle: "Use your key to ignore access code limit",
      Placeholder: "sk-xxxxx",
    },
    Usage: {
      Title: "Account Balance",
      SubTitle(used: any, total: any) {
        return `Used this month $${used}, subscription $${total}`;
      },
      IsChecking: "Checking...",
      Check: "Check",
      NoAccess: "Enter API Key to check balance",
    },
    ChatHistory: {
      Title: "Chat History",
      SubTitle: "Clear, import & export chat history (JSON)",
      ClearTitle:"Clear History",
      ClearSubtitle:"Only clear chat history",
      Clear: "Clear",
      ClearConfirm: "Are you sure to delete all chat history?",
      Import: "Import",
      ImportConfirm:
        "Confirm to import and overwrite the existing chat history?",
      ImportToast: "Chat history imported!",
      Export: "Export",
    },
    AccessCode: {
      Title: "Access Code",
      SubTitle: "Access control enabled",
      Placeholder: "Need Access Code",
    },
    Endpoint: {
      Title: "Endpoint",
      SubTitle: "Custom endpoint must start with http(s)://",
    },
    CustomModel: {
      Title: "Custom Models",
      SubTitle: "Add extra model options, separate by comma",
    },
    Model: "Model",
    Temperature: {
      Title: "Temperature",
      SubTitle: "A larger value makes the more random output",
    },
    TopP: {
      Title: "Top P",
      SubTitle: "Do not alter this value together with temperature",
    },
    MaxTokens: {
      Title: "Max Tokens",
      SubTitle: "Maximum length of input tokens and generated tokens",
    },
    PresencePenalty: {
      Title: "Presence Penalty",
      SubTitle:
        "A larger value increases the likelihood to talk about new topics",
    },
    FrequencyPenalty: {
      Title: "Frequency Penalty",
      SubTitle:
        "A larger value decreasing the likelihood to repeat the same line",
    },
    Version: {
      Title: "Version",
      SubTitle: "",
    },
  },
  Store: {
    DefaultTopic: "New Conversation",
    BotHello: "Hello! How can I assist you today?",
    Error: "Something went wrong, please try again later.",
    Prompt: {
      History: (content: string) =>
        "This is a summary of the chat history as a recap: " + content,
      Topic:
        "Please generate a four to five word title summarizing our conversation without any lead-in, punctuation, quotation marks, periods, symbols, or additional text. Remove enclosing quotation marks.",
      Summarize:
        "Summarize the discussion briefly in 200 words or less to use as a prompt for future context.",
    },
  },
  Copy: {
    Success: "Copied to clipboard",
    Failed: "Copy failed, please grant permission to access clipboard",
  },
  Download: {
    Success: "Content downloaded to your directory.",
    Failed: "Download failed.",
  },
  Context: {
    Toast: (x: any) => `With ${x} contextual prompts`,
    Edit: "Current Chat Settings",
    Add: "Add a Prompt",
    Clear: "Context Cleared",
    Revert: "Revert",
  },
  Shop: {
    Name: "Subscribe",
  },
  User: {
    Name: "Profile",
  },
  Plugin: {
    Name: "About",
  },
  Search: {
    Name: "Search...",
  },
  FineTuned: {
    Sysmessage: "You are an assistant that",
  },
  PrivacyPage: {
    Name: "Privacy",
    Confirm: "Agree",
  },
  Mask: {
    Name: "Mask",
    Page: {
      Title: "Prompt Template",
      SubTitle: (count: number) => `${count} prompt templates`,
      Search: "Search Templates",
      Create: "Create",
    },
    Item: {
      Info: (count: number) => `${count} prompts`,
      Chat: "Chat",
      View: "View",
      Edit: "Edit",
      Delete: "Delete",
      DeleteConfirm: "Confirm to delete?",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `Edit Prompt Template ${readonly ? "(readonly)" : ""}`,
      Download: "Download",
      Clone: "Clone",
    },
    Config: {
      Avatar: "Bot Avatar",
      Name: "Bot Name",
      Sync: {
        Title: "Use Global Config",
        SubTitle: "Use global config in this chat",
        Confirm: "Confirm to override custom config with global config?",
      },
      HideContext: {
        Title: "Hide Context Prompts",
        SubTitle: "Do not show in-context prompts in chat",
      },
      Share: {
        Title: "Share This Mask",
        SubTitle: "Generate a link to this mask",
        Action: "Copy Link",
      },
    },
  },
  NewChat: {
    Return: "Return",
    Skip: "Just Start",
    Title: "Pick a Mask",
    SubTitle: "Chat with the Soul behind the Mask",
    More: "Find More",
    NotShow: "Never Show Again",
    ConfirmNoShow: "Confirm to disable？You can enable it in settings later.",
  },

  UI: {
    Confirm: "Confirm",
    Cancel: "Cancel",
    Close: "Close",
    Create: "Create",
    Edit: "Edit",
    Export: "Export",
    Import: "Import",
    Sync: "Sync",
    Config: "Sync Config",
  },
  Exporter: {
    Model: "Model",
    Messages: "Messages",
    Topic: "Topic",
    Time: "Time",
  },

  URLCommand: {
    Code: "Detected access code from url, confirm to apply? ",
    Settings: "Detected settings from url, confirm to apply?",
  },
};

export default en;
