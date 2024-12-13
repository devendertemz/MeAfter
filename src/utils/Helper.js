//#region import
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
  SafeAreaView,
  ImageBackground,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
//utils
import { appColors, scaleXiPhone15, appFonts } from "./AppConstants";
import { stylesCommon } from "./CommonStyle";

//#endregion

//#region genrateUniqueNameWithExtenstion
export const genrateUniqueNameWithExtenstion = (url) => {
  const varExtention = /[.]/.exec(url) ? /[^.]+$/.exec(url) : undefined;

  const date = new Date().getDate(); //To get the Current Date
  const month = new Date().getMonth() + 1; //To get the Current Month
  const year = new Date().getFullYear(); //To get the Current Year
  const hours = new Date().getHours(); //To get the Current Hours
  const min = new Date().getMinutes(); //To get the Current Minutes
  const sec = new Date().getSeconds(); //To get the Current Seconds
  const milisec = new Date().getMilliseconds(); //To get the Current Seconds

  const fileNameWithExt =
    date +
    "-" +
    month +
    "-" +
    year +
    "-" +
    hours +
    "-" +
    min +
    "-" +
    sec +
    "-" +
    milisec +
    "." +
    varExtention;

  return fileNameWithExt;
};
//#endregion

//#region DearListEmpty
export const DearListEmpty = ({ onAddDearPress }) => {
  return (
    <View
      style={{
        paddingVertical: scaleXiPhone15.fortyH,
        paddingHorizontal: scaleXiPhone15.sixteenH,
        alignItems: "center",
        gap: scaleXiPhone15.sixteenH,
        backgroundColor: appColors.appWhiteTxtInpt,
        borderRadius: scaleXiPhone15.fourH,
        ...stylesCommon.shadow,
      }}
    >
      <Text style={[stylesCommon.txtHomeLbl, { textAlign: "center" }]}>
        Start connecting with your loved ones by adding them to your Dears list.
      </Text>
      <HomeBtnComp
        title={"+ Add Dears"}
        color={appColors.appWhitePageBg}
        backgroundColor={appColors.appBlackBtn}
        onPress={onAddDearPress}
      />
    </View>
  );
};
//#endregion

//#region HomeBtnComp
export const HomeBtnComp = ({ title, color, backgroundColor }) => {
  const navigation = useNavigation();
  const onAddDearBtnPress = () => {
    navigation.navigate("AddDear");
  };
  return (
    <TouchableOpacity
      onPress={onAddDearBtnPress}
      style={[stylesHB.contHomeBtn, { backgroundColor: backgroundColor }]}
    >
      <Text style={[stylesCommon.txtHomeLbl, { color: color }]}>{title}</Text>
    </TouchableOpacity>
  );
};
const stylesHB = StyleSheet.create({
  contHomeBtn: {
    paddingHorizontal: scaleXiPhone15.sixteenH,
    paddingVertical: scaleXiPhone15.eightH,
    borderRadius: scaleXiPhone15.fourH,
  },
});
//#endregion
