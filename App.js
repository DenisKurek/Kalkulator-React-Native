import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import CalcButton from "./CalcButton";
import * as ScreenOrientation from "expo-screen-orientation";
var evaluator = require("math-expression-evaluator");

export default function App() {
  const [value, setValue] = useState(15);
  //const [former, setFormer] = useState();
  const [sign, setSign] = useState();
  const [isLandscape, setOrientation] = useState(false);
  const onPress = () => setValue((value) => value + 1);
  const addDigit = (x) => {
    if (value == 0) {
      setValue("");
    }
    console.log(value);
    setValue((value) => `${value}${x}`);
  };

  const addSign = (x) => {
    setValue((value) => `${value} ${x} `);
  };

  const rows = [
    [
      {
        backgroundColor: "#383838",
        title: "sqrt(x)",
        onlyLandscape: true,
        onPress: () => {
          setValue((value) => `root(${value})`);
        },
      },
      {
        backgroundColor: "#383838",
        title: "x!",
        onlyLandscape: true,
        onPress: () => {
          setValue((value) => `${value}!`);
        },
      },
      {
        backgroundColor: "#383838",
        title: "AC",
        onlyLandscape: false,
        onPress: () => {
          setValue(0);
        },
      },
      {
        backgroundColor: "#383838",
        title: "(",
        onlyLandscape: false,
        onPress: () => {
          setValue((value) => `${value}(`);
        },
      },
      {
        backgroundColor: "#383838",
        title: ")",
        onlyLandscape: false,
        onPress: () => {
          setValue((value) => `${value})`);
        },
      },
      {
        backgroundColor: "orange",
        title: "/",
        onlyLandscape: false,
        onPress: () => {
          addSign("/");
        },
      },
    ],
    [
      {
        backgroundColor: "#383838",
        title: "e^x",
        onlyLandscape: true,
        onPress: () => {
          setValue((value) => `pow(e,${value})`);
        },
      },
      {
        backgroundColor: "#383838",
        title: "10^x",
        onlyLandscape: true,
        onPress: () => {
          setValue((value) => `pow(10,${value})`);
        },
      },
      {
        backgroundColor: "grey",
        title: "7",
        onlyLandscape: false,
        onPress: () => {
          addDigit("7");
        },
      },
      {
        backgroundColor: "grey",
        title: "8",
        onlyLandscape: false,
        onPress: () => {
          addDigit("8");
        },
      },
      {
        backgroundColor: "grey",
        title: "9",
        onlyLandscape: false,
        onPress: () => {
          addDigit("9");
        },
      },
      {
        backgroundColor: "orange",
        title: "X",
        onlyLandscape: false,
        onPress: () => {
          addSign("*");
        },
      },
    ],
    [
      {
        backgroundColor: "#383838",
        title: "ln",
        onlyLandscape: true,
        onPress: () => {
          setValue((value) => `ln(${value})`);
        },
      },
      {
        backgroundColor: "#383838",
        title: "log 10",
        onlyLandscape: true,
        onPress: () => {
          setValue((value) => `log(${value})`);
        },
      },
      {
        backgroundColor: "grey",
        title: "4",
        onlyLandscape: false,
        onPress: () => {
          addDigit("4");
        },
      },
      {
        backgroundColor: "grey",
        title: "5",
        onlyLandscape: false,
        onPress: () => {
          addDigit("5");
        },
      },
      {
        backgroundColor: "grey",
        title: "6",
        onlyLandscape: false,
        onPress: () => {
          addDigit("6");
        },
      },
      {
        backgroundColor: "orange",
        title: "-",
        onlyLandscape: false,
        onPress: () => {
          addSign("-");
        },
      },
    ],
    [
      {
        backgroundColor: "#383838",
        title: "e",
        onlyLandscape: true,
        onPress: () => {
          addDigit("e");
        },
      },
      {
        backgroundColor: "#383838",
        title: "x ^ 2",
        onlyLandscape: true,
        onPress: () => {
          setValue((value) => `${value}^2`);
        },
      },
      {
        backgroundColor: "grey",
        title: "1",
        onlyLandscape: false,
        onPress: () => {
          addDigit("1");
        },
      },
      {
        backgroundColor: "grey",
        title: "2",
        onlyLandscape: false,
        onPress: () => {
          addDigit("2");
        },
      },
      {
        backgroundColor: "grey",
        title: "3",
        onlyLandscape: false,
        onPress: () => {
          addDigit("3");
        },
      },
      {
        backgroundColor: "orange",
        title: "+",
        onlyLandscape: false,
        onPress: () => {
          addSign("+");
        },
      },
    ],
    [
      {
        backgroundColor: "#383838",
        title: "pi",
        onlyLandscape: true,
        onPress: () => {
          addDigit("pi");
        },
      },
      {
        backgroundColor: "#383838",
        title: "x ^ 3",
        onlyLandscape: true,
        onPress: () => {
          setValue((value) => `${value}^3`);
        },
      },
      {
        backgroundColor: "grey",
        title: "0",
        onlyLandscape: false,
        onPress: () => {
          addDigit("0");
        },
      },
      {
        backgroundColor: "grey",
        title: " ",
        onlyLandscape: false,
        onPress: () => {
          null;
        },
      },
      {
        backgroundColor: "grey",
        title: ",",
        onlyLandscape: false,
        onPress: () => {
          if (!String(value).includes(".")) {
            setValue((value) => value + ".");
          }
        },
      },
      {
        backgroundColor: "orange",
        title: "=",
        onlyLandscape: false,
        onPress: () => {
          setValue((value) => `${evaluator.eval(value)}`);
        },
      },
    ],
  ];

  function render() {
    return (
      <View style={styles.container}>
        <View style={styles.displayRow}>
          <Text style={styles.display}>{value}</Text>
        </View>
        <View style={styles.container}>
          {rows.map((row, j) => {
            return (
              <View style={styles.row} key={j}>
                {row.map((button, i) => {
                  if (button.onlyLandscape == false || isLandscape) {
                    return (
                      <CalcButton
                        key={j * 6 + i}
                        style={{ backgroundColor: button.backgroundColor }}
                        value={button.title}
                        onPress={button.onPress}
                      />
                    );
                  } else if (i > 2) {
                    return (
                      <CalcButton
                        key={j * 6 + i}
                        style={{ backgroundColor: "#383838" }}
                        value={" "}
                        onPress={null}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  Dimensions.addEventListener("change", () => {
    const dim = Dimensions.get("screen");
    setOrientation(dim.height < dim.width);
    render();
  });

  return render();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
  },
  display: {
    paddingTop: 20,
    textAlign: "right",
    alignItems: "center",
    width: "100%",
    fontSize: 40,
    color: "white",
  },
  displayRow: {
    flexDirection: "row",
    backgroundColor: "black",
  },
  row: {
    height: "20%",
    flexDirection: "row",
    backgroundColor: "green",
  },
});
