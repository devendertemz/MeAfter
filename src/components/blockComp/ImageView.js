//#region import
import React, { useState } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { stylesCommon } from "../../utils/CommonStyle";
import CustomLoader from "../baseComp/CustomLoader";
import { scaleXiPhone15, appColors, appFonts } from "../../utils/AppConstants";
//#endregion

//#region ImageView
const ImageView = ({ imgName, resizeMode = "cover", marginTop }) => {
  return (
    <Image
      style={{ marginTop: marginTop }}
      source={imgName}
      resizeMode={resizeMode}
      //backgroundColor={'red'}
    />
  );
};
//#endregion

//#region ProfilePicComp
const ProfilePicComp = ({ isLoaded, proImg, onPress }) => {
  return (
    <View style={stylesPro.container}>
      {isLoaded ? (
        <CustomLoader isSmall={false} color={appColors.appBlackBtn} />
      ) : (
        <Image
          style={stylesPro.imgPro}
          source={proImg ? { uri: proImg } : null}
          resizeMode="cover"
        />
      )}
      <Text style={stylesCommon.txtLblTitle} onPress={onPress}>
        + Upload Profile Picture
      </Text>
    </View>
  );
};
const stylesPro = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scaleXiPhone15.sixteenH,
    padding: scaleXiPhone15.sixteenH,
    //backgroundColor: 'red',
  },
  imgPro: {
    width: scaleXiPhone15.eightyH,
    height: scaleXiPhone15.eightyH,
    borderRadius: scaleXiPhone15.eightyH * 0.5,
    backgroundColor: "lightgray",
  },
});
//#endregion

export { ImageView, ProfilePicComp };
