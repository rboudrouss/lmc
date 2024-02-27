import Default from "./default.svg";
import discord from "./discord.svg";
import facebook from "./facebook.svg";
import instagram from "./instagram.svg";
import linkedin from "./linkedin.svg";
import mail from "./mail.svg";
import tiktok from "./tiktok.svg";
import twitch from "./twitch.svg";
import twitter from "./x-twitter.svg";
import youtube from "./youtube.svg";

export const miscIcons = {
  default: Default,
  discord,
  facebook,
  instagram,
  linkedin,
  mail,
  tiktok,
  twitch,
  twitter,
  youtube,
} as const;

export type miscIconsT = keyof typeof miscIcons;

// kinda useless but whatever
export function getMiscIcon(name: string) {
  return miscIcons[name] ?? miscIcons.default;
}

export default {
  ...miscIcons,
};
