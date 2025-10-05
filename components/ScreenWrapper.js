import { Dimensions, Platform, StatusBar, Text, View, StyleSheet } from "react-native";
import { colors } from '../theme/colors'

const { height } = Dimensions.get("window");

let paddingTop = Platform.OS === 'ios' ? height * 0.07 : 50;

export default function ScreenWrapper({ style, children }) {
  return (
    <View style={[styles.wrapper, style]}>
      <StatusBar barStyle="light-content" />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: paddingTop,
    backgroundColor: colors.black,
  },
});
