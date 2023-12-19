"use client";

require("../polyfill");

import { useState, useEffect, useCallback } from "react";

import styles from "./home.module.scss";

import BotIcon from "../icons/bot.svg";
import LoadingIcon from "../icons/three-dots.svg";
import { Response } from "../api/common";

import { getCSSVar, useMobileScreen } from "../utils";

import dynamic from "next/dynamic";
import { Path, SlotID } from "../constant";
import { ErrorBoundary } from "./error";

import { getISOLang, getLang } from "../locales";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { SideBar } from "./sidebar";
import { useAppConfig } from "../store/config";
import { getClientConfig } from "../config/client";
import { api } from "../client/api";
import {
  useWebsiteConfigStore,
  useAuthStore,
  useAccessStore,
  BOT_HELLO,
  useWechatConfigStore,
  useNoticeConfigStore,
} from "../store";

export function Loading(props: {
  noLogo?: boolean;
}) {
  return (
    <div className={styles["loading-content"] + " no-dark"}>
      {!props.noLogo && <BotIcon />}
      <LoadingIcon />
    </div>
  );
}

const Login = dynamic(async () => (await import("./login")).Login, {
  loading: () => <Loading noLogo />,
});

const WechatCallback = dynamic(
  async () => (await import("./wechatCallback")).WechatCallback,
  {
    loading: () => <Loading noLogo />,
  },
);

const Register = dynamic(async () => (await import("./register")).Register, {
  loading: () => <Loading noLogo />,
});
const ForgetPassword = dynamic(
  async () => (await import("./forget-password")).ForgetPassword,
  {
    loading: () => <Loading noLogo />,
  },
);

const Settings = dynamic(async () => (await import("./settings")).Settings, {
  loading: () => <Loading noLogo />,
});

const Profile = dynamic(async () => (await import("./profile")).Profile, {
  loading: () => <Loading noLogo />,
});

const Pricing = dynamic(async () => (await import("./pricing")).Pricing, {
  loading: () => <Loading noLogo />,
});

const Pay = dynamic(async () => (await import("./pay")).Pay, {
  loading: () => <Loading noLogo />,
});

const RedeemCode = dynamic(
  async () => (await import("./redeem-code")).RedeemCode,
  {
    loading: () => <Loading noLogo />,
  },
);

const Balance = dynamic(async () => (await import("./balance")).Balance, {
  loading: () => <Loading noLogo />,
});

const Invitation = dynamic(
  async () => (await import("./invitation")).Invitation,
  {
    loading: () => <Loading noLogo />,
  },
);

const Order = dynamic(async () => (await import("./order")).Order, {
  loading: () => <Loading noLogo />,
});

const Chat = dynamic(async () => (await import("./chat")).Chat, {
  loading: () => <Loading noLogo />,
});

const NewChat = dynamic(async () => (await import("./new-chat")).NewChat, {
  loading: () => <Loading noLogo />,
});

const MaskPage = dynamic(async () => (await import("./mask")).MaskPage, {
  loading: () => <Loading noLogo />,
});

const PrivacyPage = dynamic(async () => (await import("./privacy")).PrivacyPage, {
  loading: () => <Loading noLogo />,
});

export interface NoticeConfig {
  show: boolean;
  splash: boolean;
  title: string;
  content: string;
}
export interface NoticeConfigData {
  noticeContent: NoticeConfig;
}


export type NoticeConfigResponse = Response<NoticeConfigData>;

export function useSwitchTheme() {
  const config = useAppConfig();
  const useWebsiteConfig = useWebsiteConfigStore();

  useEffect(() => {
    document.body.classList.remove("light");
    document.body.classList.remove("dark");

    if (config.theme === "dark") {
      document.body.classList.add("dark");
    } else if (config.theme === "light") {
      document.body.classList.add("light");
    }

    const metaDescriptionDark = document.querySelector(
      'meta[name="theme-color"][media*="dark"]',
    );
    const metaDescriptionLight = document.querySelector(
      'meta[name="theme-color"][media*="light"]',
    );

    if (config.theme === "auto") {
      metaDescriptionDark?.setAttribute("content", "#151515");
      metaDescriptionLight?.setAttribute("content", "#fafafa");
    } else {
      const themeColor = getCSSVar("--theme-color");
      metaDescriptionDark?.setAttribute("content", themeColor);
      metaDescriptionLight?.setAttribute("content", themeColor);
    }
  }, [config.theme]);
}


function useHtmlLang() {
  useEffect(() => {
    const lang = getISOLang();
    const htmlLang = document.documentElement.lang;

    if (lang !== htmlLang) {
      document.documentElement.lang = lang;
    }
  }, []);
}

const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

function sameDate(d1: Date, d2: Date) {
  if (d1.constructor.name === "String") {
    d1 = new Date(d1);
  }
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}

