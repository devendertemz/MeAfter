//#region import
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DatePicker from "react-native-date-picker";
//baseComp
import BtnApp from "../../components/baseComp/BtnApp";
//blockComp
import TextInputField from "../../components/blockComp/TextInputField";
import PasswordInputField from "../../components/blockComp/PasswordInputField";
import { ImageView } from "../../components/blockComp/ImageView";
import DobField from "../../components/blockComp/DobField";
import RadioButton from "../../components/blockComp/RadioButton";
//utils
import { stylesCommon } from "../../utils/CommonStyle";
import TextStrings from "../../utils/TextStrings";
import { scaleXiPhone15, appFonts, appColors } from "../../utils/AppConstants";
import { showMsgAlert } from "../../utils/Alert";
import Validation from "../../utils/Validation";
import { convertDateToDisplayFormat } from "../../utils/DateTimeUtil";
//api
import { showAPIError } from "../../api/Config";
import { PostRegister } from "../../api/PostRequest";
//assets
const meafter_logo = require("../../assets/images/meafter_logo/meafter_logo.png");
//#endregion

//#region Main
export default function Reg({ navigation, route }) {
  const subItems = [
    { id: "2", name: TextStrings.premium }, // premimum--->2
    { id: "3", name: TextStrings.freeTrial }, // freeTrail-->>3
  ];
  //#region useState
  const [isLoaded, setIsloaded] = useState(false);
  const [subcriptionObj, setSubcriptionObj] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setpassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [bday, setBday] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  //#endregion

  //#region action
  const onRegisterClick = () => {
    RegisterAPICall(
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      bday,
      subcriptionObj,
      navigation,
      setIsloaded
    );
  };
  const onLoginClick = () => {
    navigation.goBack();
  };
  const onShowCalenderClick = () => {
    setShowCalendar(true);
  };
  const onSubcriptionclick = (item) => {
    console.log("onSubcriptionclick" + JSON.stringify(item));
    // return;
    setSubcriptionObj(item);
  };
  const setDatePickerMaxDate = () => {
    const maxDob = new Date();
    maxDob.setFullYear(maxDob.getFullYear() - 18);
    return maxDob;
  };
  //#endregion

  //#region JSX
  const RadioGroup = () => {
    return (
      <View style={styles.contRadio}>
        {subItems.map((item) => (
          <View key={item.id} style={{ flex: 1 }}>
            <RadioButton
              selected={subcriptionObj.id === item.id}
              item={item}
              onPress={onSubcriptionclick}
            />
          </View>
        ))}
      </View>
    );
  };
  const TermsAndPrivacy = () => {
    return (
      <View style={styles.contTerms}>
        <Text style={styles.registertext}>
          {TextStrings.bySigningupyouagree}{" "}
          <Text style={styles.registerBlacktext}>
            {TextStrings.termsConditions}{" "}
          </Text>
          <Text>{TextStrings.and} </Text>
          <Text style={styles.registerBlacktext}>
            {" "}
            {TextStrings.privacypolicy}
          </Text>
        </Text>
      </View>
    );
  };
  const SetModalComp = () => {
    return (
      <>
        <DatePicker
          modal
          open={showCalendar}
          maximumDate={setDatePickerMaxDate()}
          date={setDatePickerMaxDate()}
          mode="date"
          onConfirm={(date) => {
            setBday(date);
            setShowCalendar(false);
          }}
          onCancel={() => {
            setShowCalendar(false);
          }}
        />
      </>
    );
  };
  //#endregion

  return (
    <SafeAreaView style={styles.safearea}>
      <SetModalComp />
      <KeyboardAvoidingView behavior="padding" enabled>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollCont}
        >
          <ImageView imgName={meafter_logo} />
          <Text
            style={[
              stylesCommon.txtTitle,
              { textAlign: "center", marginTop: scaleXiPhone15.eightH },
            ]}
          >
            {TextStrings.signup}
          </Text>
          <TextInputField
            label={TextStrings.firstName}
            placeholder={TextStrings.enterFirstName}
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInputField
            label={TextStrings.lastName}
            placeholder={TextStrings.enterLastName}
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInputField
            label={TextStrings.email}
            placeholder={TextStrings.enterEmail}
            value={email}
            onChangeText={setEmail}
          />
          <TextInputField
            label={TextStrings.phonenumber}
            placeholder={TextStrings.enterPhonenumber}
            value={phone}
            onChangeText={setPhone}
          />
          <PasswordInputField
            label={TextStrings.password}
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
          <DobField
            icon={"calendar"}
            label={TextStrings.selectDataofBirth}
            placeholder={TextStrings.selectDataofBirth}
            value={bday != null ? convertDateToDisplayFormat(bday) : ""}
            onPress={onShowCalenderClick}
          />
          <RadioGroup />
          <TermsAndPrivacy />
          <BtnApp
            isAPICall={isLoaded}
            title={TextStrings.register}
            onPress={onRegisterClick}
          />
          <View style={styles.contLogin}>
            <Text style={styles.registertext}>
              {TextStrings.alreadyhaveanaccount}{" "}
            </Text>
            <Text style={styles.registerBlacktext} onPress={onLoginClick}>
              {TextStrings.login}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: appColors.appWhitePageBg,
  },
  scrollCont: {
    alignItems: "center",
    margin: scaleXiPhone15.sixteenH,
    gap: scaleXiPhone15.eightH,
    //backgroundColor: 'yellow',
  },
  textForget: {
    width: "100%",
    fontSize: scaleXiPhone15.sixteenH,
    textAlign: "center",
    fontFamily: appFonts.regular,
    color: appColors.appBlackTitleTxt,
    //backgroundColor: 'red',
  },
  contRadio: {
    flexDirection: "row",
    marginVertical: scaleXiPhone15.eightH,
    //backgroundColor: 'red',
  },
  contTerms: {
    alignSelf: "left",
    marginVertical: scaleXiPhone15.eightH,
    flexDirection: "row",
    // backgroundColor: 'green',
  },
  contLogin: {
    alignSelf: "center",
    gap: scaleXiPhone15.eightH,
    flexDirection: "row",
    paddingVertical: scaleXiPhone15.tenH,
    //backgroundColor: 'green',
  },
  registertext: {
    fontFamily: appFonts.bold,
    fontSize: scaleXiPhone15.fouteenH,
    color: appColors.appBlackTitleTxt,
  },
  registerBlacktext: {
    fontSize: scaleXiPhone15.fouteenH,
    color: appColors.appBlackBtn,
    fontFamily: appFonts.black,
  },
});
//#endregion

