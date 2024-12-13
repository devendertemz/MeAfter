//#region import
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
const { height, width } = Dimensions.get("window");
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "react-native-blob-util";
//block
import { DearRow } from "../../components/blockComp/CustomRow";
//utils
import FontIcons from "../../components/baseComp/FontIcons";
import { appColors, scaleXiPhone15 } from "../../utils/AppConstants";
import { stylesCommon } from "../../utils/CommonStyle";
import { showAlertForMediaSourceTypeSel } from "../../utils/Alert";
import {
  genrateUniqueNameWithExtenstion,
  HomeBtnComp,
  DearListEmpty,
} from "../../utils/Helper";
//api
import { GetDearList, GetProfile, GetSasUrl } from "../../api/GetRequest";
import { PutProfileUpdate } from "../../api/PostRequest";
import { showAPIError } from "../../api/Config";
//assets
const preview_logo = require("../../assets/images/preview/preview.jpg");
//#endregion

//#region Main
export default function Home({ navigation, route }) {
  //#region useState
  const [loader, setLoader] = useState(false);
  const [arrDear, setDear] = useState([]);
  const [pro, setPro] = useState({});
  const [videoUrl, setVideoUrl] = useState(null);
  //#endregion

  //#region api
  useEffect(() => {
    // GetDearListAPICall(setDear, setLoader);
    GetProfileAPICall(setPro, setLoader);
    return () => {
      console.log("\u001b[1;32mH.js : useEffect unmount ");
    };
  }, []);
  useEffect(() => {
    console.log("\u001b[1;32mPU.js : useEffect [pro] = ", JSON.stringify(pro));
    const { profileVideoBlobId } = pro;
    if (profileVideoBlobId && profileVideoBlobId.length > 5) {
      function callBackFun(sasUrl) {
        setLoader(false);
        setVideoUrl(sasUrl);
      }
      GetSasUrlAPICall(false, profileVideoBlobId, callBackFun, setLoader);
    }
  }, [pro]);
  const callSasUrl = (filePath) => {
    const fileNameWithExt =
      "guid_video_" + genrateUniqueNameWithExtenstion(filePath);
    console.log("fileNameWithExt = ", fileNameWithExt);

    function callBackFunForUploadVideo(sasUrl) {
      console.log("callBackFunForUploadVideo sasUrl = ", sasUrl);
      function callBackFunForProfileUpdate() {
        pro.profileVideoBlobId = fileNameWithExt;
        PutProfileAPICall(pro, setLoader, navigation);
      }
      UploadProfileVideoAPICall(
        sasUrl,
        filePath,
        callBackFunForProfileUpdate,
        setLoader
      );
    }
    GetSasUrlAPICall(
      true,
      fileNameWithExt,
      callBackFunForUploadVideo,
      setLoader
    );
  };

  //#endregion

  //#region btnaction
  const onPhonePress = () => {};
  const onStartNowPress = () => {};
  const onRecordingPress = () => {
    const callBackfn = (item) => {
      if (item === 1) {
        ImagePicker.openPicker({
          mediaType: "video",
          multiple: false,
        })
          .then(async (videoTmp) => {
            console.log("videoTmp = ", JSON.stringify(videoTmp));
            callSasUrl(videoTmp.path);
          })
          .catch((error) => {
            console.log(
              "\u001b[1;31mH.js : Error | Device gallery = ",
              JSON.stringify(error.message)
            );
          });
      } else {
        ImagePicker.openCamera({
          useFrontCamera: true,
        })
          .then((camTmp) => {
            console.log("camTmp = ", JSON.stringify(camTmp));
          })
          .catch((error) => {
            console.log(
              "\u001b[1;31mH.js : Error | Device camera = ",
              JSON.stringify(error.message)
            );
          });
      }
    };
    showAlertForMediaSourceTypeSel(callBackfn);
  };
  //#endregion

  //#region JSX
  const renderFlatListRow = ({ item }) => {
    return <DearRow item={item} onPhoneClick={onPhonePress} />;
  };
  const renderFlatListSep = () => {
    return <View style={{ height: scaleXiPhone15.sixteenH }} />;
  };
  //#endregion

  return (
    <SafeAreaView style={styles.safearea}>
      <Text style={[stylesCommon.txtLblTitle, { textAlign: "center" }]}>
        Welcome, Morty Smith
      </Text>
      <ImageBackground
        resizeMode="cover"
        source={preview_logo}
        style={styles.prevImg}
        imageStyle={{
          borderRadius: scaleXiPhone15.fourH,
        }}
      >
        <HomeBtnComp
          title={"Start Now"}
          color={appColors.appBlackBtn}
          backgroundColor={appColors.appWhitePageBg}
          onPress={onStartNowPress}
        />
      </ImageBackground>
      <RecordComp onPress={onRecordingPress} />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(item, index) => index.toString()}
        data={arrDear}
        renderItem={renderFlatListRow}
        ListHeaderComponent={FlatListHeader}
        ItemSeparatorComponent={renderFlatListSep}
        ListEmptyComponent={DearListEmpty}
      />
    </SafeAreaView>
  );
}
const RecordComp = ({ onPress }) => {
  return (
    <View style={styles.contRecord}>
      <ImageBackground
        resizeMode="cover"
        source={null}
        style={styles.contImgRecord}
        imageStyle={styles.imgRecord}
      >
        <FontIcons
          color={appColors.appWhitePageBg}
          name={"play-circle"}
          size={scaleXiPhone15.sixteenH}
        />
      </ImageBackground>
      <View style={styles.contCap}>
        <Text style={stylesCommon.txtHomeLbl}>Capture Your Presense</Text>
        <HomeBtnComp
          title={"Start Recording"}
          color={appColors.appWhitePageBg}
          backgroundColor={appColors.appBlackBtn}
          onPress={onPress}
        />
      </View>
    </View>
  );
};
const FlatListHeader = () => {
  return (
    <View style={styles.contListHead}>
      <Text style={stylesCommon.txtLblTitle}>My Dears</Text>
      <Text style={stylesCommon.txtLblTitle}>View All</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    margin: scaleXiPhone15.sixteenH,
    gap: scaleXiPhone15.sixteenH,
    backgroundColor: appColors.appWhitePageBg,
  },
  prevImg: {
    height: height * 0.3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  contRecord: {
    flexDirection: "row",
    marginTop: -4 * scaleXiPhone15.sixteenH,
    alignSelf: "center",
    width: "90%",
    padding: scaleXiPhone15.sixteenH,
    borderRadius: scaleXiPhone15.fourH,
    backgroundColor: appColors.appWhiteTxtInpt,
    ...stylesCommon.shadow,
  },
  contImgRecord: {
    width: scaleXiPhone15.sixtyH,
    height: scaleXiPhone15.sixtyH,
    justifyContent: "center",
    alignItems: "center",
  },
  imgRecord: {
    borderRadius: scaleXiPhone15.sixtyH * 0.5,
    backgroundColor: appColors.appGrayLight,
  },
  contCap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",

    //backgroundColor: 'red',
  },
  contListHead: {
    paddingBottom: scaleXiPhone15.sixteenH,
    flexDirection: "row",
    justifyContent: "space-between",
    //backgroundColor: 'yellow',
  },
});
//#endregion

