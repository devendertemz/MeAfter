//#region import
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
//baseComp
import BtnApp from '../../components/baseComp/BtnApp';
//blockComp
import {ImageView} from '../../components/blockComp/ImageView';
import PasswordInputField from '../../components/blockComp/PasswordInputField';
//utils
import {stylesCommon} from '../../utils/CommonStyle';
import TextStrings from '../../utils/TextStrings';
import {scaleXiPhone15, appFonts, appColors} from '../../utils/AppConstants';
//assets
const meafter_logo = require('../../assets/images/meafter_logo/meafter_logo.png');
const login_Img = require('../../assets/images/login/login_Img.png');
//#endregion

//#region Main
export default function Login({navigation, route}) {
  const insets = useSafeAreaInsets();

  //#region useState
  const [isLoaded, setIsloaded] = useState(false);
  const [password, setpassword] = useState('Test@1234');
  const [confirmPassword, setConfirmPassword] = useState('Test@1234');
  //#endregion

  //#region action

  const onCancelClick = () => {
    navigation.goBack();
  };
  const onSubmitClick = () => {};

  //#endregion

  return (
    <SafeAreaView style={styles.safearea}>
      <ImageView imgName={login_Img} marginTop={scaleXiPhone15.twentyH} />
      <KeyboardAvoidingView
        style={[styles.bottomView, {bottom: insets.bottom}]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ImageView imgName={meafter_logo} marginTop={scaleXiPhone15.tenH} />

        <Text style={[stylesCommon.txtTitle, {textAlign: 'center'}]}>
          {TextStrings.Setnewpassword}
        </Text>

        <PasswordInputField
          label={TextStrings.newPassword}
          placeholder={TextStrings.enterPassword}
          value={password}
          secureTextEntry={true}
          onChangeText={setpassword}
        />
        <PasswordInputField
          label={TextStrings.confirmPassword}
          placeholder={TextStrings.enterConfirmPassword}
          value={confirmPassword}
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
        />

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
  safearea: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: appColors.appWhitePageBg,
  },
  bottomView: {
    alignItems: 'center', // Center text in bottom view
    padding: scaleXiPhone15.sixteenH,
    gap: scaleXiPhone15.sixteenH,
    position: 'absolute',
    left: 0,
    right: 0,
    paddingBottom: scaleXiPhone15.twentyH, // Added padding at the bottom
    backgroundColor: appColors.appWhitePageBg,
    //backgroundColor: 'red',
  },
  cancelTxt: {
    fontFamily: appFonts.bold,
    fontSize: scaleXiPhone15.fouteenH,
    color: appColors.appBlackBtn,
  },
  textForget: {
    width: '100%',
    fontSize: scaleXiPhone15.sixteenH,
    textAlign: 'center',
    fontFamily: appFonts.regular,
    color: appColors.appBlackTitleTxt,
    //backgroundColor: 'red',
  },
  registerRow: {
    alignSelf: 'center',
    flexDirection: 'row',
    // backgroundColor: 'green',
  },
  registertext: {
    fontFamily: appFonts.bold,
    fontSize: scaleXiPhone15.fouteenH,
  },
});
//#endregion
