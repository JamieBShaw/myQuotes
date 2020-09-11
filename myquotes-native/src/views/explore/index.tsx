import React from "react";
import { View, Keyboard } from "react-native";
import { styles } from "./styles";
import { Header } from "../../components/Header";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { SearchInput } from "../../components/Search";

const Explore: React.FC = () => {
  return (
    <View style={styles.screen}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.mainContainer}>
          <Header title="Search" />
          <View style={styles.searchContainer}>
            <SearchInput />
          </View>

          {/* <View
            style={{
              backgroundColor: "#a5cfb0",
              marginTop: 20,
              paddingTop: 20,
              height: "80%",
              width: "95%",
            }}
          >
            <View
              style={{
                height: 80,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  height: 70,
                  width: "90%",
                  backgroundColor: "grey",
                  borderRadius: 10,
                }}
              ></View>
            </View>
          </View> */}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Explore;
