import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { CURRENT_VERSION } from "../constant";

import styles from "./home.module.scss";

import { IconButton } from "./button";
import SettingsIcon from "../icons/settings.svg";
import QQIcon from "../icons/qq.svg";
import AivesaIcon from "../icons/aivesa.svg";
import NoticeIcon from "../icons/notice.svg";
import UserIcon from "../icons/user.svg";
import CartIcon from "../icons/cart-outline.svg";
import AddIcon from "../icons/add.svg";
import ClearIcon from "../icons/clear.svg";
import MaskIcon from "../icons/mask.svg";
import PluginIcon from "../icons/plugin.svg";
import DragIcon from "../icons/drag.svg";
import SearchIcon from "../icons/search.svg";


import Locale from "../locales";

import { Modal } from "./ui-lib";


import { useAppConfig, useAuthStore, useChatStore } from "../store";
import { useWebsiteConfigStore, useNoticeConfigStore } from "../store";

import {
  DEFAULT_SIDEBAR_WIDTH,
  MAX_SIDEBAR_WIDTH,
  MIN_SIDEBAR_WIDTH,
  NARROW_SIDEBAR_WIDTH,
  Path,
  REPO_URL,
} from "../constant";

import { Link, useNavigate } from "react-router-dom";
import { isIOS, useMobileScreen } from "../utils";
import dynamic from "next/dynamic";
import { showConfirm, showToast } from "./ui-lib";
import { SearchBar, SearchInputRef } from "@/app/components/search-bar";

const ChatList = dynamic(async () => (await import("./chat-list")).ChatList, {
  loading: () => null,
});

function useHotKey() {
  const chatStore = useChatStore();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey) {
        if (e.key === "ArrowUp") {
          chatStore.nextSession(-1);
        } else if (e.key === "ArrowDown") {
          chatStore.nextSession(1);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });
}

function useDragSideBar() {
  const limit = (x: number) => Math.min(MAX_SIDEBAR_WIDTH, x);

  const config = useAppConfig();
  const startX = useRef(0);
  const startDragWidth = useRef(config.sidebarWidth ?? DEFAULT_SIDEBAR_WIDTH);
  const lastUpdateTime = useRef(Date.now());

  const toggleSideBar = () => {
    config.update((config) => {
      if (config.sidebarWidth < MIN_SIDEBAR_WIDTH) {
        config.sidebarWidth = DEFAULT_SIDEBAR_WIDTH;
      } else {
        config.sidebarWidth = NARROW_SIDEBAR_WIDTH;
      }
    });
  };

  const onDragStart = (e: MouseEvent) => {
    // Remembers the initial width each time the mouse is pressed
    startX.current = e.clientX;
    startDragWidth.current = config.sidebarWidth;
    const dragStartTime = Date.now();

    const handleDragMove = (e: MouseEvent) => {
      if (Date.now() < lastUpdateTime.current + 20) {
        return;
      }
      lastUpdateTime.current = Date.now();
      const d = e.clientX - startX.current;
      const nextWidth = limit(startDragWidth.current + d);
      config.update((config) => {
        if (nextWidth < MIN_SIDEBAR_WIDTH) {
          config.sidebarWidth = NARROW_SIDEBAR_WIDTH;
        } else {
          config.sidebarWidth = nextWidth;
        }
      });
    };

    const handleDragEnd = () => {
      // In useRef the data is non-responsive, so `config.sidebarWidth` can't get the dynamic sidebarWidth
      window.removeEventListener("pointermove", handleDragMove);
      window.removeEventListener("pointerup", handleDragEnd);

      // if user click the drag icon, should toggle the sidebar
      const shouldFireClick = Date.now() - dragStartTime < 300;
      if (shouldFireClick) {
        toggleSideBar();
      }
    };

    window.addEventListener("pointermove", handleDragMove);
    window.addEventListener("pointerup", handleDragEnd);
  };
  const expandSidebar = () => {
    config.update((config) => (config.sidebarWidth = MAX_SIDEBAR_WIDTH));
  };
  const isMobileScreen = useMobileScreen();
  const shouldNarrow =
    !isMobileScreen && config.sidebarWidth < MIN_SIDEBAR_WIDTH;

  useEffect(() => {
    const barWidth = shouldNarrow
      ? NARROW_SIDEBAR_WIDTH
      : limit(config.sidebarWidth ?? DEFAULT_SIDEBAR_WIDTH);
    const sideBarWidth = isMobileScreen ? "100vw" : `${barWidth}px`;
    document.documentElement.style.setProperty("--sidebar-width", sideBarWidth);
  }, [config.sidebarWidth, isMobileScreen, shouldNarrow]);

  return {
    onDragStart,
    shouldNarrow,
    expandSidebar,
  };
}

