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
import { AuthorList } from "../../../components/AuthorList";

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
    console.log("event: ", event);
    const currentDate: Date = selectedDate || date;
    console.log("currentDate:  ", currentDate);
    setDate(currentDate);
    setDateString(moment(currentDate).format("YYYY-MM-DD"));
    setShow(false);
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
        {/* <Header title="Create..." signOut /> */}
        <View style={styles.innerContainer}>
          <AppTextInput
            name="authorName"
            value={authorName}
            onCustomChange={handleInputs}
          />
          <AppButton text="Select Date" onPress={() => setShow(!show)} />
          <View>
            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onHandleDateChange}
              />
            )}
          </View>
          <View>
            <Text>{dateString}</Text>
          </View>

          <AppButton text="create" onPress={handleCreate} />
          <AuthorList
            authorData={data?.authors}
            handleRefetch={refetch}
            loading={loading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateAuthorView;

// 2006-01-02T15:04:05Z07:00
