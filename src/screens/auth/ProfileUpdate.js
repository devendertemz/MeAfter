//#region import
import React, { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Alert,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "react-native-blob-util";
import DatePicker from "react-native-date-picker";
//baseComp
import BtnApp from "../../components/baseComp/BtnApp";
import CustomLoader from "../../components/baseComp/CustomLoader";
//blockComp
import { ProfilePicComp } from "../../components/blockComp/ImageView";
import DobField from "../../components/blockComp/DobField";
import TextInputField from "../../components/blockComp/TextInputField";
//utils
import { genrateUniqueNameWithExtenstion } from "../../utils/Helper";
import TextStrings from "../../utils/TextStrings";
import { scaleXiPhone15, appFonts, appColors } from "../../utils/AppConstants";
import { stylesCommon } from "../../utils/CommonStyle";
import {
  convertDateToDisplayFormat,
  convertDateToAPIFormat,
} from "../../utils/DateTimeUtil";
import { showAlertForMediaSourceTypeSel } from "../../utils/Alert";
//api
import { GetProfile, GetSasUrl } from "../../api/GetRequest";
import { PutProfileUpdate } from "../../api/PostRequest";
import { showAPIError } from "../../api/Config";

//#endregion

//#region Main
export default function ProfileUpdate({ navigation, route }) {

  //#region useState
  const [isLoaded, setLoaded] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bday, setBday] = useState(null);
  const [aboutUs, setAboutUs] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [pro, setPro] = useState({});
  const [proImg, setProImg] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  //#endregion

  //#region api
  useEffect(() => {
    GetProfileAPICall(setPro, setLoaded);
    return () => {
      console.log("\u001b[1;32mPU.js : useEffect unmount ");
    };
  }, []);
  useEffect(() => {
    console.log("\u001b[1;32mPU.js : useEffect [pro] = ", JSON.stringify(pro));
    const { userId, bio, hobbies, profilePictureBlobId, user } = pro;
    setAboutUs(bio);
    setHobbies(hobbies);
    if (profilePictureBlobId && profilePictureBlobId.length > 5) {
      function callBackFun(sasUrl) {
        setLoaded(false);
        setProImg(sasUrl);
      }
      GetSasUrlAPICall(false, profilePictureBlobId, callBackFun, setLoaded);
    }

    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.userName);
      setPhone(user.mobile);
      setBday(user.dateOfBirth);
    }
  }, [pro]);
  const callSasUrl = (filePath) => {
    const fileNameWithExt =
      "guid_image_" + genrateUniqueNameWithExtenstion(filePath);
    console.log("fileNameWithExt = ", fileNameWithExt);
    function callBackFun(sasUrl) {
      function callBackFunForProfileUpdate() {
        pro.profilePictureBlobId = fileNameWithExt;
        PutProfileAPICall(pro, setLoaded, navigation);
      }
      UploadProfilePicAPICall(
        sasUrl,
        filePath,
        callBackFunForProfileUpdate,
        setLoaded
      );
    }
    GetSasUrlAPICall(true, fileNameWithExt, callBackFun, setLoaded);
  };
  //#endregion

  //#region action
  const onShowCalenderClick = () => {
    setShowCalendar(true);
  };
  const onSubmitClick = () => {
    pro.bio = aboutUs;
    pro.hobbies = hobbies;
    pro.user.firstName = firstName;
    pro.user.lastName = lastName;
    pro.user.mobile = phone;
    pro.user.dateOfBirth = convertDateToAPIFormat(bday);
    PutProfileAPICall(pro, setLoaded, navigation);
  };
  const choosePhotoFromGallery = () => {
    const callBackfn = (item) => {
      if (item === 1) {
        ImagePicker.openPicker({
          mediaType: "photo",
          multiple: false,
          width: scaleXiPhone15.hundredFiftyH,
          height: scaleXiPhone15.hundredFiftyH,
          cropping: true,
        })
          .then(async (image) => {
            setProImg(image.path);
            callSasUrl(image.path);
          })
          .catch((error) => {
            console.log(
              "\u001b[1;31mPU.js : Error | Device gallery = ",
              JSON.stringify(error.message)
            );
          });
      } else {
        ImagePicker.openCamera({
          width: scaleXiPhone15.hundredFiftyH,
          height: scaleXiPhone15.hundredFiftyH,
          cropping: true,
        })
          .then((image) => {
            setProImg(image.path);
            callSasUrl(image.path);
          })
          .catch((error) => {
            console.log(
              "\u001b[1;31mPU.js : Error | Device camera = ",
              JSON.stringify(error.message)
            );
          });
      }
    };
    showAlertForMediaSourceTypeSel(callBackfn);
  };
  const onSkipClick = () => {
    navigation.navigate("BtmTabs");
  };
  //#endregion

  //#region JSX
  const setDatePickerMaxDate = () => {
    const maxDob = new Date();
    maxDob.setFullYear(maxDob.getFullYear() - 18);
    return maxDob;
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
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={scaleXiPhone15.hundredH}
      >
        <ScrollView
          contentContainerStyle={styles.containerScroll}
          showsVerticalScrollIndicator={true}
        >
           <ProfilePicComp
            isLoaded={isLoaded}
            proImg={proImg}
            onPress={choosePhotoFromGallery}
          />
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
            editable={false}
          />
          <TextInputField
            label={TextStrings.phonenumber}
            placeholder={TextStrings.enterPhonenumber}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <DobField
            icon={"calendar"}
            label={TextStrings.selectDataofBirth}
            placeholder={TextStrings.selectDataofBirth}
            value={bday != null ? convertDateToDisplayFormat(bday) : ""}
            onPress={onShowCalenderClick}
          />
          <TextInputField
            label={"About Us"}
            placeholder={"Basic info"}
            value={aboutUs}
            onChangeText={setAboutUs}
            isMultiline={true}
          />
          <TextInputField
            label={"Hobbies"}
            placeholder={"Enter Hobbies"}
            value={hobbies}
            onChangeText={setHobbies}
          />
          <BtnApp
           // isAPICall={isLoaded}
            marginVertical={scaleXiPhone15.sixteenH}
            title={TextStrings.login}
            onPress={onSubmitClick}
          />
          <Text
            style={([stylesCommon.txtTitle], { textAlign: "center" })}
            onPress={onSkipClick}
          >
            Skip
          </Text>
       
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
    paddingHorizontal: scaleXiPhone15.sixteenH,
    gap: scaleXiPhone15.fourH,
  },
});
//#endregion

