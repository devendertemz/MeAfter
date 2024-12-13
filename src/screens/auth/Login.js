//#region import
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { height, width } = Dimensions.get("window");
//baseComp
import BtnApp from "../../components/baseComp/BtnApp";
//blockComp
import { ImageView } from "../../components/blockComp/ImageView";
import TextInputField from "../../components/blockComp/TextInputField";
import PasswordInputField from "../../components/blockComp/PasswordInputField";
//utils
import { stylesCommon } from "../../utils/CommonStyle";
import TextStrings from "../../utils/TextStrings";
import { scaleXiPhone15, appFonts, appColors } from "../../utils/AppConstants";
import { showMsgAlert } from "../../utils/Alert";
import Validation from "../../utils/Validation";
import { saveAccessToken, saveEmail } from "../../utils/LocalDataStorage";
//api
import GlobalValue from "../../api/GlobalVar";
import { PostLogin } from "../../api/PostRequest";
import { showAPIError } from "../../api/Config";
//assets
const meafter_logo = require("../../assets/images/meafter_logo/meafter_logo.png");
const login_Img = require("../../assets/images/login/login_Img.png");
//#endregion

//#region Main
export default function Login({ navigation, route }) {
  const insets = useSafeAreaInsets();

  //#region useState
  const [isLoaded, setIsloaded] = useState(false);
  const [email, setEmail] = useState("test1@yopmail.com");
  const [password, setpassword] = useState("Test@1234");
  //#endregion

  //#region action
  const onForgotPasswordClick = () => {
    navigation.navigate("ForgetPassword");
  };
  const onLoginClick = () => {
    //navigation.navigate("Purchase");
    //navigation.navigate('ProfileUpdate');
    //navigation.navigate('BtmTabs');
    LoginAPICall(email, password, navigation, setIsloaded);
  };
  const onRegisterClick = () => {
    navigation.navigate("Reg");
  };
  //#endregion

  return (
    <SafeAreaView style={styles.safearea}>
      <ImageView imgName={login_Img} marginTop={scaleXiPhone15.twentyH} />
      <ImageView imgName={meafter_logo} marginTop={scaleXiPhone15.tenH} />
      <KeyboardAvoidingView
        style={[styles.bottomView, { bottom: insets.bottom }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text
          style={[
            stylesCommon.txtTitle,
            { textAlign: "center", top: scaleXiPhone15.sixteenH },
          ]}
        >
          {TextStrings.login}
        </Text>
        <TextInputField
          label={TextStrings.email}
          placeholder={TextStrings.enterEmail}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <PasswordInputField
          label={TextStrings.password}
          placeholder={TextStrings.enterPassword}
          value={password}
          onChangeText={setpassword}
          secureTextEntry={true}
        />
        <Text onPress={onForgotPasswordClick} style={styles.textForget}>
          {TextStrings.fpassword}
        </Text>
        <BtnApp
          isAPICall={isLoaded}
          title={TextStrings.login}
          onPress={onLoginClick}
        />
        <View style={styles.registerRow}>
          <Text
            style={[styles.registertext, { color: appColors.appGrayLight }]}
          >
            {TextStrings.dontHave}{" "}
          </Text>
          <Text
            style={[styles.registertext, { color: appColors.appBlackBtnTxt }]}
            onPress={onRegisterClick}
          >
            {TextStrings.register}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    alignItems: "center",
    backgroundColor: appColors.appWhitePageBg,
  },
  bottomView: {
    alignItems: "center", // Center text in bottom view
    padding: scaleXiPhone15.sixteenH,
    gap: scaleXiPhone15.sixteenH,
    position: "absolute",
    left: 0,
    right: 0,
    paddingBottom: scaleXiPhone15.twentyH, // Added padding at the bottom
    backgroundColor: appColors.appWhitePageBg,
    //backgroundColor: 'red',
  },
  textForget: {
    width: "100%",
    fontSize: scaleXiPhone15.sixteenH,
    textAlign: "center",
    fontFamily: appFonts.regular,
    color: appColors.appBlackTitleTxt,
    //backgroundColor: 'red',
  },
  registerRow: {
    alignSelf: "center",
    flexDirection: "row",
    // backgroundColor: 'green',
  },
  registertext: {
    fontFamily: appFonts.bold,
    fontSize: scaleXiPhone15.fouteenH,
  },
});
//#endregion

//#region API
async function LoginAPICall(userEmail, password, navigation, setLoader) {
  if (userEmail.trim().length == 0) {
    showMsgAlert(TextStrings.emailMsg);
    return;
  } else if (Validation.EmailValidation.test(userEmail.trim()) === false) {
    showMsgAlert(TextStrings.emailInvalidMsg);
    return;
  } else if (password.trim().length == 0) {
    showMsgAlert(TextStrings.passwordMsg);
    return;
  } else if (Validation.PasswordValidation.test(password.trim()) === false) {
    showMsgAlert(
      TextStrings.Minimum8characters +
        TextStrings.passwordformate +
        TextStrings.alertPassAllowedSpecialChar
    );
    return;
  }

  setLoader(true);
  await PostLogin({
    UserName: userEmail,
    Password: password,
    DeviceId: "DeviceId",
  })
    .then((res) => {
      setLoader(false);
      console.log("\u001b[1;32mLS.js : RES  ", JSON.stringify(res.data));
      const { user, token, refreshToken, emailVerificationStatus } = res.data;
      /* 
      if (!user.emailVerified) {
        showMsgAlert(TextStrings.emailNotVerified);
        return;
      } */
      GlobalValue.userId = user.id;
      saveAccessTokenData(res.data.token, user.userName, navigation);
    })
    .catch((error) => {
      setLoader(false);
      showAPIError(error, TextStrings.loginError);
    });
}
async function saveAccessTokenData(acess_token, userEmail, nav) {
  GlobalValue.accessToken = acess_token;
  GlobalValue.emailId = userEmail;
  await saveAccessToken(acess_token);
  await saveEmail(userEmail);
  console.log("GlobalValue.accessToken = ", GlobalValue.accessToken);
  console.log("GlobalValue.emailId = ", GlobalValue.emailId);
  nav.navigate("ProfileUpdate");

  //showMsgAlert('Loged In sucessfully');
  //nav.navigate('ProfileUpdate');
  //nav.navigate('SettingTabBar');
  //nav.navigate('Reg');
}
//#endregion
