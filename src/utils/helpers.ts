import {COLORS} from "../constants/colors";

export const getInputWrapperStyles = (value: string) => ({
  borderColor: value ? COLORS.black : COLORS.stroke2
})