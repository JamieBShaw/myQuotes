import { QuoteData, AuthorData } from "../interfaces";
import { IUser } from "../../state/context/auth";

export const likedByUser = (
  item: QuoteData | AuthorData,
  user: IUser
): boolean => {
  if (isQuoteData(item)) {
    if (user && user.favouriteQuotes?.find((q) => item?.id === q?.id)) {
      return true;
    } else {
      return false;
    }
  } else {
    if (user && user.favouriteAuthors?.find((a) => item.id === a?.id)) {
      return true;
    } else {
      return false;
    }
  }
};

const isQuoteData = (item: any): item is QuoteData => {
  return true;
};
