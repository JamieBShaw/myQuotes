import React, { useState } from "react";
import { View, Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
// import * as Notifications from "expo-notifications";
// import * as Permissions from "expo-permissions";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  useGetQuotesQuery,
  useGetAuthorsLazyQuery,
} from "../../generated/graphql";
import _ from "lodash";
import { SearchInput } from "../../components/Search";
import { Header } from "../../components/Header";
import { QuoteList } from "../../components/QuoteList";
import { styles } from "./styles";

const Home: React.FC = () => {
  const [authorName, setAuthorName] = useState<string | undefined>(undefined);
  const [authorIds, setAuthorIds] = useState<string[] | undefined>(undefined);

  const { data, loading, refetch } = useGetQuotesQuery({
    fetchPolicy: "no-cache",
    variables: {
      input: {
        authorIds: authorIds,
      },
    },
  });

  const [getAuthorsIds] = useGetAuthorsLazyQuery({
    fetchPolicy: "network-only",
    onCompleted: ({ authors }) => {
      let ids: string[] = [];
      authors.forEach((author) => {
        ids.push(author.id);
      });

      setAuthorIds(ids);
    },
  });

  const searchFilter = _.debounce(() => {
    getAuthorsIds({
      variables: {
        input: {
          name: authorName,
        },
      },
    });
  }, 350);

  const handleSearchInput = (event: { name: string; text: string }): void => {
    event.text.toLowerCase().trim();
    setAuthorName(event.text);

    if (
      authorName === "" ||
      authorName === undefined ||
      authorName.length < 3
    ) {
      setAuthorIds(undefined);
    }

    if (authorName && authorName.length >= 3) {
      searchFilter();
    }
  };

  return (
    <SafeAreaView style={{ ...styles.screen, paddingBottom: 0 }}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.outerContainer}>
          <Header signOut />
          <View style={styles.innerContainer}>
            <View style={styles.searchContainer}>
              <SearchInput
                searchBy={"Author"}
                onCustomChange={handleSearchInput}
                name="search"
                values={authorName}
              />
            </View>
            <QuoteList
              loading={loading}
              quotesData={data?.quotes}
              handleRefetch={refetch}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Home;
