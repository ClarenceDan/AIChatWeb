import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";

const tw: PartialLocaleType = {
  WIP: "該功能仍在開發中……",
  Error: {
    Unauthorized: "目前您的狀態是未登入，點擊此處👉 **[登入使用](/login)** ，新用戶請點擊此處👉 **[注冊後免費體驗](/register)**",
    Login: "成功登入！請重新發送訊息~",
},
  Sidebar: {
    Title: "通知",
    Close: "關閉",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} 則對話`,
  },
  Chat: {
    SubTitle: (count: number) => `您已經與 Aivesa 進行了 ${count} 則對話`,
    Actions: {
      ChatList: "檢視訊息列表",
      CompressedHistory: "檢視壓縮後的歷史 Prompt",
      Export: "匯出聊天紀錄",
      Copy: "複製",
      Stop: "停止",
      Retry: "重試",
      Delete: "刪除",
    },
    Rename: "重新命名對話",
    Typing: "正在輸入…",
SensitiveWordsTip: (question: string) =>
      `您的提問中包含敏感詞：${question}`,
    BalanceNotEnough: "您的額度不足，點擊此處👉 [獲取額度](/pricing) ",
    Input: (submitKey: string) => {
      var inputHints = `輸入訊息後，按下 ${submitKey} 鍵即可傳送`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += "，Shift + Enter 鍵換行";
      }
      return inputHints;
    },
    Send: "傳送",
    Config: {
      Reset: "重設",
      SaveAs: "另存新檔",
    },
    IsContext: "预設提示詞",
  },
  Export: {
    Title: "將聊天記錄匯出為 Markdown",
    Copy: "複製全部",
    Download: "下載檔案",
    MessageFromYou: "來自您的訊息",
    MessageFromAivesa: "來自 Aivesa 的訊息",
  },
  Memory: {
    Title: "上下文記憶 Prompt",
    EmptyContent: "尚未記憶",
    Copy: "複製全部",
    Send: "傳送記憶",
    Reset: "重設對話",
    ResetConfirm: "重設後將清除目前對話記錄以及歷史記憶，確認重設？",
  },
  Home: {
    NewChat: "新的對話",
    DeleteChat: "確定要刪除選取的對話嗎？",
    DeleteToast: "已刪除對話",
    Revert: "撤銷",
NoNotice: "暫無公告",
  },
  LoginPage: {
    Title: "登錄",
    SubTitle: "登入後與 Aivesa 對話吧！",
    Username: {
      Title: "用戶名",
      SubTitle: "",
      Placeholder: "請輸入用戶名",
    },
    Password: {
      Title: "密碼",
      SubTitle: "",
      Placeholder: "請輸入密碼",
    },
    Actions: {
      Close: "關閉",
      Login: "登錄",
      Logout: "退出登錄",
    },
    Toast: {
      Success: "登錄成功",
      Logining: "登錄中……",
    },
    GoToRegister: "前往註冊",
  },
  RegisterPage: {
    Title: "註冊",
    SubTitle: "註冊後有免費額度送喔",
    Name: {
      Title: "昵稱",
      SubTitle: "",
      Placeholder: "請輸入昵稱，可不填",
    },
    Email: {
      Title: "郵箱",
      SubTitle: "",
      Placeholder: "請輸入郵箱",
    },
    EmailCode: {
      Title: "驗證碼",
      SubTitle: "系統將向您郵箱發送的驗證碼",
      Placeholder: "請輸入驗證碼",
    },
    Username: {
      Title: "用戶名",
      SubTitle: "",
      Placeholder: "請輸入用戶名",
    },
    Password: {
      Title: "密碼",
      SubTitle: "",
      Placeholder: "請輸入密碼",
    },
    ConfirmedPassword: {
      Title: "確認密碼",
      SubTitle: "",
      Placeholder: "請再次輸入密碼",
    },
    Actions: {
      Close: "關閉",
    },
    Toast: {
      Success: "註冊成功，正在前往聊天……",
      Registering: "註冊中……",
      Failed: "註冊失敗！",
      FailedWithReason: "註冊失敗！原因：",
      PasswordNotTheSame: "兩次輸入的密碼不一致！",
      PasswordEmpty: "密碼不能為空！",
      SendEmailCode: "發送驗證碼",
      EmailCodeSending: "驗證碼發送中",
      EmailCodeSent: "驗證碼已發送，請查看郵箱",
      EmailIsEmpty: "請輸入郵箱",
      EmailCodeSentFrequently: "驗證碼發送過於頻繁，請稍後再試",
      EmailFormatError: "郵箱格式不正確",
      EmailCodeEmpty: "請輸入郵箱驗證碼",
      EmailExistsError: "該郵箱已註冊",
    },
    GoToLogin: "前往登錄",
    Captcha: "",
    CaptchaTitle: "點擊刷新驗證碼",
    CaptchaIsEmpty: "請輸入圖形驗證碼",
    CaptchaLengthError: "圖形驗證碼長度不正確",
    CaptchaInput: {
      Title: "圖形驗證碼",
      SubTitle: "",
      Placeholder: "請輸入圖中的驗證碼",
    },
  },
  Profile: {
    Title: "我的資料",
    SubTitle: "我的資料",
    Username: "賬號",
    Tokens: {
      Title: "Tokens",
      SubTitle: "剩余tokens數量",
    },
    ChatCount: {
      Title: "對話次數",
      SubTitle: "剩余詢問次數（GPT3.5等）",
    },
    AdvanceChatCount: {
      Title: "對話次數（GPT4）",
      SubTitle: "聊天詢問次數（GPT4）",
    },
    DrawCount: {
      Title: "繪圖次數",
      SubTitle: "剩余繪圖次數",
    },
    Actions: {
      Close: "關閉",
      Pricing: "購買套餐",
      GoToBalanceList: "更多",
      ConsultAdministrator: "有問題請找客服小姐姐喔！",
    },
    BalanceItem: {
      Title: "套餐類型",
      SubTitle: "",
      CalcTypes: {
        Total: "總額",
        Daily: "每天",
        Hourly: "每小時",
        ThreeHourly: "每3小時",
      },
    },
    ExpireList: {
      Title: "過期時間",
      SubTitle: "",
    },
  },
  PricingPage: {
    Title: "充值",
    SubTitle: "幫 Aivesa 充個電吧！",
    Actions: {
      Close: "關閉",
      Buy: " 購 買 ",
    },
    NoPackage: "暫無可用套餐",
    ConsultAdministrator: "有問題請找客服小姐姐喔！",
  },
  Settings: {
    Title: "設定",
    SubTitle: "設定選項",

    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "所有語言",
    },
    Avatar: "大頭貼",
    FontSize: {
      Title: "字型大小",
      SubTitle: "聊天內容的字型大小",
    },
    InjectSystemPrompts: {
      Title: "匯入系統提示",
      SubTitle: "強制在每個請求的訊息列表開頭新增一個模擬 Aivesa 的系統提示",
    },
    Update: {
      Version: (x: string) => `目前版本：${x}`,
      IsLatest: "已是最新版本",
      CheckUpdate: "檢查更新",
      IsChecking: "正在檢查更新...",
      FoundUpdate: (x: string) => `發現新版本：${x}`,
      GoToUpdate: "前往更新",
    },
    SendKey: "傳送鍵",
    Theme: "主題",
    TightBorder: "緊湊邊框",
    SendPreviewBubble: {
      Title: "預覽氣泡",
      SubTitle: "在預覽氣泡中預覽 Markdown 內容",
    },
    Mask: {
      Splash: {
        Title: "面具啟動頁面",
        SubTitle: "新增聊天時，呈現面具啟動頁面",
      },
    },
    Prompt: {
      Disable: {
        Title: "停用提示詞自動補齊",
        SubTitle: "在輸入框開頭輸入 / 即可觸發自動補齊",
      },
      List: "自定義提示詞列表",
      ListCount: (builtin: number, custom: number) =>
        `內建 ${builtin} 條，使用者定義 ${custom} 條`,
      Edit: "編輯",
      Modal: {
        Title: "提示詞列表",
        Add: "新增一條",
        Search: "搜尋提示詞",
      },
      EditModal: {
        Title: "編輯提示詞",
      },
    },
    HistoryCount: {
      Title: "附帶歷史訊息數",
      SubTitle: "每次請求附帶的歷史訊息數",
    },
    CompressThreshold: {
      Title: "歷史訊息長度壓縮閾值",
      SubTitle: "當未壓縮的歷史訊息超過該值時，將進行壓縮",
    },
    Token: {
      Title: "API Key",
      SubTitle: "使用自己的 Key 可規避授權存取限制",
      Placeholder: "sk-xxxxx",
    },
    Usage: {
      Title: "帳戶餘額",
      SubTitle(used: any, total: any) {
        return `本月已使用 $${used}，訂閱總額 $${total}`;
      },
      IsChecking: "正在檢查…",
      Check: "重新檢查",
      NoAccess: "輸入 API Key 檢視餘額",
    },
    ChatHistory: {
      Title: "聊天紀錄",
      SubTitle: "清空，匯入/匯出聊天紀錄（JSON 檔案）",
      Clear: "清空",
      ClearConfirm: "確認刪除所有聊天紀錄？",
      Import: "匯入",
      ImportConfirm: "確認匯入並覆蓋現有的聊天記錄嗎？",
      ImportToast: "聊天紀錄匯入成功！",
      Export: "匯出",
    },
    AccessCode: {
      Title: "授權碼",
      SubTitle: "目前是未授權存取狀態",
      Placeholder: "請輸入授權碼",
    },
    Model: "模型 (model)",
    Temperature: {
      Title: "隨機性 (temperature)",
      SubTitle: "值越大，回應越隨機",
    },
    MaxTokens: {
      Title: "單次回應限制 (max_tokens)",
      SubTitle: "單次互動所用的最大 Token 數",
    },
    PresencePenalty: {
      Title: "話題新穎度 (presence_penalty)",
      SubTitle: "值越大，越有可能拓展到新話題",
    },
    FrequencyPenalty: {
      Title: "頻率懲罰度 (frequency_penalty)",
      SubTitle: "值越大，越有可能降低重複字詞",
    },
  },
  Store: {
    DefaultTopic: "新的對話",
    BotHello: "請問需要我的協助嗎？",
    Error: "出錯了，請稍後再嘗試",
    Prompt: {
      History: (content: string) =>
        "這是 AI 與使用者的歷史聊天總結，作為前情提要：" + content,
      Topic:
        "Use the language used by the user (e.g. en for english conversation, zh-hant for chinese conversation, etc.) to generate a title (at most 6 words) summarizing our conversation without any lead-in, quotation marks, preamble like 'Title:', direct text copies, single-word replies, quotation marks, translations, or brackets. Remove enclosing quotation marks. The title should make third-party grasp the essence of the conversation in first sight.",
      Summarize:
        "Use the language used by the user (e.g. en-us for english conversation, zh-hant for chinese conversation, etc.) to summarise the conversation in at most 200 words. The summary will be used as prompt for you to continue the conversation in the future.",
    },
  },
  Copy: {
    Success: "已複製到剪貼簿中",
    Failed: "複製失敗，請賦予剪貼簿權限",
  },
  Context: {
    Toast: (x: any) => `已設定 ${x} 條前置上下文`,
    Edit: "前置上下文和歷史記憶",
    Add: "新增一條",
  },
  Plugin: { Name: "關於" },
  Search: {
    Name: "檢索",
  },
  FineTuned: { Sysmessage: "你是一個助手" },
  PrivacyPage: {
    Name: "隱私",
    Confirm: "同意並繼續",
  },
  Mask: {
    Name: "面具",
    Page: {
      Title: "預設角色面具",
      SubTitle: (count: number) => `${count} 個預設角色定義`,
      Search: "搜尋角色面具",
      Create: "新增",
    },
    Item: {
      Info: (count: number) => `包含 ${count} 條預設對話`,
      Chat: "對話",
      View: "檢視",
      Edit: "編輯",
      Delete: "刪除",
      DeleteConfirm: "確認刪除？",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `編輯預設面具 ${readonly ? "（只讀）" : ""}`,
      Download: "下載預設",
      Clone: "複製預設",
    },
    Config: {
      Avatar: "角色頭像",
      Name: "角色名稱",
    },
  },
  NewChat: {
    Return: "返回",
    Skip: "跳過",
    Title: "挑選一個面具",
    SubTitle: "現在開始，與面具背後的靈魂思維碰撞",
    More: "搜尋更多",
    NotShow: "不再呈現",
    ConfirmNoShow: "確認停用？停用後可以隨時在設定中重新啟用。",
  },
  UI: {
    Confirm: "確認",
    Cancel: "取消",
    Close: "關閉",
    Create: "新增",
    Edit: "編輯",
  },
  Exporter: {
    Model: "模型",
    Messages: "訊息",
    Topic: "主題",
    Time: "時間",
  },
};

export default tw;