function Screen() {
  const config = useAppConfig();
  const location = useLocation();
  const isHome = location.pathname === Path.Home;
  const isAuth = location.pathname === Path.Auth;
  const isMobileScreen = useMobileScreen();
  const shouldTightBorder = getClientConfig()?.isApp || (config.tightBorder && !isMobileScreen);

  const { fetchWechatConfig } = useWechatConfigStore();
  useEffect(() => {
    fetchWechatConfig();
  }, [fetchWechatConfig]);

  const { botHello, icp } = useWebsiteConfigStore();
  useEffect(() => {
    if (botHello) {
      // todo i18n
      BOT_HELLO.content = botHello;
    }
  }, [botHello]);

  const [noticeShow, setNoticeShow] = useState(false);
  const noticeStore = useNoticeConfigStore();
  useEffect(() => {
    noticeStore.fetchNoticeConfig().then((res: NoticeConfigResponse) => {
      const notice = res?.data.noticeContent;
      if (notice) {
        if (notice.show && notice.splash) {
          const todayShow =
            noticeStore.notShowToday === null
              ? true
              : !sameDate(noticeStore.notShowToday, new Date());
          if (todayShow) {
            setNoticeShow(true);
          }
        }
      }
    });
  }, []);

  function setNoticeNotShowToday(notShowToday: boolean) {
    noticeStore.setNotShowToday(notShowToday);
  }

  const hideChatLogWhenNotLogin = true
  const separator =
    hideChatLogWhenNotLogin &&
    (
      [
        Path.Login,
        Path.Register,
        Path.WechatCallback,
        Path.ForgetPassword,
      ] as string[]
    ).includes(location.pathname);

  return (
      <div className={(separator ? "separator-page " : "") + "body"}>
      <div
        className={
          styles.container +
          ` ${shouldTightBorder ? styles["tight-container"] : styles.container} `
        }
      >
        <SideBar
          className={isHome ? styles["sidebar-show"] : ""}
          noticeShow={noticeShow}
          noticeTitle={noticeStore.title}
          noticeContent={noticeStore.content}
          noticeNotShowToday={noticeStore.notShowToday}
          showNotice={() => setNoticeShow(true)}
          setNoticeShow={(show: boolean, notShowToday: boolean) => {
            setNoticeShow(show);
            setNoticeNotShowToday(notShowToday);
          }}
        />

        <div className={styles["window-content"]} id={SlotID.AppBody}>
          <Routes>
            <Route path={Path.Home} element={<Chat />} />
            <Route path={Path.NewChat} element={<NewChat />} />
            <Route path={Path.Masks} element={<MaskPage />} />
            <Route path={Path.Chat} element={<Chat />} />
            <Route path={Path.Settings} element={<Settings />} />
            <Route path={Path.PrivacyPage} element={<PrivacyPage />} />
            <Route path={Path.Login} element={<Login />} />
            <Route path={Path.WechatCallback} element={<WechatCallback />} />
            <Route path={Path.Register} element={<Register />} />
            <Route path={Path.ForgetPassword} element={<ForgetPassword />} />
            <Route path={Path.Profile} element={<Profile />} />
            <Route path={Path.Pricing} element={<Pricing />} />
            <Route path={Path.RedeemCode} element={<RedeemCode />} />
            <Route path={Path.Pay} element={<Pay />} />
            <Route path={Path.Balance} element={<Balance />} />
            <Route path={Path.Invitation} element={<Invitation />} />
            <Route path={Path.Order} element={<Order />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export function useLoadData() {
  const config = useAppConfig();

  useEffect(() => {
    (async () => {
      const models = await api.llm.models();
      config.mergeModels(models);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

let runAIChatWebInitScript = false;
export function Home() {
  useSwitchTheme();
  useLoadData();
  useHtmlLang();

  const authStore = useAuthStore();
  const { fetchWebsiteConfig, globalJavaScript, availableModels } =
    useWebsiteConfigStore();

  useEffect(() => {
    fetchWebsiteConfig();
  }, [fetchWebsiteConfig]);

  useEffect(() => {
    console.log("[Config] got config from build time", getClientConfig());
    useAccessStore.getState().fetch();
  }, []);
  useEffect(() => {
    console.log("set default model", availableModels[0]);
    if (availableModels.length > 0) {
      useAppConfig.getState().modelConfig.model = availableModels[0].name;
      useAppConfig.getState().modelConfig.contentType =
        availableModels[0].contentType;
    } else {
      useAppConfig.getState().modelConfig.model = "";
      useAppConfig.getState().modelConfig.contentType = "Text";
    }
  }, [availableModels]);
  useEffect(() => {
    if (globalJavaScript) {
      if (!runAIChatWebInitScript) {
        eval(globalJavaScript);
        runAIChatWebInitScript = true;
      }
    }
  }, [globalJavaScript]);

  if (!useHasHydrated()) {
    return <Loading />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <Screen />
      </Router>
    </ErrorBoundary>
  );
}
