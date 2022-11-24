import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function CalcButton(props) {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...props.style }}
      onPress={props.onPress}
    >
      <Text style={{ color: "white" }}>{props.value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    color: "white",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    backgroundColor: "grey",
    padding: 10,
  },
});
