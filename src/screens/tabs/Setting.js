//#region import
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  FlatList,
} from "react-native";
//baseComp
import BtnApp from "../../components/baseComp/BtnApp";
//blockComp
import { SettingRow } from "../../components/blockComp/CustomRow";
//utils
import { appColors, appFonts, scaleXiPhone15 } from "../../utils/AppConstants";
import TextStrings from "../../utils/TextStrings";
import { stylesCommon } from "../../utils/CommonStyle";
import { removeAccessToken, removeEmail } from "../../utils/LocalDataStorage";
//api
import GlobalValue from "../../api/GlobalVar";
//#endregion

//#region Main
export default function Setting({ navigation, route }) {
  const arrSetting = [
    {
      id: 1,
      leftIcon: "password",
      title: TextStrings.changePassword,
    },
    {
      id: 2,
      leftIcon: "privacy-policy",
      title: TextStrings.privacyPolicy,
    },
    {
      id: 3,
      leftIcon: "terms-conditions",
      title: TextStrings.termsAndConditions,
    },
    {
      id: 4,
      leftIcon: "cookie-policy",
      title: TextStrings.cookiePolicy,
    },
  ];

  //#region action
  const onRowClick = (item) => {
    if (item.id === 1) {
      navigation.navigate("ChangePassword");
    } else if (item.id === 2) {
      navigation.navigate("WebViewPage", {
        url: "https://www.google.com/",
        headerTxt: item.title,
      });
    } else if (item.id === 3) {
      navigation.navigate("WebViewPage", {
        url: "https://www.google.com/",
        headerTxt: item.title,
      });
    } else if (item.id === 4) {
      navigation.navigate("WebViewPage", {
        url: "https://www.google.com/",
        headerTxt: item.title,
      });
    }
  };
  const onLogoutClick = async () => {
    await removeAccessToken();
    await removeEmail();
    GlobalValue.accessToken = "";
    GlobalValue.emailId = "";
    navigation.navigate("Login");
  };
  //#endregion

  //#region JSX
  const ListHeader = (prop) => {
    return <Text style={styles.title}>{TextStrings.settings}</Text>;
  };
  const renderFlatListRow = ({ item }) => {
    return <SettingRow item={item} onRowClick={onRowClick} />;
  };
  const renderFlatListSep = () => {
    return <View style={{ height: scaleXiPhone15.sixteenH }} />;
  };
  //#endregion

  return (
    <SafeAreaView style={styles.safearea}>
      <FlatList
        style={{ padding: scaleXiPhone15.sixteenH }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(item, index) => index.toString()}
        data={arrSetting}
        renderItem={renderFlatListRow}
        ListHeaderComponent={<ListHeader />}
        ItemSeparatorComponent={renderFlatListSep}
      />
      <View style={styles.bottomButtonContainer}>
        <BtnApp title={TextStrings.logout} onPress={onLogoutClick} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: appColors.appWhitePageBg,
  },
  title: {
    fontSize: scaleXiPhone15.eightteenH,
    fontFamily: appFonts.bold,
    color: appColors.appBlackBtn,
    textAlign: "left",
    paddingVertical: scaleXiPhone15.sixteenH,
  },
  bottomButtonContainer: {
    height: 30,
    position: "absolute",
    bottom: scaleXiPhone15.fortyH,
    left: scaleXiPhone15.seventyH,
    right: scaleXiPhone15.seventyH,
  },
});
//#endregion
