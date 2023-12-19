import styles from "./privacy.module.scss";
import { IconButton } from "./button";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Path } from "../constant";
import Locale, {
  getLang,
} from "../locales";

import ConfirmIcon from "../icons/confirm.svg";
import LoadingIcon from "../icons/three-dots.svg";
import dynamic from "next/dynamic";
import { copyToClipboard } from "../utils";

const Markdown = dynamic(async () => (await import("./markdown")).Markdown, {
  loading: () => <LoadingIcon />,
});

export function PrivacyPage(props: { onClose?: () => void }) {
  const navigate = useNavigate();
  const [mdText, setMdText] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [scrollTitle, setScrollTitle] = useState("");
  const [showTerms, setShowTerms] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const lang = getLang(); // Get the current language
      const response = await fetch("privacy.json");
      const data = await response.json();
      const privacyPolicy = data[lang][0][1];
      const termsOfService = data[lang][1][1];
      setMdText(`${privacyPolicy}`);
      setPageTitle(data[lang][0][0]);
      setScrollTitle(data[lang][0][1]);
    };

    fetchData();

    const handleScroll = () => {
      const privacyTitleElement = document.getElementById("privacy-title");
      const termsTitleElement = document.getElementById("terms-title");

      if (privacyTitleElement && termsTitleElement) {
        const privacyTitleRect = privacyTitleElement.getBoundingClientRect();
        const termsTitleRect = termsTitleElement.getBoundingClientRect();

        if (privacyTitleRect.top < 0 && termsTitleRect.top >= 1) {
          setScrollTitle("Privacy Policy");
        } else {
          setScrollTitle("Terms of Service");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goChat = () => {
    navigate(Path.Chat);
  };

  const copy = () => {
    copyToClipboard(mdText);
  };

  const handleAgree = async () => {
    const lang = getLang(); // Get the current language
    const response = await fetch("privacy.json");
    const data = await response.json();
    const privacyPolicy = data[lang][1][1];
    const termsOfService = data[lang][1][1];
    setShowTerms(false);
    setMdText(`${termsOfService}`);
    setPageTitle(data[lang][1][0]);
    setScrollTitle(data[lang][0][0]);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
  };

  return (
    <div className={styles["privacy-page"]}>
      <div className={`privacy-title ${styles["privacy-title"]}`}>
        {showTerms && (
          <div
            id="terms-title"
            className={`privacy-header-main-title ${styles["privacy-header-main-title"]} ${styles["scroll-title"]}`}
          ></div>
        )}
        <div
          id="privacy-title"
          className={`privacy-header-main-title ${styles["privacy-header-main-title"]}`}
        >
          {pageTitle}
        </div>
      </div>
      <div className={styles["privacy-content"]}>
        <div className={styles["markdown-body"]}>
          <Markdown content={mdText} />
        </div>
      </div>
      {showTerms && (
        <div className={styles["privacy-actions"]}>
          <div className="window-action-button">
            <IconButton
              text={Locale.PrivacyPage.Confirm}
              icon={<ConfirmIcon />}
              onClick={handleAgree}
              bordered
            />
          </div>
        </div>
      )}
      {!showTerms && (
        <div className={styles["privacy-actions"]}>
          <div className="window-action-button">
            <IconButton
              text={Locale.PrivacyPage.Confirm}
              icon={<ConfirmIcon />}
              onClick={goChat}
              bordered
            />
          </div>
        </div>
      )}
    </div>
  );
}
