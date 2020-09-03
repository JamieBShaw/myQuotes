import Constants from "expo-constants";

const PORT = "8080";
const URI = "192.168.0.189";

const ENV = {
  dev: {
    port: PORT,
    uri: URI,
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  }
};

export default getEnvVars;
