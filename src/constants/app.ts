import {Platform} from "react-native";

export const LINKS = {
  app: Platform.select({
    ios: 'https://apps.apple.com/ua/app/XXX',
    android: 'https://play.google.com/store/apps/details?id=XXX'
  })
}