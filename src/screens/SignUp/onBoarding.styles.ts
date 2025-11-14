import {StyleSheet} from "react-native";
import {COLORS} from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imageWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: COLORS.red,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  safeArea: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: COLORS.black,
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  progressBar: {
    width: 25,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.grey20,
    marginHorizontal: 5,
  },
  activeBar: {
    backgroundColor: COLORS.red,
  },
  continueButton: {
    backgroundColor: COLORS.red,
    borderRadius: 10,
    paddingVertical: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
});