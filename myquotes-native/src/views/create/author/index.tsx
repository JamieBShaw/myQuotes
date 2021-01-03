import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  useCreateAuthorMutation,
  useGetAuthorsQuery,
} from "../../../generated/graphql";
import moment from "moment";

import { styles } from "./styles";
import { AppButton } from "../../../components/AppButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppTextInput } from "../../../components/AppTextInput";
import { AuthContext } from "../../../state/context/auth";

import { Header } from "../../../components/Header";

// useState AuthorCreateInput

const CreateAuthorView: React.FC = () => {
  const { user } = useContext(AuthContext);

  const [authorName, setAuthorName] = useState<string>("");
  const [dateString, setDateString] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const { data, loading, error, refetch } = useGetAuthorsQuery({
    variables: {
      input: {
        creatorId: user.id,
      },
    },
  });

  if (error) {
    console.log("Error:  ", error);
  }

  const [createAuthor] = useCreateAuthorMutation({
    onCompleted: () => console.log("author created"),
  });

  const onHandleDateChange = (event: any, selectedDate?: any): void => {
    const currentDate: Date = selectedDate || date;
    setShow(false);

    setDate(currentDate);
    setDateString(moment(currentDate).format("YYYY-MM-DD"));
  };

  const handleCreate = () => {
    createAuthor({
      variables: {
        input: {
          name: authorName,
          DOB: dateString,
          DOD: dateString,
        },
      },
    }).then(({ data }) => {
      console.log(data?.createAuthor.id);
    });
  };

  const handleInputs = (event: { name: string; text: string }): void => {
    setAuthorName(event.text);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.outerContainer}>
        <Header title="Create..." signOut />
        <View style={styles.innerContainer}>
          <AppTextInput
            styles={styles.input}
            name="authorName"
            value={authorName}
            placeholder="Authors Name"
            onCustomChange={handleInputs}
            style={{ borderBottomWidth: 1 }}
          />
          <AppButton
            style={styles.input}
            text="Select Date authors Date of Birth: "
            onPress={() => setShow(true)}
          />
          <View style={styles.input}>
            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onHandleDateChange}
              />
            )}
          </View>
          <View style={styles.input}>
            <Text style={{ fontSize: 14 }}>{dateString}</Text>
          </View>

          <AppButton
            style={styles.input}
            text="create"
            onPress={handleCreate}
          />
          {/* <AuthorList
            authorData={data?.authors}
            handleRefetch={refetch}
            loading={loading}
          /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateAuthorView;

// 2006-01-02T15:04:05Z07:00
