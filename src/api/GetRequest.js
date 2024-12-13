import { HttpRequestBaseURLConfig, HttpRequestEndPointConfig } from "./Config";
import GlobalValue from "./GlobalVar";

import axios from "react-native-axios";

const ConsoleLogUrlParaAndBody = (key, urlTmp, params, body) => {
  console.log(`\u001b[1;34m${key} : urlTmp = `, urlTmp);
  if (params) {
    console.log("\u001b[1;34m params = ", JSON.stringify(params));
  }
  if (body) {
    console.log("\u001b[1;34m body = ", JSON.stringify(body));
  }
};

//#region Dear
export const GetDearList = async (para) => {
  console.log(
    "GlobalValue.accessToken: " + JSON.stringify(GlobalValue.accessToken)
  );
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointDears;
  ConsoleLogUrlParaAndBody("GET : Dears List ", urlTmp, para, null);
  const response = await axios({
    method: "get",
    url: urlTmp,
    params: para,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};

export const GetRelationshipList = async (para) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost + "Lookup/relationship-types";
  ConsoleLogUrlParaAndBody("GET : Relationship List ", urlTmp, para, null);
  const response = await axios({
    method: "get",
    url: urlTmp,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};

//#endregion

//#region Group

export const GetGroupList = async (para) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointGroups +
    "/" +
    GlobalValue.userId;
  ConsoleLogUrlParaAndBody("GET : Group List ", urlTmp, para, null);
  const response = await axios({
    method: "get",
    url: urlTmp,
    params: para,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};
export const GetGroupMemberList = async (groupId) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointGroups +
    "/" +
    groupId +
    HttpRequestEndPointConfig.endPointMembers;
  ConsoleLogUrlParaAndBody("GET :  Group Member List  ", urlTmp, null, null);
  const response = await axios({
    method: "get",
    url: urlTmp,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};

//#endregion

//#region Occastion

export const GetOccastionTypeList = async () => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointOccasions +
    HttpRequestEndPointConfig.endPointOccasionType;
  ConsoleLogUrlParaAndBody("GET : Occastions List ", urlTmp, null);
  const response = await axios({
    method: "get",
    url: urlTmp,
  });
  return response;
};

export const GetOccastionsList = async (para) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointOccasions;
  ConsoleLogUrlParaAndBody("GET : Occastions List ", urlTmp, para, null);
  const response = await axios({
    method: "get",
    url: urlTmp,
    params: para,
  });
  return response;
};
//#endregion

//#region Recording
export const GetRecordingList = async (para) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointRecordings;

  ConsoleLogUrlParaAndBody("GET : Recording List ", urlTmp, para, null);
  const response = await axios({
    method: "get",
    url: urlTmp,
    params: para,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};
export const GetSharedWithMeRecordingList = async (para) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointRecordings +
    "/" +
    GlobalValue.userId +
    "/" +
    HttpRequestEndPointConfig.endPointMySharedRecording;

  ConsoleLogUrlParaAndBody(
    "GET : GetSharedWithMeRecordingListt ",
    urlTmp,
    para,
    null
  );
  const response = await axios({
    method: "get",
    url: urlTmp,
    params: para,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};

export const GetRecordingDetail = async (recordingId) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointRecording +
    "/" +
    recordingId;
  ConsoleLogUrlParaAndBody("Get RecordingDetail", urlTmp, null);
  const response = await axios({
    method: "Get",
    url: urlTmp,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};
//#endregion

//#region Profile
export const GetProfile = async () => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointProfile +
    "/" +
    GlobalValue.userId;
  ConsoleLogUrlParaAndBody(" GetProfile", urlTmp, null);
  const response = await axios({
    method: "Get",
    url: urlTmp,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};

export const GetSasUrl = async (para, isupload) => {
  const urlTmp = isupload
    ? HttpRequestBaseURLConfig.baseURLHost + "Blob/upload-sas-url"
    : HttpRequestBaseURLConfig.baseURLHost + "Blob/get-sas-url";

  ConsoleLogUrlParaAndBody("GetSasUrl", urlTmp, para);
  const response = await axios({
    method: "Get",
    params: para,
    url: urlTmp,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};

//#endregion