//#region Api
async function GetDearListAPICall(setDear, setLoader) {
  setLoader(true);
  await GetDearList()
    .then((res) => {
      setLoader(false);
      console.log("\u001b[1;32mD.js : RES Get  = ", JSON.stringify(res.data));
      setDear(res.data);
    })
    .catch((error) => {
      setLoader(false);
      showAPIError(error, "Error : Dear List");
    });
}
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
async function GetSasUrlAPICall(
  isUpload,
  filename,
  callBackFunForUploadVideo,
  setLoader
) {
  const para = { fileName: filename, fileType: "ProfileVideo" };
  setLoader(true);
  await GetSasUrl(para, isUpload)
    .then((res) => {
      console.log(
        "\u001b[1;32mH.js : RES Get Sas url  = ",
        JSON.stringify(res.data)
      );
      callBackFunForUploadVideo(res.data.sasUrl);
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
        "\u001b[1;32mH.js:RES | update profile  = ",
        JSON.stringify(res.data)
      );
    })
    .catch((error) => {
      setLoader(false);
      showAPIError(error, "Error : Profile Update");
    });
}
async function UploadProfileVideoAPICall(
  sasUrl,
  filePath,
  callbackfun,
  setLoader
) {
  console.log("UploadProfileVideoAPICall filePath = ", filePath);
  console.log("UploadProfileVideoAPICall sasUrl = ", sasUrl);

  RNFetchBlob.fetch(
    "PUT",
    sasUrl,
    {
      "Content-Type": "multipart/form-data",
      "x-ms-blob-type": "BlockBlob",
    },
    RNFetchBlob.wrap(filePath)
  )
    .then((res) => {
      console.log("RNFetchBlob res ", JSON.stringify(res, null, 4));
      callbackfun();
    })
    .catch((error) => {
      setLoader(false);
      showAPIError(error, "Error : Profile Video Update");
    });
}
//#endregion
