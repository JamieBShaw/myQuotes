import React from "react";
import { Text, View } from "react-native";
import { useGetUserQuery } from "../../generated/graphql";

export const LoginView: React.FC = () => {
  const { loading, error, data } = useGetUserQuery({
    variables: {
      id: "1",
    },
  });
  if (loading || !data) return null;
  if (error) return null;
  if (data) {
    console.log(data);
  }
  return (
          <Text> Login View</Text>
  );
};
