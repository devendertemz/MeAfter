import { useEffect, useState } from "react";
import Validation from "../utils/Validation";
import { showMsgAlert } from "../utils/Alert";

export const HttpRequestBaseURLConfig = {
  //baseURLHost: 'https://meafterapi.azurewebsites.net/api/',
  baseURLHost:
    "https://meafterapi-geekama3gcerd4gw.francecentral-01.azurewebsites.net/api/",
  repoVersion: "12 Dec | 11:00 pm",
};
export const HttpRequestEndPointConfig = {
  //#region auth
  endPointUsersRegister: "Users/register",
  endPointUsersLogin: "Users/login",
  endPointUsersForgotPassword: "Users/forgotpassword",
  endPointUsersOtpVerification: "Users/OtpVerification",
  endPointUsersResetPassword: "Users/resetpassword",
  endUsersResendVerification: "Users/resend-verification",
  //#endregion

  //#region Dear
  endPointDears: "Dears",
  //#endregion

  //#region Group
  endPointGroups: "Groups",
  endPointMembers: "/members",
  //#endregion

  //#region Recordings
  endPointRecordings: "Recordings",
  endPointRecording: "Recording",
  endPointMySharedRecording: "my-shared-recordings",
  endPointSetSharedRecording: "set-shared-recording",
  //#endregion

  //#region Occasions
  endPointOccasions: "Occasions",
  endPointOccasion: "Occasion",
  endPointOccasionType: "/occasionTypes",
  //#endregion

  //#region Profile
  endPointProfile: "Profile",
  //#endregion
};

//#region Helper
export const showAPIError = (error, title) => {
  if (error.response) {
    console.error(
      "errResponse : status | data | ",
      error.response.status,
      JSON.stringify(error.response.data, null, 4)
    );
    const errResponse = error.response?.data;
    if (errResponse?.message) {
      const message = errResponse.message;
      showMsgAlert(message, title);
    } else if (errResponse?.errors) {
      const error = JSON.stringify(errResponse.errors);
      showMsgAlert(error, title);
    } else if (error.response.status == 400) {
      showMsgAlert(error.response.data, title);
    } else {
      const msg = getAPIError(error.response.status, error.response);
      showMsgAlert(msg, title);
    }
  } else {
    showMsgAlert(error.message, title);
  }
};
const getAPIError = (code, msg) => {
  return code + JSON.stringify(msg);
};
export const validateUrl = (url) => {
  const regex = new RegExp(Validation.validateUrl);
  return regex.test(url);
};
//#endregion
