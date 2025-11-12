import {StyleSheet} from "react-native";
import {COLORS} from "../../constants/colors";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  descriptionContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  descriptionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.black,
    marginBottom: 4,
  },
  descriptionSubtitle: {
    textAlign: "center",
    fontSize: 14,
    color: COLORS.black,
    lineHeight: 20,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    height: 48,
    marginVertical: 6,
    justifyContent: "center",
    paddingHorizontal: 14,
    borderWidth: 1
  },
  input: {
    fontSize: 15,
    color: "#000",
  },
  errorText: {
    color: 'red',
    marginTop: 5
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
  },
  resetContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 6,
  },
  resetText: {
    color: COLORS.black,
    marginRight: 4,
  },
  resetLink: {
    color: COLORS.black,
    fontWeight: "600",
  },
  termsContainer: {
    marginTop: 'auto',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  termsText: {
    textAlign: "center",
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
  },
  link: {
    color: "#000",
    textDecorationLine: "underline",
  },
  button: {
    borderRadius: 10,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    backgroundColor: COLORS.stroke1,
  },
  buttonActive: {
    backgroundColor: COLORS.red,
  },
  buttonText: {
    color: COLORS.grey30,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextActive: {
    color: COLORS.white,
  },
})
