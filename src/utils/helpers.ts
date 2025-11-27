import { COLORS } from '../constants/colors';

export const getInputWrapperStyles = (value: string) => ({
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
