function isValidEmail(email) {
  //from https://gist.github.com/badsyntax/719800
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function isValidPassword(password) {
  return password.length >= 6 && password.length <= 40;
}

function isValidPhoneNumber(phoneNumber) {
  const phoneRegexp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]*$/;

  return phoneRegexp.test(phoneNumber);
}

function fileIsImage(filePath) {
  const supportedFiles = ['jpeg', 'jpg', 'gif', 'png', 'bmp'];

  return supportedFiles.includes(filePath.split('.').pop());
}

function isText(text) {
  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  const trimed = text.trim();

  if (trimed.length === 0) {
    return false;
  }

  return !specialCharacters.test(trimed);
}

function trimObject(obj) {
  Object.keys(obj).forEach(k => {
    const elem = obj[k];
    if (typeof elem === 'string') obj[k] = elem.trim();
  });
}

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
  fileIsImage,
  isText,
  trimObject
};
