import { useState, useEffect } from "react";

import styles from "./redeem-code.module.scss";

import CloseIcon from "../icons/close.svg";
import {
  DangerousListItem,
  Input,
  List,
  ListItem,
  Modal,
  PasswordInput,
  showToast,
  SingleInput,
} from "./ui-lib";

import { IconButton } from "./button";
import {
  useAuthStore,
  useAppConfig,
  useProfileStore,
  useWebsiteConfigStore,
} from "../store";

import { copyToClipboard } from "../utils";

import Locale from "../locales";
import { Path } from "../constant";
import { ErrorBoundary } from "./error";
import { useNavigate } from "react-router-dom";
import { Package } from "./pricing";

export interface RedeemCodeEntity {
  id: number;
  key: string;
  state: number;
  calcType?: string;
  calcTypeId: number;
  drawCount: number;
  chatCount: number;
  advancedChatCount: number;
  tokens: number;
  days: string;
  redeemTime: Date;
}

export function RedeemCode() {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const websiteConfigStore = useWebsiteConfigStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const keydownEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate(Path.Home);
      }
    };
    document.addEventListener("keydown", keydownEvent);
    return () => {
      document.removeEventListener("keydown", keydownEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [redeemCode, setRedeemCode] = useState("");
  function redeem() {
    if (!redeemCode) {
      showToast(Locale.RedeemCodePage.RedeemCodeInput.Placeholder);
      return;
    }
    const url = `/redeemCode/${redeemCode}/redeem`;
    const BASE_URL = process.env.BASE_URL;
    const mode = process.env.BUILD_MODE;
    let requestUrl = (mode === "export" ? BASE_URL : "") + "/api" + url;
    fetch(requestUrl, {
      method: "post",
      headers: {
        Authorization: "Bearer " + authStore.token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res) {
          showToast("未知错误");
          return;
        }
        if (res?.code !== 0) {
          console.error("兑换失败", res);
          if (res.code === 10411) {
            showToast("兑换失败：兑换码无效");
          } else if (res.code === 10412) {
            showToast("兑换失败：兑换码未生效");
          } else if (res.code === 10413) {
            showToast("兑换失败：兑换码已兑换");
          } else {
            showToast("兑换失败：" + res.message);
          }
          return;
        }
        console.log("兑换成功！");
        showToast("兑换成功！");
        getMyRedeemCodes();
      });
  }

  const [myRedeemCodes, setMyRedeemCodes] = useState([] as RedeemCodeEntity[]);
  function getMyRedeemCodes() {
    const url = `/redeemCode/my`;
    const BASE_URL = process.env.BASE_URL;
    const mode = process.env.BUILD_MODE;
    let requestUrl = (mode === "export" ? BASE_URL : "") + "/api" + url;
    setLoading(true);
    fetch(requestUrl, {
      method: "get",
      headers: {
        Authorization: "Bearer " + authStore.token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const codes = res.data || [];
        console.log("codes", codes);
        setMyRedeemCodes(codes);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getMyRedeemCodes();
  }, []);

  function getSubTitle(redeemCodeEntity: RedeemCodeEntity) {
    const pkg = redeemCodeEntity;
    const prefix = {
      1: "含",
      2: "每天",
      3: "每小时",
      4: "每3小时",
    }[pkg.calcTypeId];
    return (
      `<ul style="margin-top: 5px;padding-inline-start: 10px;">` +
      (pkg.tokens
        ? `<li>📝${prefix} <span style="font-size: 18px;">${pkg.tokens === -1 ? "无限" : pkg.tokens
          }</span> tokens</li>`
        : "") +
      (pkg.chatCount
        ? `<li>🚘${prefix} <span style="font-size: 18px;">${pkg.chatCount === -1 ? "无限" : pkg.chatCount
          }</span> 次基础聊天（GPT3.5）</li>`
        : "") +
      (pkg.advancedChatCount
        ? `<li>🚀${prefix} <span style="font-size: 18px;">${pkg.advancedChatCount === -1 ? "无限" : pkg.advancedChatCount
          }</span> 次高级聊天（GPT4）</li>`
        : "") +
      (pkg.drawCount
        ? `<li>🎨${prefix} <span style="font-size: 18px;">${pkg.drawCount === -1 ? "无限" : pkg.drawCount
          }</span> 次AI绘画</li>`
        : "") +
      `<li>⏱️有效期：<span style="font-size: 18px;">${pkg.days}</span> 天</li>` +
`<li>⏱️兑换时间: ${pkg.redeemTime}</li>` +
      `</ul>`
    );
  }

  return (
    <ErrorBoundary>
      <div className="window-header" data-tauri-drag-region>
        <div className="window-header-title">
          <div className="window-header-main-title">
            {websiteConfigStore.redeemCodePageTitle ||
              Locale.RedeemCodePage.Title}
          </div>
          <div className="window-header-sub-title">
            {websiteConfigStore.redeemCodePageSubTitle || ""}
          </div>
        </div>
        <div className="window-actions">
          <div className="window-action-button">
            <IconButton
              icon={<CloseIcon />}
              onClick={() => navigate(Path.Home)}
              bordered
              title={Locale.RedeemCodePage.Actions.Close}
            />
          </div>
        </div>
      </div>
      <div className={styles["redeem-code"]}>
        <div
          dangerouslySetInnerHTML={{
            __html: websiteConfigStore.redeemCodePageBanner,
          }}
        ></div>
        <List>
          <ListItem hideTitle={true} className={styles["redeem-list-item"]}>
            <SingleInput
              value={redeemCode}
              placeholder={Locale.RedeemCodePage.RedeemCodeInput.Placeholder}
              className={styles["input"]}
              onChange={(e) => {
                setRedeemCode(e.currentTarget.value);
              }}
            />
            <IconButton
              type="primary"
              className={styles["button"]}
              text={Locale.RedeemCodePage.Actions.Redeem}
              onClick={() => {
                redeem();
              }}
            />
          </ListItem>
        </List>

        <div
          dangerouslySetInnerHTML={{
            __html: websiteConfigStore.redeemCodePageTop,
          }}
        ></div>

        <List>
          {myRedeemCodes.length === 0 || loading ? (
            <div style={{ textAlign: "center", lineHeight: "100px", fontSize:"14px" }}>
              {loading ? Locale.BalancePage.Loading : "暂未兑换"}
            </div>
          ) : (
            <></>
          )}
          <>
            {myRedeemCodes.map((redeemCodeEntity) => {
              return (
                <DangerousListItem
                  key={redeemCodeEntity.key}
                  title={
                    "兑换码：" +
                    redeemCodeEntity.key.substring(0, 6) +
                    "..." +
                    redeemCodeEntity.key.substring(
                      redeemCodeEntity.key.length - 4,
                    )
                  }
                  subTitle={getSubTitle(redeemCodeEntity)}
                  titleCopy={true}
                >
                  <div style={{ minWidth: "100px", maxWidth: "200px" }}>
                    <div style={{ margin: "10px 0" }}>
                      <div
                        style={{ fontSize: "14px" }}
                      >{`兑换时间：${redeemCodeEntity.redeemTime}`}</div>
                    </div>
                  </div>
                </DangerousListItem>
              );
            })}
          </>
        </List>

        <div
          dangerouslySetInnerHTML={{
            __html: websiteConfigStore.redeemCodePageIndex,
          }}
        ></div>

        <List>
          <ListItem>
            <IconButton
              text={Locale.Profile.Actions.Pricing}
              block={true}
              type="primary"
              onClick={() => {
                navigate(Path.Pricing);
              }}
            />
          </ListItem>
          <ListItem>
            <IconButton
              text={Locale.Profile.Actions.All}
              block={true}
              type="second"
              onClick={() => {
                navigate(Path.Balance);
              }}
            />
          </ListItem>

          <ListItem>
            <IconButton
              text={Locale.Profile.Actions.Order}
              block={true}
              type="second"
              onClick={() => {
                navigate(Path.Order);
              }}
            />
          </ListItem>
        </List>

        <div
          dangerouslySetInnerHTML={{
            __html: websiteConfigStore.redeemCodePageBottom,
          }}
        ></div>
      </div>
    </ErrorBoundary>
  );
}