//#region API
async function RegisterAPICall(
  firstName,
  lastName,
  userEmail,
  phone,
  password,
  confirmPassword,
  bday,
  subcriptionObj,
  navigation,
  setIsloaded
) {
  if (firstName.trim().length == 0) {
    showMsgAlert(TextStrings.enterFirstName);
    return;
  } else if (lastName.trim().length == 0) {
    showMsgAlert(TextStrings.enterLastName);
    return;
  } else if (userEmail.trim().length == 0) {
    showMsgAlert(TextStrings.emailMsg);
    return;
  } else if (Validation.EmailValidation.test(userEmail.trim()) === false) {
    showMsgAlert(TextStrings.emailInvalidMsg);
    return;
  } else if (phone.trim().length == 0) {
    showMsgAlert(TextStrings.enterPhonenumber);
    return;
  } else if (password.trim().length == 0) {
    showMsgAlert(TextStrings.enterPassword);
    return;
  } else if (Validation.PasswordValidation.test(password.trim()) === false) {
    showMsgAlert(
      TextStrings.Minimum8characters +
        TextStrings.passwordformate +
        TextStrings.alertPassAllowedSpecialChar
    );

    return;
  } else if ((confirmPassword.trim() === password.trim()) === false) {
    showMsgAlert(TextStrings.CPasswordMsg);
    return;
  } else if (!bday) {
    showMsgAlert(TextStrings.selectDataofBirth);
    return;
  } else if (!subcriptionObj?.id) {
    showMsgAlert(TextStrings.selectSubscriptionType);
    return;
  }
  const para = {
    id: 0,
    firstName: firstName,
    lastName: lastName,
    userName: userEmail,
    mobile: phone,
    password: password,
    dateOfBirth: bday,
    subscriptionType: subcriptionObj.id,
  };
  setIsloaded(true);
  await PostRegister(para)
    .then((res) => {
      setIsloaded(false);
      console.log("\u001b[1;32mReg.js : RES  ", JSON.stringify(res.data));
      navigation.navigate("VerifyCode", {
        userEmail: userEmail,
        otpType: 0, //- otpType : EmailVerification : 0 , PasswordReset : 1, DearRegistration : 2
      });
    })
    .catch((error) => {
      setIsloaded(false);
      showAPIError(error, TextStrings.regError);
    });
}

//#endregion