export const NoticeModelBody = React.memo(
  (props: { title: string; content: string }) => {
    return (
      <div>
        <div
          style={{
            textAlign: "center",
            fontSize: "20px",
            lineHeight: "40px",
            marginBottom: "10px",
          }}
          dangerouslySetInnerHTML={{ __html: props.title || "" }}
        ></div>
        <div
          dangerouslySetInnerHTML={{
            __html: props.content || "",
          }}
        ></div>
      </div>
    );
  },
);
NoticeModelBody.displayName = "NoticeModelBody";

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
export function NoticeModel(props: {
  title: string;
  content: string;
  noticeNotShowToday: Date | null;
  onClose: (notShowToday: boolean) => void;
}) {
  const init =
    props.noticeNotShowToday === null
      ? false
      : sameDate(props.noticeNotShowToday, new Date());
  const [notShowToday, setNotShowToday] = useState(init);

  return (
    <div className="modal-mask">
      <Modal
        title={Locale.Sidebar.Title}
        onClose={() => props.onClose(notShowToday)}
        actions={[
          <IconButton
            key="reset"
            bordered
            text={Locale.Sidebar.Close}
            onClick={() => {
              props.onClose(notShowToday);
            }}
          />,
        ]}
        footer={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "20px",
              fontSize: "12px",
            }}
          >
            <input
              type="checkbox"
              checked={notShowToday}
              onChange={() => setNotShowToday(!notShowToday)}
            />
            今日不再弹出
          </div>
        }
      >
        <NoticeModelBody title={props.title} content={props.content} />
      </Modal>
    </div>
  );
}

