import axios from "react-native-axios";
import { HttpRequestBaseURLConfig, HttpRequestEndPointConfig } from "./Config";
import GlobalValue from "./GlobalVar";

const ConsoleLogUrlParaAndBody = (key, urlTmp, params, body) => {
  console.log(`\u001b[1;34m ${key} : urlTmp = `, urlTmp);
  if (params) {
    console.log("\u001b[1;34m params = ", JSON.stringify(params));
  }
  if (body) {
    console.log("\u001b[1;34m body = ", JSON.stringify(body));
  }
};

//#region Auth
export const PostRegister = async (data) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointUsersRegister;
  ConsoleLogUrlParaAndBody("PostRegister", urlTmp, null, data);
  const response = await axios({
    method: "post",
    data: data,
    url: urlTmp,
  });
  return response;
};
export const PostLogin = async (data) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointUsersLogin;
  ConsoleLogUrlParaAndBody("PostLogin", urlTmp, null, data);
  const response = await axios({
    method: "Put",
    data: data,
    url: urlTmp,
  });
  return response;
};
export const PostForgotPassword = async (para) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointUsersForgotPassword;
  ConsoleLogUrlParaAndBody("PostForgotPassword", urlTmp, para);
  const response = await axios({
    method: "Post",
    params: para,
    url: urlTmp,
  });
  return response;
};
export const PostOtpVerification = async (data) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointUsersOtpVerification;
  ConsoleLogUrlParaAndBody("PostOtpVerification", urlTmp, data, null);
  const response = await axios({
    method: "Post",
    data: data,
    url: urlTmp,
  });
  return response;
};
export const PostResetPassword = async (data) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointUsersResetPassword;
  ConsoleLogUrlParaAndBody("PostResetPassword", urlTmp, data, null);
  const response = await axios({
    method: "Post",
    data: data,
    url: urlTmp,
  });
  return response;
};
export const ResendVerification = async (params) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endUsersResendVerification;
  ConsoleLogUrlParaAndBody("ResendVerification", urlTmp, params, null);
  const response = await axios({
    method: "Post",
    params: params,
    url: urlTmp,
  });
  return response;
};
//#endregion

//#region Profile
export const PutProfileUpdate = async (data) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost + "Profile/" + GlobalValue.userId;
  ConsoleLogUrlParaAndBody("PUT Profile", urlTmp, null, data);
  const response = await axios({
    method: "put",
    data: data,
    url: urlTmp,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};
//#endregion

//#region Dear
export const PostDears = async (data) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointDears;
  ConsoleLogUrlParaAndBody("PostDears", urlTmp, null, data);
  const response = await axios({
    method: "post",
    data: data,
    url: urlTmp,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};
export const DeleteDears = async (dearId) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointDears +
    "/" +
    GlobalValue.userId +
    "/" +
    dearId;
  ConsoleLogUrlParaAndBody("DeleteDears", urlTmp, null);
  const response = await axios({
    method: "Delete",
    url: urlTmp,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};

export const PutDears = async (data, dearId) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointDears +
    "/" +
    GlobalValue.userId +
    "/" +
    dearId;
  ConsoleLogUrlParaAndBody("PutDears", urlTmp, null, data);
  const response = await axios({
    method: "Put",
    data: data,
    url: urlTmp,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};

//#endregion

//#region Grp
export const PostGroup = async (data) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointGroups +
    "/" +
    GlobalValue.userId;
  ConsoleLogUrlParaAndBody("PostGroup", urlTmp, null, data);
  const response = await axios({
    method: "post",
    data: data,
    url: urlTmp,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};
export const DeleteGroup = async (groupId) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointGroups +
    "/" +
    groupId;
  ConsoleLogUrlParaAndBody("DeleteGroup", urlTmp, null);
  const response = await axios({
    method: "Delete",
    url: urlTmp,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};
export const PutGroup = async (data, groupId) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointGroups +
    "/" +
    GlobalValue.userId +
    "/" +
    groupId;
  ConsoleLogUrlParaAndBody("PutGroup", urlTmp, null, data);
  const response = await axios({
    method: "Put",
    data: data,
    url: urlTmp,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};
//#endregion

//#region Occasion
export const PostOccasion = async (data) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointOccasions;
  ConsoleLogUrlParaAndBody("PostGroup", urlTmp, null, data);
  const response = await axios({
    method: "post",
    data: data,
    url: urlTmp,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};

export const PutOccasion = async (data, occasionId) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointOccasion +
    "/" +
    occasionId;
  ConsoleLogUrlParaAndBody("PutOccasion", urlTmp, null, data);
  const response = await axios({
    method: "Put",
    data: data,
    url: urlTmp,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};

export const DeleteOccasion = async (occasionId) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointOccasion +
    "/" +
    occasionId;
  ConsoleLogUrlParaAndBody("DeleteOccasion", urlTmp, null);
  const response = await axios({
    method: "Delete",
    url: urlTmp,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};
//#endregion

//#region Recording
export const PostUploadMedia = async (data) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointRecordings;

  ConsoleLogUrlParaAndBody("POST |Post Upload", urlTmp, null, data);
  const response = await axios({
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${GlobalValue.accessToken}`,
    },
    method: "post",
    data: data,
    url: urlTmp,
  });
  return response;
};

export const PostSetRecording = async (data, recordingID) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointRecording +
    "/" +
    recordingID +
    "/" +
    HttpRequestEndPointConfig.endPointSetSharedRecording;

  ConsoleLogUrlParaAndBody("PostSetRecording", urlTmp, null, data);
  const response = await axios({
    method: "post",
    data: data,
    url: urlTmp,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};

export const DeleteRecording = async (recordingId) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointRecording +
    "/" +
    recordingId;
  ConsoleLogUrlParaAndBody("DeleteRecording", urlTmp, null);
  const response = await axios({
    method: "Delete",
    url: urlTmp,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};

export const UpdateSetRecording = async (data, recordingID) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLHost +
    HttpRequestEndPointConfig.endPointRecording +
    "/" +
    recordingID;

  ConsoleLogUrlParaAndBody("UpdateSetRecording", urlTmp, null, data);
  const response = await axios({
    method: "Put",
    data: data,
    url: urlTmp,
    headers: { Authorization: `Bearer ${GlobalValue.accessToken}` },
  });
  return response;
};
//#endregion