//#region Api
async function GetProfileAPICall(setPro, setLoader) {
  setLoader(true);
  await GetProfile()
    .then((res) => {
      setLoader(false);
      console.log(
        "\u001b[1;32mPU.js : RES Get Profile  = ",
        JSON.stringify(res.data.userId)
      );
      setPro(res.data);
    })
    .catch((error) => {
      setLoader(false);
      showAPIError(error, "Error : Get Profile");
    });
}
async function GetSasUrlAPICall(isUpload, filename, callbackfun, setLoader) {
  const para = { fileName: filename, fileType: "ProfilePhoto" };
  setLoader(true);
  await GetSasUrl(para, isUpload)
    .then((res) => {
      console.log(
        "\u001b[1;32mPU.js : RES Get Sas url  = ",
        JSON.stringify(res.data)
      );
      callbackfun(res.data.sasUrl);
      //{"sasUrl":"https://meafterblobstorage.blob.core.windows.net/profile-videos/file_09121?sv=2025-01-05&se=2024-12-09T08%3A51%3A09Z&sr=b&sp=w&sig=aec85GPeUzA9wBX2uYkAf6DbPBQIuarUbgEVseQfG08%3D"}
    })
    .catch((error) => {
      setLoader(false);
      showAPIError(error, "Error : Get Sas Url");
    });
}
async function PutProfileAPICall(body, setLoader, navigation) {
  setLoader(true);
  await PutProfileUpdate(body)
    .then((res) => {
      setLoader(false);
      console.log(
        "\u001b[1;32mPU.js:RES | update profile  = ",
        JSON.stringify(res.data)
      );
    })
    .catch((error) => {
      setLoader(false);
      showAPIError(error, "Error : Profile Update");
    });
}
async function UploadProfilePicAPICall(
  sasUrl,
  imgPath,
  callbackfun,
  setLoader
) {
  console.log("UploadProfilePicAPICall filePath = ", imgPath);
  console.log("UploadProfilePicAPICall sasUrl = ", sasUrl);

  RNFetchBlob.fetch(
    "PUT",
    sasUrl,
    {
      "Content-Type": "multipart/form-data",
      "x-ms-blob-type": "BlockBlob",
    },
    RNFetchBlob.wrap(imgPath)
  )
    .then((res) => {
      console.log("RNFetchBlob res ", JSON.stringify(res, null, 4));
      callbackfun();
    })
    .catch((error) => {
      setLoader(false);
      showAPIError(error, "Error : Profile Image Update");
    });
}
//#endregion