export function SideBar(props: {
  className?: string;
  noticeShow: boolean;
  noticeTitle: string;
  noticeContent: string;
  noticeNotShowToday: Date | null;
  showNotice: () => void;
  setNoticeShow: (show: boolean, notShowToday: boolean) => void;
}) {
  const chatStore = useChatStore();

  // drag side bar
  const { onDragStart, shouldNarrow, expandSidebar } = useDragSideBar();
  const navigate = useNavigate();
  const config = useAppConfig();
  const isMobileScreen = useMobileScreen();
  const isIOSMobile = useMemo(
    () => isIOS() && isMobileScreen,
    [isMobileScreen],
  );

  // search bar
  const searchBarRef = useRef<SearchInputRef>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (shouldNarrow) stopSearch();
  }, [shouldNarrow]);

  const stopSearch = () => {
    setIsSearching(false);
    searchBarRef.current?.clearInput();
  };


  useHotKey();

  const websiteConfigStore = useWebsiteConfigStore();
  const noticeConfigStore = useNoticeConfigStore();
  const version = CURRENT_VERSION;

  return (
    <div
      className={`${styles.sidebar} ${props.className} ${shouldNarrow && styles["narrow-sidebar"]
        }`}
      style={{
        // #3016 disable transition on ios mobile screen
        transition: isMobileScreen && isIOSMobile ? "none" : undefined,
      }}
    >
      <div className={styles["sidebar-header"]} data-tauri-drag-region>
        <div className={styles["title-container"]}>
          <div className={styles["title-version-container"]}>
            <div className={styles["sidebar-title"]} data-tauri-drag-region>Aivesa Pro</div>
            {(isMobileScreen || (!shouldNarrow && config.sidebarWidth > 260)) && <div className={styles["version-pill"]}>{version}</div>}
          </div>
          <div className={styles["sidebar-sub-title"]}>
            Chat with your own AI assistant.
          </div>
        </div>
        <div className={styles["sidebar-logo"] + " no-dark"}>
          <AivesaIcon />
        </div>
      </div>

      <div className={styles["sidebar-header-bar"]}>
        <IconButton
          icon={<MaskIcon />}
          text={shouldNarrow ? undefined : Locale.Mask.Name}
          className={styles["sidebar-bar-button"]}
          onClick={() => {
            if (config.dontShowMaskSplashScreen !== true) {
              navigate(Path.NewChat, { state: { fromHome: true } });
            } else {
              navigate(Path.Masks, { state: { fromHome: true } });
            }
          }}
          shadow
        />
        <IconButton
          icon={<PluginIcon />}
          text={shouldNarrow ? undefined : Locale.Plugin.Name}
          className={styles["sidebar-bar-button"]}
          onClick={() => window.open('https://rptzik3toh.feishu.cn/docx/M34yd0CoSoGHQExQ0f5cgKcCnHb', '_blank')}
          shadow
        />
        {shouldNarrow && (
          <IconButton
            icon={<SearchIcon />}
            className={styles["sidebar-bar-button"]}
            onClick={() => {
              expandSidebar();
              // use setTimeout to avoid the input element not ready
              setTimeout(() => {
                searchBarRef.current?.inputElement?.focus();
              }, 0);
            }}
            shadow
          />
        )}
      </div>

      <div
        className={
          styles["sidebar-search-bar"] +
          " " +
          (isSearching ? styles["sidebar-search-bar-isSearching"] : "")
        }
      >
        {!shouldNarrow && (
          <SearchBar ref={searchBarRef} setIsSearching={setIsSearching} />
        )}
      </div>

      {!isSearching && (
        <div
          className={styles["sidebar-body"]}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              navigate(Path.Home);
            }
          }}
        >
          <ChatList narrow={shouldNarrow} />
        </div>
      )}


      <div className={styles["sidebar-tail"]}>
        <div className={styles["sidebar-actions"]}>
          <div className={styles["sidebar-action"] + " " + styles.mobile}>
            <IconButton
              icon={<ClearIcon />}
              onClick={async () => {
                if (await showConfirm(Locale.Home.DeleteChat)) {
                  chatStore.deleteSession(chatStore.currentSessionIndex);
                }
              }}
            />
          </div>
          <div className={styles["sidebar-action"]}>
            <Link to={Path.Settings}>
              <IconButton icon={<SettingsIcon />} shadow />
            </Link>
          </div>
          {shouldNarrow ? null : (
            <div className={styles["sidebar-action"]}>
              <Link to={Path.Profile}>
                <IconButton icon={<UserIcon />} shadow />
              </Link>
            </div>
          )}
          {shouldNarrow || isMobileScreen ? null : (
            <div className={styles["sidebar-action"]}>
              <Link to={Path.Pricing}>
                <IconButton icon={<CartIcon />} shadow />
              </Link>
            </div>
          )}
          {
            (props.noticeTitle || props.noticeContent) && !shouldNarrow && config.sidebarWidth >= 300 ? (
              <div className={styles["sidebar-action"]}>
                <IconButton
                  icon={<NoticeIcon />}
                  onClick={() => {
                    props.showNotice();
                  }}
                  shadow
                />
              </div>
            ) : (
              <></>
            )
          }
        </div>
        <div>
          <IconButton
            icon={<AddIcon />}
            text={(shouldNarrow || (config.sidebarWidth < 250 && !isMobileScreen)) ? undefined : Locale.Home.NewChat}
            onClick={() => {
              if (config.dontShowMaskSplashScreen) {
                chatStore.newSession();
                navigate(Path.Chat);
              } else {
                navigate(Path.NewChat);
              }
              stopSearch();
            }}
            shadow
          />
        </div>
      </div>

      <div
        className={styles["sidebar-drag"]}
        onPointerDown={(e) => onDragStart(e as any)}
      >
        <DragIcon />
      </div>
      {props.noticeShow && (
        <NoticeModel
          title={props.noticeTitle}
          content={props.noticeContent}
          noticeNotShowToday={props.noticeNotShowToday}
          onClose={(notShowToday: boolean) =>
            props.setNoticeShow(false, notShowToday)
          }
        />
      )}
    </div>
  );
}
