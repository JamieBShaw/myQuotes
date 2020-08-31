import { PORT, URI } from "react-native-dotenv";

interface Config {
  PORT: string;
  URI: string;
}

const config: Config = {
  PORT,
  URI,
};

export default config;
