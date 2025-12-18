import {COLORS} from '../constants/colors';
import {Contact} from "expo-contacts";
import {ContactPayload} from "../types";

export const getInputWrapperStyles = (value?: string) => ({
  borderColor: value ? COLORS.black : COLORS.stroke2,
});

export const camelToTitle = (s: string) =>
  s.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase());

export const kebabToTitle = (str: string | undefined) => {
  if (!str) return;
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const getVideoThumbnail = (videoUrl: string, width = 600): string => {
  if (!videoUrl) return '';

  let thumbnailUrl = videoUrl.replace(/\.(mp4|mov|avi|webm)$/i, '.jpg');
  const params = `w_${width},f_auto,q_auto`;

  thumbnailUrl = thumbnailUrl.replace('/upload/', `/upload/${params}/`);

  return thumbnailUrl;
};

export const getOptimizedVideoUrl = (
  url: string | null,
  preset: 'low' | 'medium' = 'low'
) => {
  if (!url) return '';
  if (!url.includes('cloudinary.com')) return url;

  // w_350: width 350px
  // c_scale: scale
  // q_auto:eco: economic quality
  // f_auto: auto format
  // ac_none: remove audio
  // br_500k: limit bitrate

  let transformations = '';
  switch (preset) {
    case 'low':
      transformations = 'c_scale,w_350,f_auto,q_auto:eco,ac_none,br_500k';
      break;
    case 'medium':
      transformations = 'c_scale,w_720,f_auto,q_auto:good,br_2m,fl_progressive:steep';
      break;
  }

  return url.replace('/upload/', `/upload/${transformations}/`);
};

export const prepareContactsForSync = (contactsRaw: Contact[]): ContactPayload[] => {
  return contactsRaw.flatMap(contact =>
    contact.phoneNumbers?.flatMap(ph => {
      const phone = ph.digits || ph.number;
      if (!phone) return [];

      return [{
        phone,
        countryCode: ph.countryCode?.toUpperCase(),
      }];
    }) ?? []
  );
}