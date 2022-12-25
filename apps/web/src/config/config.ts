export default {
  enableAuthFirebase: true,
  firebase: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  },
  enableAuthFirebaseLink: false,
  firebaseLinkConfig: {
    key: "A",
    loginUrl:
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
    signUpUrl: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
  },
  enableAuthCognito: false,
  cognito: {
    key: "",
  },
  enableAuthServer: false,
};
