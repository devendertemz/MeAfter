//#region import
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OTPInputView from "@twotalltotems/react-native-otp-input";
//baseComp
import BtnApp from "../../components/baseComp/BtnApp";
//blockComp
import { ImageView } from "../../components/blockComp/ImageView";
//utils
import { stylesCommon } from "../../utils/CommonStyle";
import TextStrings from "../../utils/TextStrings";
import { scaleXiPhone15, appFonts, appColors } from "../../utils/AppConstants";
import { showMsgAlert } from "../../utils/Alert";
//api
import { PostOtpVerification, ResendVerification } from "../../api/PostRequest";
import { showAPIError } from "../../api/Config";
//assets
const meafter_logo = require("../../assets/images/meafter_logo/meafter_logo.png");
const otpVerify = require("../../assets/images/verifyOtp/otpVerify.png");
//#endregion

//#region Main
export default function VerifyCode({ navigation, route }) {
  //otpType : EmailVerification : 0 , PasswordReset : 1, DearRegistration : 2
  const { userEmail, otpType } = route.params;
  const insets = useSafeAreaInsets();

  //#region useState
  const [isLoaded, setIsloaded] = useState(false);
  const [codeValue, setCodeValue] = useState("");
  //#endregion

  //#region action
  const onSubmitClick = () => {
    PostOtpVerifyAPICall(
      codeValue,
      userEmail,
      otpType,
      navigation,
      setIsloaded
    );
  };
  const onCancelClick = () => {
    navigation.goBack();
  };
  const onResendOtpClick = () => {
    ResendVerificationAPICall(userEmail, setIsloaded);
  };
  //#endregion

  return (
    <SafeAreaView
      flex={1}
      style={{
        alignItems: "center",
        backgroundColor: appColors.appWhitePageBg,
      }}
    >
      <ImageView imgName={otpVerify} marginTop={scaleXiPhone15.twentyH} />
      <KeyboardAvoidingView
        style={[styles.bottomView, { bottom: insets.bottom }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ImageView imgName={meafter_logo} />
        <Text style={[stylesCommon.txtTitle, { textAlign: "center" }]}>
          {otpType == 1
            ? TextStrings.resetPassword
            : TextStrings.emailVerification}
        </Text>
        <Text style={styles.descTxt}>
          {TextStrings.WehavesentyoutheOTPon} {userEmail}{" "}
          {TextStrings.pleasecheckyourmail}
        </Text>
        <OTPInputView
          code={codeValue}
          style={{ width: "90%", height: scaleXiPhone15.eightyH }}
          pinCount={6}
          autoFocusOnLoad={true}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeChanged={(code) => {
            console.log(`onCodeChanged ${code}`);
            setCodeValue(code);
          }}
          onCodeFilled={(code) => {
            console.log(`onCodeFilled ${code}`);
          }}
        />
        <Text style={[styles.descTxt, { fontSize: scaleXiPhone15.fouteenH }]}>
          {TextStrings.Didntyougetthecode}{" "}
          <Text
            onPress={onResendOtpClick}
            style={[styles.descTxt, { textDecorationLine: "underline" }]}
          >
            {TextStrings.resendAgain}
          </Text>
        </Text>
        <BtnApp
          isAPICall={isLoaded}
          title={TextStrings.submit}
          onPress={onSubmitClick}
        />
        <Text style={styles.cancelTxt} onPress={onCancelClick}>
          {TextStrings.cancel}
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  bottomView: {
    alignItems: "center", // Center text in bottom view
    paddingHorizontal: scaleXiPhone15.twentyH,
    gap: scaleXiPhone15.sixteenH,
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: appColors.appWhitePageBg,
    paddingBottom: scaleXiPhone15.twentyH, // Added padding at the bottom
  },
  descTxt: {
    fontSize: scaleXiPhone15.sixteenH,
    textAlign: "center",
    fontFamily: appFonts.regular,
    color: appColors.appBlackTitleTxt,
    //backgroundColor: 'red',
  },
  underlineStyleBase: {
    height: scaleXiPhone15.fivtyH,
    width: scaleXiPhone15.fivtyH,
    borderRadius: scaleXiPhone15.sixH,
    backgroundColor: appColors.appWhiteTxtInpt,
    borderColor: appColors.appGrayBorder,
    fontSize: scaleXiPhone15.twentyH,
    fontFamily: appFonts.bold,
    color: appColors.appBlackBtn,
    textAlign: "center",
  },
  underlineStyleHighLighted: {
    borderColor: appColors.appBlackBtn,
    borderWidth: scaleXiPhone15.twoH,
  },
  cancelTxt: {
    fontFamily: appFonts.bold,
    fontSize: scaleXiPhone15.fouteenH,
    color: appColors.appBlackBtn,
  },
});
//#endregion

//#region API

async function PostOtpVerifyAPICall(
  otp,
  userEmail,
  otpType,
  navigation,
  setLoader
) {
  if (otp.trim().length == 0) {
    showMsgAlert(TextStrings.otpMsg);
    return;
  } else if (otp.trim().length !== 6) {
    showMsgAlert(TextStrings.otp6digt);
    return;
  }

  setLoader(true);

  await PostOtpVerification({
    UserName: userEmail,
    otp: otp,
    OtpType: otpType,
  })
    .then((res) => {
      setLoader(false);
      console.log(
        "\u001b[1;32mVerifyCode.js : RES verifyOTPAPICall ",
        JSON.stringify(res.data)
      );
      if (otpType === 0) {
        navigation.navigate("Login");
        showMsgAlert(TextStrings.userRegisteredSuccessfully);
      } else if (otpType === 1) {
        navigation.navigate("SetNewPassword", {
          userEmail: userEmail,
        });
        showMsgAlert(res.data);
      } else {
        // navigation.navigate("SetNewPassword", {
        //   userEmail: userEmail,
        // });
        // showMsgAlert(res.data);
      }
      //showMsgAlert(res.data);
    })
    .catch((error) => {
      setLoader(false);
      showAPIError(error, TextStrings.verifyCodeError);
    });
}
async function ResendVerificationAPICall(userEmail, setLoader) {
  setLoader(true);
  await ResendVerification({
    UserName: userEmail,
  })
    .then((res) => {
      setLoader(false);
      console.log(
        "\u001b[1;32mVerifyCode.js : RES ResendVerification ",
        JSON.stringify(res.data)
      );
      showMsgAlert(TextStrings.OtpResend);
    })
    .catch((error) => {
      setLoader(false);
      showAPIError(error, TextStrings.otpSendError);
    });
}

//#endregion
