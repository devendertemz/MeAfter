//#region import
import React, {useEffect, useState} from 'react';
import {Dimensions, Text, SafeAreaView, StyleSheet} from 'react-native';
//baseComp
import BtnApp from '../../components/baseComp/BtnApp';
//blockComp
import PasswordInputField from '../../components/blockComp/PasswordInputField';
//utils
import TextStrings from '../../utils/TextStrings';
import {scaleXiPhone15, appFonts, appColors} from '../../utils/AppConstants';
import {showMsgAlert} from '../../utils/Alert';
import Validation from '../../utils/Validation';
//api
import {showAPIError} from '../../api/Config';
import {PostResetPassword} from '../../api/PostRequest';
import GlobalValue from '../../api/GlobalVar';

//#region Main
export default function ChangePassword({navigation, route}) {
  //#region useState
  const [isLoaded, setIsloaded] = useState(false);
  const [password, setpassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //#endregion

  //#region action

  const onUpdateClick = () => {
    udpatePasswordAPICall(password, confirmPassword, navigation, setIsloaded);
  };
  //#endregion

  return (
    <SafeAreaView style={styles.safearea}>
      <Text style={styles.title}>{TextStrings.changePassword}</Text>
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
        title={TextStrings.update}
        onPress={onUpdateClick}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    paddingHorizontal: scaleXiPhone15.sixteenH,
    gap: scaleXiPhone15.sixteenH,
    backgroundColor: appColors.appWhitePageBg,
  },
  title: {
    fontSize: scaleXiPhone15.eightteenH,
    fontFamily: appFonts.bold,
    color: appColors.appBlackBtn,
    paddingVertical: scaleXiPhone15.sixteenH,
  },
});
//#endregion

//#region API

async function udpatePasswordAPICall(
  password,
  confirmPassword,
  navigation,
  setIsloaded,
) {
  if (password.trim().length == 0) {
    showMsgAlert(TextStrings.enterPassword);
    return;
  } else if (Validation.PasswordValidation.test(password.trim()) === false) {
    showMsgAlert(
      TextStrings.Minimum8characters +
        TextStrings.passwordformate +
        TextStrings.alertPassAllowedSpecialChar,
    );

    return;
  } else if ((confirmPassword.trim() === password.trim()) === false) {
    showMsgAlert(TextStrings.CPasswordMsg);
    return;
  }

  setIsloaded(true);
  console.log('para');

  const para = {
    userName: GlobalValue.emailId,
    password: password,
    confirmPassword: confirmPassword,
  };

  await PostResetPassword(para)
    .then(res => {
      setIsloaded(false);
      console.log(
        '\u001b[1;32mChangePassword.js : RES  ',
        JSON.stringify(res.data),
      );
      showMsgAlert(TextStrings.updatedPasswordMsg);

      navigation.goBack();
    })
    .catch(error => {
      setIsloaded(false);
      showAPIError(error, TextStrings.updatePassword);
    });
}

//#endregion
