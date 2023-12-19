import EmojiPicker, {
  Emoji,
  EmojiStyle,
  Theme as EmojiTheme,
} from "emoji-picker-react";

import { ModelType, ModelContentType, useWebsiteConfigStore } from "../store";

import BotIcon from "../icons/bot.svg";
import BlackBotIcon from "../icons/bot-pro.svg"; // 颜色加深
import ImgBotIcon from "../icons/bot-img.svg"; // 颜色加深
import NextImage from "next/image";

export function getEmojiUrl(unified: string, style: EmojiStyle) {
  return `https://cdn.staticfile.org/emoji-datasource-apple/14.0.0/img/${style}/64/${unified}.png`;
}

export function AvatarPicker(props: {
  onEmojiClick: (emojiId: string) => void;
}) {
  return (
    <EmojiPicker
      lazyLoadEmojis
      theme={EmojiTheme.AUTO}
      getEmojiUrl={getEmojiUrl}
      onEmojiClick={(e) => {
        props.onEmojiClick(e.unified);
      }}
    />
  );
}

export function Avatar(props: { model?: ModelType; avatar?: string, contentType?: ModelContentType }) {
  if (props.model) {
    if (props.contentType ==="Image") {
      return (
        <div className="no-dark">
          <ImgBotIcon className="user-avatar" />
        </div>
      );
    } else if (props.model?.includes("Midj")) {
      return (
        <div className="no-dark">
          <ImgBotIcon className="user-avatar" />
        </div>
      );
    } else if (props.model?.includes("4.0")) {
      return (
        <div className="no-dark">
          <BlackBotIcon className="user-avatar" />
        </div>
      );
    } else {
      return (
        <div className="no-dark">
          <BotIcon className="user-avatar" />
        </div>
      );
    }
  }

  return (
    <div className="user-avatar">
      {props.avatar && <EmojiAvatar avatar={props.avatar} />}
    </div>
  );
}

export function EmojiAvatar(props: { avatar: string; size?: number }) {
  return (
    <Emoji
      unified={props.avatar}
      size={props.size ?? 18}
      getEmojiUrl={getEmojiUrl}
    />
  );
}
