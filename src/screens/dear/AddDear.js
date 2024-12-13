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
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
//baseComp
import BtnApp from "../../components/baseComp/BtnApp";
//blockComp
import { ProfilePicComp } from "../../components/blockComp/ImageView";
import DobField from "../../components/blockComp/DobField";
import TextInputField from "../../components/blockComp/TextInputField";
//utils
import TextStrings from "../../utils/TextStrings";
import { scaleXiPhone15, appFonts, appColors } from "../../utils/AppConstants";
import { stylesCommon } from "../../utils/CommonStyle";
import { convertDateToDisplayFormat } from "../../utils/DateTimeUtil";
//api
import { PostDears } from "../../api/PostRequest";
import { GetRelationshipList } from "../../api/GetRequest";
import { showAPIError } from "../../api/Config";
//#endregion

//#region Main
export default function AddDear({ navigation, route }) {
  //#region useState
  const [isLoaded, setLoaded] = useState("");
  const [arrRel, setArrRel] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [familyRel, setFamilyRel] = useState("");
  const [personalRel, setPersonalRel] = useState("");
  const [preserve, setPreserve] = useState("");
  const [personality, setPersonality] = useState("");
  const [selected, setSelected] = React.useState("");
  //#endregion

  const data = [
    { key: "1", value: "Mobiles" },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers" },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];

  //#region api
  useEffect(() => {
    GetRelationShipListAPICall(setArrRel, setLoaded);
    return () => {
      console.log("\u001b[1;32mAD.js : useEffect unmount ");
    };
  }, []);
  //#endregion

  //#region action
  const choosePhotoFromGallery = () => {
    console.log("choosePhotoFromGallery");
  };
  const onSubmitClick = () => {
    console.log("onSubmitClick");
    AddDearAPICall(
      firstName,
      lastName,
      email,
      familyRel,
      personalRel,
      preserve,
      personality,
      navigation,
      setLoaded
    );
  };
  //#endregion

  return (
    <SafeAreaView style={styles.safearea}>
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={scaleXiPhone15.hundredH}
      >
        <ScrollView
          contentContainerStyle={styles.containerScroll}
          showsVerticalScrollIndicator={true}
        >
          <ProfilePicComp onPress={choosePhotoFromGallery} />
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
            keyboardType="email-address"
          />
          {/*  <TextInputField
            label={"Family relationship"}
            placeholder={"Family relationship"}
            value={familyRel}
            onChangeText={setFamilyRel}
          /> */}
          <Text style={styles.labelText}> {label} </Text>
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            save="value"
            search={false}
            placeholder={"Select Relationship"}
            boxStyles={{
              borderRadius: scaleXiPhone15.fourH,
              borderColor: appColors.appGrayBorder,
              backgroundColor: appColors.appWhiteTxtInpt,
            }}
            inputStyles={{
              fontFamily: appFonts.bold,
              fontSize: scaleXiPhone15.sixteenH,
              color: appColors.appBlackTitleTxt,
            }}
          />
          <TextInputField
            label={"My personal relationship with"}
            placeholder={"My personal relationship with"}
            value={personalRel}
            onChangeText={setPersonalRel}
          />
          <TextInputField
            label={"what you would like to preserve with your dear"}
            placeholder={"Enter here"}
            value={preserve}
            onChangeText={setPreserve}
            isMultiline={true}
          />
          <TextInputField
            label={"Dear Personality"}
            placeholder={"Enter Dear Personality"}
            value={personality}
            onChangeText={setPersonality}
            isMultiline={true}
          />
          <BtnApp
            marginVertical={scaleXiPhone15.sixteenH}
            isAPICall={isLoaded}
            title={"Save"}
            onPress={onSubmitClick}
          />
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
  containerScroll: {
    padding: scaleXiPhone15.sixteenH,
    gap: scaleXiPhone15.fourH,
    //backgroundColor: 'yellow',
  },
});
//#endregion

//#region API
async function AddDearAPICall(
  firstName,
  lastName,
  email,
  familyRel,
  personalRel,
  preserve,
  personality,
  navigation,
  setLoaded
) {
  const data = {};
  data.relatedUser = {
    firstName: firstName,
    lastName: lastName,
    userName: email,
  };
  data.relationship = familyRel;
  data.relationshipDescription = personalRel;
  data.dearPersonality = personality;
  data.dearMemories = preserve;
  console.log("data = ", JSON.stringify(data));

  await PostDears(data)
    .then((res) => {
      setLoaded(false);
      console.log("\u001b[1;32mAD.js : RES  ", JSON.stringify(res.data));
    })
    .catch((error) => {
      setLoaded(false);
      showAPIError(error, "Error : Add Dear");
    });
}
async function GetRelationShipListAPICall(setArrRel, setLoaded) {
  await GetRelationshipList()
    .then((res) => {
      setLoaded(false);
      console.log(
        "\u001b[1;32mAD.js : RES | Relation List =  ",
        JSON.stringify(res.data.length)
      );
      setArrRel(res.data);
    })
    .catch((error) => {
      setLoaded(false);
      showAPIError(error, "Error : Relationship List");
    });
}

//#endregion
