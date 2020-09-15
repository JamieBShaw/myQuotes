// import { GetAuthorsQuery } from "../../generated/graphql";
// import { QuoteData } from "../interfaces";

// let quoteArr: QuoteData[] = [];

// export const formAtAuthorData = (authorData: GetAuthorsQuery): QuoteData[] => {
//   authorData.authors.map((a) => {
//     let { id, name } = a;

//     a.quotes.map((q) => {
//       let res: QuoteData = {
//         id: q.id,
//         body: q.body,
//         favCount: q.favCount,
//         author: { id: id, name: name },
//       };
//       quoteArr = [...quoteArr, res];
//     });
//   });

//   return quoteArr;
// };
