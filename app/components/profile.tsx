import { useState, useEffect } from "react";

import styles from "./profile.module.scss";

import CloseIcon from "../icons/close.svg";
import { Input, List, ListItem, Modal, PasswordInput } from "./ui-lib";

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
import { showToast, Popover } from "./ui-lib";
import { Avatar, AvatarPicker } from "./emoji";
import { Balance } from "../api/users/[...path]/route";

export function Profile() {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const profileStore = useProfileStore();
  const { registerTypes } = useWebsiteConfigStore();
  const registerType = registerTypes[0];
  const REG_TYPE_USERNAME_AND_EMAIL_WITH_CAPTCHA_AND_CODE =
    "UsernameAndEmailWithCaptchaAndCode";

  const config = useAppConfig();
  const updateConfig = config.update;

  const [loading, setLoading] = useState(true);

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

  const { fetchProfile } = profileStore;
  useEffect(() => {
    setLoading(true);
    fetchProfile(authStore.token, authStore)
      .then((res) => {
        if (!res?.data || !res?.data?.id) {
          authStore.logout();
          navigate(Path.Login);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetchProfile, navigate]);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  function logout() {
    setTimeout(() => {
      authStore.logout();
      navigate(Path.Login);
    }, 500);
  }

  function createInviteCode() {
    setLoading(true);
    profileStore
      .createInviteCode(authStore)
      .then((resp) => {
        console.log("resp", resp);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // 获取当前全部套餐
  function getPrefix(balance: Balance) {
    return balance.calcType == "Total"
      ? "剩余"
      : balance.calcType == "Daily"
        ? Locale.Profile.BalanceItem.CalcTypes.Daily
        : balance.calcType == "Hourly"
          ? Locale.Profile.BalanceItem.CalcTypes.Hourly
          : balance.calcType == "ThreeHourly"
            ? Locale.Profile.BalanceItem.CalcTypes.ThreeHourly
            : "";
  }

  // 累加目前没有过期的套餐
  const totalTokens = profileStore.balances?.reduce((acc, balance) => {
    if (!balance.expired) {
      return acc + (balance.tokens === -1 ? 0 : balance.tokens);
    }
    return acc;
  }, 0) ?? 0;


  return (
    <ErrorBoundary>
      <div className="window-header" data-tauri-drag-region>
        <div className="window-header-title">
          <div className="window-header-main-title">{Locale.Profile.Title}</div>
          <div className="window-header-sub-title">
            {/* {Locale.Profile.SubTitle} */}
          </div>
        </div>
        <div className="window-actions">
          <div className="window-action-button">
            <IconButton
              icon={<CloseIcon />}
              onClick={() => navigate(Path.Home)}
              bordered
              title={Locale.Profile.Actions.Close}
            />
          </div>
        </div>
      </div>
      <div className={styles["profile"]}>
        <List>
          <ListItem title={Locale.Settings.Avatar}>
            <Popover
              onClose={() => setShowEmojiPicker(false)}
              content={
                <AvatarPicker
                  onEmojiClick={(avatar: string) => {
                    updateConfig((config) => (config.avatar = avatar));
                    setShowEmojiPicker(false);
                  }}
                />
              }
              open={showEmojiPicker}
            >
              <div
                className={styles.avatar}
                onClick={() => setShowEmojiPicker(true)}
              >
                <Avatar avatar={config.avatar} />
              </div>
            </Popover>
          </ListItem>

          <ListItem title={Locale.Profile.Username}>
            <IconButton
              text={authStore.username}
              onClick={() => {
                navigate(Path.Profile);
              }}
            />
          </ListItem>

          {authStore.phone ? (
            <ListItem title={Locale.Profile.Phone}>
              <span>{authStore.phone}</span>
            </ListItem>
          ) : (
            <></>
          )}

          {registerType == REG_TYPE_USERNAME_AND_EMAIL_WITH_CAPTCHA_AND_CODE ? (
            <ListItem title={Locale.Profile.Email}>
              <IconButton
                text={authStore.email}
                onClick={() => {
                  copyToClipboard(authStore.email,);
                }}
              />
            </ListItem>
          ) : (
            <></>
          )}
        </List>

        <List>
          {loading ||
            (profileStore.balances && profileStore.balances.length === 0) ? (
            <div
              style={{
                borderBottom: "var(--border-in-light)",
                minHeight: "40px",
                lineHeight: "40px",
                padding: "10px 20px",
                textAlign: "center",
              }}
            >
              {loading
                ? Locale.BalancePage.Loading
                : profileStore.balances && profileStore.balances.length === 0
                  ? Locale.BalancePage.NoBalance
                  : ""}
            </div>
          ) : (
            <></>
          )}



          {profileStore.balances &&
            profileStore.balances.length > 0 &&
            !profileStore.balances[0].expired ? (
            <>
              <ListItem
                title={Locale.Profile.Tokens.Title}
                subTitle={
                  getPrefix(profileStore.balances[0]) +
                  Locale.Profile.Tokens.SubTitle
                }
              >
                <span style={{ fontSize: '14px' }}>
                  {totalTokens == -1
                    ? "无限"
                    : totalTokens}
                </span>
              </ListItem>
            </>
          ) : (
            <></>
          )}
          {profileStore.balances && profileStore.balances.length > 0 ? (
            <ListItem
              title={Locale.Profile.ExpireList.Title}
              subTitle={
                profileStore.balances[0].expired
                  ? "您的套餐已经全部过期"
                  : "点击右侧查看全部套餐"
              }
            >
              <IconButton
                text={Locale.Profile.Actions.All}
                type="second"
                style={{ flexShrink: 0 }}
                onClick={() => {
                  // showToast(Locale.Profile.Actions.ConsultAdministrator);
                  navigate(Path.Balance);
                }}
              />
            </ListItem>
          ) : (
            <></>
          )}

          <ListItem
            title={Locale.Profile.Actions.Pricing}
            subTitle={Locale.PricingPage.SubTitle}
          >
            <IconButton
              type="primary"
              text={Locale.Profile.Actions.Pricing}
              onClick={() => {
                navigate(Path.Pricing);
              }}
            />
          </ListItem>

          <ListItem
            title={Locale.RedeemCodePage.Title}
            subTitle={Locale.RedeemCodePage.SubTitle}
          >
            <IconButton
              text={Locale.Profile.Actions.Redeem}
              type="second"
              onClick={() => {
                navigate(Path.RedeemCode);
              }}
            />
          </ListItem>
        </List>

        <List>
          {profileStore.invitorId ? (
            <ListItem title={Locale.Profile.Invitor.Title}>
              <IconButton
                text={profileStore.invitorId.toString()}
                onClick={() => {
                  copyToClipboard(profileStore.invitorId.toString());
                }}
              />
            </ListItem>
          ) : (
            <></>
          )}
          <ListItem title={Locale.Profile.InviteCode.Title}>
            {authStore.inviteCode ? (
              <>
                <IconButton
                  text={authStore.inviteCode}
                  type="second"
                  onClick={() => {
                    copyToClipboard(authStore.inviteCode);
                  }}
                />
                <IconButton
                  text={Locale.Profile.Actions.Copy}
                  type="second"
                  onClick={() => {
                    copyToClipboard(
                      location.origin +
                      Path.Register +
                      "?code=" +
                      authStore.inviteCode,
                    );
                  }}
                />
              </>
            ) : (
              <IconButton
                text={Locale.Profile.Actions.CreateInviteCode}
                type="second"
                disabled={loading}
                onClick={() => {
                  createInviteCode();
                }}
              />
            )}
          </ListItem>
          <ListItem
            title={Locale.InvitationPage.Title}
            subTitle={Locale.InvitationPage.SubTitle}
          >
            <IconButton
              type="second"
              text={Locale.InvitationPage.Title}
              onClick={() => navigate(Path.Invitation)}
            />
          </ListItem>
        </List>



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
              text={Locale.Profile.Actions.Order}
              block={true}
              type="second"
              onClick={() => {
                navigate(Path.Order);
              }}
            />
          </ListItem>

          <ListItem>
            <IconButton
              text={Locale.LoginPage.Actions.Logout}
              block={true}
              type="second"
              onClick={() => {
                logout();
              }}
            />
          </ListItem>
        </List>
      </div >
    </ErrorBoundary >
  );
}
