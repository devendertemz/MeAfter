module.exports = {
  CharValidation: /^[A-Za-z]+$/,
  FullNameValidation: /^[a-zA-Z ]+$/,
  EmailValidation: /\S+@\S+\.\S+/,
  /* MobileNoValidation:
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, */

  //phoneRegex: /^[0]?[15789]\d{9}$/,
  phoneRegex: /^\d{8,15}$/, // to match 8-15 digits

  PasswordValidation:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  passwordRegex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
  CountryNameValidation: /^[a-zA-Z]{2}$/,
  validateUrl:
    /(http|https):\/\/(\w+:?\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,

  //     //#region REGEX
  // CharValidation: /^[A-Za-z]+$/,
  // FullNameValidation: /^[a-zA-Z ]+$/,
  // EmailValidation: /\S+@\S+\.\S+/,
  // MobileNoValidation:
  //   /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/ /* /^([+]\d{2})?\d{10}$/, */,
  // PasswordValidation: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
  // //#endregion
};
