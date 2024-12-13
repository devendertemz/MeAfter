//#region import
import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
//baseComp
import BtnApp from '../../components/baseComp/BtnApp';
//blockComp
import {ImageView} from '../../components/blockComp/ImageView';
import TextInputField from '../../components/blockComp/TextInputField';
//utils
import {stylesCommon} from '../../utils/CommonStyle';
import TextStrings from '../../utils/TextStrings';
import {scaleXiPhone15, appFonts, appColors} from '../../utils/AppConstants';
import Validation from '../../utils/Validation';
import {showMsgAlert} from '../../utils/Alert';
//api
import {PostForgotPassword} from '../../api/PostRequest';
import {showAPIError} from '../../api/Config';
//assets
const meafter_logo = require('../../assets/images/meafter_logo/meafter_logo.png');
const otpVerify = require('../../assets/images/verifyOtp/otpVerify.png');
//#endregion

//#region Main
export default function ForgetPassword({navigation, route}) {
  const insets = useSafeAreaInsets();
  //#region useState
  const [isLoaded, setIsloaded] = useState(false);
  const [email, setEmail] = useState('');

  //#endregion

  //#region action
  const onSubmitClick = () => {
    forgotPassAPICall(email, navigation, setIsloaded);
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
        alignItems: 'center',

        backgroundColor: appColors.appWhitePageBg,
      }}>
      <ImageView imgName={otpVerify} marginTop={scaleXiPhone15.twentyH} />

      <KeyboardAvoidingView
        style={[styles.bottomView, {bottom: insets.bottom}]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ImageView imgName={meafter_logo} />

        <Text style={[stylesCommon.txtTitle, {textAlign: 'center'}]}>
          {TextStrings.fpassword}
        </Text>
        <Text style={styles.descTxt}>{TextStrings.forgotPasswordDesc}</Text>

        <TextInputField
          label={TextStrings.email}
          placeholder={TextStrings.enterEmail}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <BtnApp
          isAPICall={isLoaded}
          title={TextStrings.submit}
          onPress={onSubmitClick}
        />

        <Text style={[styles.descTxt, {fontSize: scaleXiPhone15.fouteenH}]}>
          {TextStrings.goBackto}{' '}
          <Text style={styles.loginTxt} onPress={onCancelClick}>
            {TextStrings.login}
          </Text>
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  bottomView: {
    alignItems: 'center', // Center text in bottom view
    paddingHorizontal: scaleXiPhone15.twentyH,
    gap: scaleXiPhone15.sixteenH,
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: appColors.appWhitePageBg,
    paddingBottom: scaleXiPhone15.twentyH, // Added padding at the bottom
  },
  descTxt: {
    fontSize: scaleXiPhone15.sixteenH,
    textAlign: 'center',
    fontFamily: appFonts.regular,
    color: appColors.appBlackTitleTxt,
    //backgroundColor: 'red',
  },
  loginTxt: {
    fontFamily: appFonts.bold,
    fontSize: scaleXiPhone15.fouteenH,
    color: appColors.appBlackBtn,
  },
});
//#endregion

//#region API

async function forgotPassAPICall(userEmail, navigation, setLoader) {
  if (userEmail.trim().length == 0) {
    showMsgAlert(TextStrings.emailMsg);
    return;
  } else if (Validation.EmailValidation.test(userEmail.trim()) === false) {
    showMsgAlert(TextStrings.emailInvalidMsg);
    return;
  }
  setLoader(true);
  await PostForgotPassword({
    UserName: userEmail,
  })
    .then(res => {
      setLoader(false);
      console.log(
        '\u001b[1;32mForgotPassword.js : RES  ',
        JSON.stringify(res.data),
      );
      showMsgAlert(res.data);

      navigation.navigate('VerifyCode', {
        userEmail: userEmail,
        otpType: 1, //- otpType : EmailVerification : 0 , PasswordReset : 1, DearRegistration : 2
      });
    })
    .catch(error => {
      setLoader(false);
      showAPIError(error, TextStrings.forgetPasswordError);
    });
}

//#endregion
