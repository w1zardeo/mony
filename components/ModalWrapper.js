import { Dimensions, Platform, StatusBar, Text, View, StyleSheet } from "react-native";
import { colors} from "../theme/colors";


export default function ModalWrapper({ style, children, bg=colors.neutral500 }) {
  return (
    <View style={[styles.container, {backgroundColor: bg}, style && style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 20
  }
});
