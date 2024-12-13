//#region import
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import FontIcons from "../baseComp/FontIcons";
import { scaleXiPhone15, appColors, appFonts } from "../../utils/AppConstants";
//#endregion

const TextInputField = ({
  placeholder,
  value,
  onChangeText,
  label,
  editable = true,
  keyboardType = "default",
  isMultiline = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}> {label} </Text>
      <View
        style={[
          styles.containerTxtInput,
          {
            height: isMultiline ? scaleXiPhone15.hundredH : "auto",
            opacity: editable ? 1 : 0.5,
          },
        ]}
      >
        <TextInput
          editable={editable}
          style={styles.txtinput}
          placeholder={placeholder}
          placeholderTextColor={appColors.appGrayLight}
          autoCapitalize="none"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          multiline={isMultiline}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  labelText: {
    fontFamily: appFonts.bold,
    fontSize: scaleXiPhone15.sixteenH,
    color: appColors.appBlackTitleTxt,
    paddingVertical: scaleXiPhone15.fourH,
  },
  containerTxtInput: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: scaleXiPhone15.fourH,
    paddingHorizontal: scaleXiPhone15.twelveH,
    paddingVertical: scaleXiPhone15.twelveH,
    borderWidth: scaleXiPhone15.oneH,
    borderColor: appColors.appGrayBorder,
    backgroundColor: appColors.appWhiteTxtInpt,
  },
  txtinput: {
    flex: 1,
    fontFamily: appFonts.regular,
    fontSize: scaleXiPhone15.sixteenH,
    color: appColors.appBlack,
  },
});
export default TextInputField;
