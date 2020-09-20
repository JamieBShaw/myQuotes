import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
};

export type UserFilter = {
  username?: Maybe<Scalars['String']>;
};

export type AuthorFilter = {
  name?: Maybe<Scalars['String']>;
  creatorId?: Maybe<Scalars['ID']>;
  subject?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  favCount?: Maybe<Scalars['Int']>;
  CreatedAt?: Maybe<Scalars['Time']>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  authToken: AuthToken;
  user: User;
};

export type Author = {
  __typename?: 'Author';
  id: Scalars['ID'];
  name: Scalars['String'];
  subject?: Maybe<Scalars['String']>;
  DOB?: Maybe<Scalars['Time']>;
  DOD?: Maybe<Scalars['Time']>;
  favCount: Scalars['Int'];
  quotes: Array<Quote>;
  user: User;
  createdAt: Scalars['Time'];
  updatedAt: Scalars['Time'];
};

export type Quote = {
  __typename?: 'Quote';
  id: Scalars['ID'];
  body: Scalars['String'];
  author: Author;
  dateOf?: Maybe<Scalars['Time']>;
  subject?: Maybe<Scalars['String']>;
  favCount: Scalars['Int'];
  user: User;
  createdAt: Scalars['Time'];
  updatedAt: Scalars['Time'];
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};

export type AuthorCreateInput = {
  name: Scalars['String'];
  DOD?: Maybe<Scalars['String']>;
  DOB?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  user: User;
  users: Array<User>;
  quote: Quote;
  quotes: Array<Quote>;
  author: Author;
  authors: Array<Author>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  filter?: Maybe<UserFilter>;
};


export type QueryQuoteArgs = {
  id: Scalars['ID'];
};


export type QueryQuotesArgs = {
  filter?: Maybe<QuoteFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAuthorArgs = {
  id: Scalars['ID'];
};


export type QueryAuthorsArgs = {
  filter?: Maybe<AuthorFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AuthToken = {
  __typename?: 'AuthToken';
  accessToken: Scalars['String'];
  expiredAt: Scalars['Time'];
};

export type LoginInput = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  isLoggedIn: Scalars['Boolean'];
  favouriteQuotes?: Maybe<Array<Maybe<Quote>>>;
  favouriteAuthors?: Maybe<Array<Maybe<Author>>>;
  createdAt: Scalars['Time'];
  updatedAt: Scalars['Time'];
};

export type QuoteCreateInput = {
  body: Scalars['String'];
  authorId: Scalars['ID'];
  dateOf?: Maybe<Scalars['String']>;
  subject: Scalars['String'];
};

export type EditAuthor = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
};


export type EditQuote = {
  id: Scalars['ID'];
  body?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  dateOf?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
};

export type QuoteFilter = {
  authorId?: Maybe<Scalars['ID']>;
  authorIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  creatorId?: Maybe<Scalars['ID']>;
  subject?: Maybe<Scalars['String']>;
  favCount?: Maybe<Scalars['Int']>;
  dateOf?: Maybe<Scalars['String']>;
  CreatedAt?: Maybe<Scalars['Time']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  registerUser: AuthPayload;
  loginUser: AuthPayload;
  setExpoNotifcationToken: Scalars['Boolean'];
  createQuote: Quote;
  createAuthor: Author;
  editQuoteBody: Quote;
  editQuoteAuthor: Quote;
  editQuoteSubject: Quote;
  editQuoteDateOf: Quote;
  editAuthorName: Author;
  editAuthorSubject: Author;
  editAuthorDOB: Author;
  editAuthorDOD: Author;
  addQuoteToFavourites: Array<Maybe<Quote>>;
  removeQuoteFromFavourites: Array<Maybe<Quote>>;
  addAuthorToFavourites: Array<Maybe<Author>>;
  removeAuthorFromFavourites: Array<Maybe<Author>>;
};


export type MutationRegisterUserArgs = {
  input: RegisterInput;
};


export type MutationLoginUserArgs = {
  input: LoginInput;
};


export type MutationSetExpoNotifcationTokenArgs = {
  id: Scalars['ID'];
};


export type MutationCreateQuoteArgs = {
  input: QuoteCreateInput;
};


export type MutationCreateAuthorArgs = {
  input: AuthorCreateInput;
};


export type MutationEditQuoteBodyArgs = {
  id: Scalars['ID'];
  body: Scalars['String'];
};


export type MutationEditQuoteAuthorArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationEditQuoteSubjectArgs = {
  id: Scalars['ID'];
  subject: Scalars['String'];
};


export type MutationEditQuoteDateOfArgs = {
  id: Scalars['ID'];
  dateOf: Scalars['String'];
};


export type MutationEditAuthorNameArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationEditAuthorSubjectArgs = {
  id: Scalars['ID'];
  subject: Scalars['String'];
};


export type MutationEditAuthorDobArgs = {
  id: Scalars['ID'];
  DOB: Scalars['Time'];
};


export type MutationEditAuthorDodArgs = {
  id: Scalars['ID'];
  DOD: Scalars['Time'];
};


export type MutationAddQuoteToFavouritesArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveQuoteFromFavouritesArgs = {
  id: Scalars['ID'];
};


export type MutationAddAuthorToFavouritesArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveAuthorFromFavouritesArgs = {
  id: Scalars['ID'];
};

export type AddAuthorToUsersFavMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AddAuthorToUsersFavMutation = (
  { __typename?: 'Mutation' }
  & { addAuthorToFavourites: Array<Maybe<(
    { __typename: 'Author' }
    & Pick<Author, 'id' | 'name' | 'DOB' | 'DOD' | 'favCount'>
    & { quotes: Array<(
      { __typename?: 'Quote' }
      & Pick<Quote, 'id' | 'body'>
    )> }
  )>> }
);

export type AddQuoteToUsersFavMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AddQuoteToUsersFavMutation = (
  { __typename?: 'Mutation' }
  & { addQuoteToFavourites: Array<Maybe<(
    { __typename?: 'Quote' }
    & Pick<Quote, 'id' | 'body' | 'subject' | 'favCount'>
    & { author: (
      { __typename?: 'Author' }
      & Pick<Author, 'id' | 'name'>
    ) }
  )>> }
);

export type CreateAuthorMutationVariables = Exact<{
  input: AuthorCreateInput;
}>;


export type CreateAuthorMutation = (
  { __typename?: 'Mutation' }
  & { createAuthor: (
    { __typename?: 'Author' }
    & Pick<Author, 'id' | 'name' | 'favCount' | 'DOB' | 'DOD'>
  ) }
);

export type CreateQuoteMutationVariables = Exact<{
  input: QuoteCreateInput;
}>;


export type CreateQuoteMutation = (
  { __typename?: 'Mutation' }
  & { createQuote: (
    { __typename?: 'Quote' }
    & Pick<Quote, 'id' | 'favCount' | 'subject' | 'dateOf'>
    & { author: (
      { __typename?: 'Author' }
      & Pick<Author, 'id' | 'name'>
    ) }
  ) }
);

export type LoginUserMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginUserMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: (
    { __typename?: 'AuthPayload' }
    & { authToken: (
      { __typename?: 'AuthToken' }
      & Pick<AuthToken, 'accessToken' | 'expiredAt'>
    ), user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'isLoggedIn'>
      & { favouriteQuotes?: Maybe<Array<Maybe<(
        { __typename?: 'Quote' }
        & Pick<Quote, 'id' | 'body' | 'favCount' | 'subject' | 'createdAt' | 'updatedAt'>
        & { author: (
          { __typename?: 'Author' }
          & Pick<Author, 'id' | 'name'>
        ) }
      )>>>, favouriteAuthors?: Maybe<Array<Maybe<(
        { __typename?: 'Author' }
        & Pick<Author, 'id' | 'name' | 'DOB' | 'DOD' | 'favCount'>
        & { quotes: Array<(
          { __typename?: 'Quote' }
          & Pick<Quote, 'id' | 'body'>
        )> }
      )>>> }
    ) }
  ) }
);

export type RegisterUserMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'AuthPayload' }
    & { authToken: (
      { __typename?: 'AuthToken' }
      & Pick<AuthToken, 'accessToken' | 'expiredAt'>
    ), user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'isLoggedIn'>
      & { favouriteQuotes?: Maybe<Array<Maybe<(
        { __typename?: 'Quote' }
        & Pick<Quote, 'id' | 'body' | 'favCount' | 'subject' | 'createdAt' | 'updatedAt'>
        & { author: (
          { __typename?: 'Author' }
          & Pick<Author, 'id' | 'name'>
        ) }
      )>>>, favouriteAuthors?: Maybe<Array<Maybe<(
        { __typename?: 'Author' }
        & Pick<Author, 'id' | 'name' | 'DOB' | 'DOD' | 'favCount'>
        & { quotes: Array<(
          { __typename?: 'Quote' }
          & Pick<Quote, 'id' | 'body'>
        )> }
      )>>> }
    ) }
  ) }
);

export type RemoveAuthorFromUsersFavMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveAuthorFromUsersFavMutation = (
  { __typename?: 'Mutation' }
  & { removeAuthorFromFavourites: Array<Maybe<(
    { __typename: 'Author' }
    & Pick<Author, 'id' | 'name' | 'DOB' | 'DOD' | 'favCount'>
    & { quotes: Array<(
      { __typename?: 'Quote' }
      & Pick<Quote, 'id' | 'body'>
    )> }
  )>> }
);

export type RemoveQuoteFromUsersFavMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveQuoteFromUsersFavMutation = (
  { __typename?: 'Mutation' }
  & { removeQuoteFromFavourites: Array<Maybe<(
    { __typename: 'Quote' }
    & Pick<Quote, 'id' | 'body' | 'subject' | 'favCount'>
    & { author: (
      { __typename?: 'Author' }
      & Pick<Author, 'id' | 'name'>
    ) }
  )>> }
);

export type GetAuthorsQueryVariables = Exact<{
  input: AuthorFilter;
}>;


export type GetAuthorsQuery = (
  { __typename?: 'Query' }
  & { authors: Array<(
    { __typename: 'Author' }
    & Pick<Author, 'id' | 'name' | 'DOB' | 'DOD' | 'favCount'>
    & { quotes: Array<(
      { __typename?: 'Quote' }
      & Pick<Quote, 'id' | 'body'>
    )> }
  )> }
);

export type GetQuoteQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetQuoteQuery = (
  { __typename?: 'Query' }
  & { quote: (
    { __typename: 'Quote' }
    & Pick<Quote, 'id' | 'body' | 'favCount'>
    & { author: (
      { __typename?: 'Author' }
      & Pick<Author, 'name' | 'id'>
    ) }
  ) }
);

export type GetQuotesQueryVariables = Exact<{
  input: QuoteFilter;
}>;


export type GetQuotesQuery = (
  { __typename?: 'Query' }
  & { quotes: Array<(
    { __typename: 'Quote' }
    & Pick<Quote, 'id' | 'body' | 'subject' | 'favCount'>
    & { author: (
      { __typename?: 'Author' }
      & Pick<Author, 'id' | 'name'>
    ) }
  )> }
);

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'createdAt' | 'updatedAt' | 'isLoggedIn'>
  ) }
);


export const AddAuthorToUsersFavDocument = gql`
    mutation AddAuthorToUsersFav($id: ID!) {
  addAuthorToFavourites(id: $id) {
    __typename
    id
    name
    DOB
    DOD
    quotes {
      id
      body
    }
    favCount
  }
}
    `;
export type AddAuthorToUsersFavMutationFn = Apollo.MutationFunction<AddAuthorToUsersFavMutation, AddAuthorToUsersFavMutationVariables>;

/**
 * __useAddAuthorToUsersFavMutation__
 *
 * To run a mutation, you first call `useAddAuthorToUsersFavMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAuthorToUsersFavMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAuthorToUsersFavMutation, { data, loading, error }] = useAddAuthorToUsersFavMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddAuthorToUsersFavMutation(baseOptions?: Apollo.MutationHookOptions<AddAuthorToUsersFavMutation, AddAuthorToUsersFavMutationVariables>) {
        return Apollo.useMutation<AddAuthorToUsersFavMutation, AddAuthorToUsersFavMutationVariables>(AddAuthorToUsersFavDocument, baseOptions);
      }
export type AddAuthorToUsersFavMutationHookResult = ReturnType<typeof useAddAuthorToUsersFavMutation>;
export type AddAuthorToUsersFavMutationResult = Apollo.MutationResult<AddAuthorToUsersFavMutation>;
export type AddAuthorToUsersFavMutationOptions = Apollo.BaseMutationOptions<AddAuthorToUsersFavMutation, AddAuthorToUsersFavMutationVariables>;
export const AddQuoteToUsersFavDocument = gql`
    mutation AddQuoteToUsersFav($id: ID!) {
  addQuoteToFavourites(id: $id) {
    id
    body
    subject
    author {
      id
      name
    }
    favCount
  }
}
    `;
export type AddQuoteToUsersFavMutationFn = Apollo.MutationFunction<AddQuoteToUsersFavMutation, AddQuoteToUsersFavMutationVariables>;

/**
 * __useAddQuoteToUsersFavMutation__
 *
 * To run a mutation, you first call `useAddQuoteToUsersFavMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddQuoteToUsersFavMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addQuoteToUsersFavMutation, { data, loading, error }] = useAddQuoteToUsersFavMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddQuoteToUsersFavMutation(baseOptions?: Apollo.MutationHookOptions<AddQuoteToUsersFavMutation, AddQuoteToUsersFavMutationVariables>) {
        return Apollo.useMutation<AddQuoteToUsersFavMutation, AddQuoteToUsersFavMutationVariables>(AddQuoteToUsersFavDocument, baseOptions);
      }
export type AddQuoteToUsersFavMutationHookResult = ReturnType<typeof useAddQuoteToUsersFavMutation>;
export type AddQuoteToUsersFavMutationResult = Apollo.MutationResult<AddQuoteToUsersFavMutation>;
export type AddQuoteToUsersFavMutationOptions = Apollo.BaseMutationOptions<AddQuoteToUsersFavMutation, AddQuoteToUsersFavMutationVariables>;
export const CreateAuthorDocument = gql`
    mutation CreateAuthor($input: AuthorCreateInput!) {
  createAuthor(input: $input) {
    id
    name
    favCount
    DOB
    DOD
  }
}
    `;
export type CreateAuthorMutationFn = Apollo.MutationFunction<CreateAuthorMutation, CreateAuthorMutationVariables>;

/**
 * __useCreateAuthorMutation__
 *
 * To run a mutation, you first call `useCreateAuthorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAuthorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAuthorMutation, { data, loading, error }] = useCreateAuthorMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAuthorMutation(baseOptions?: Apollo.MutationHookOptions<CreateAuthorMutation, CreateAuthorMutationVariables>) {
        return Apollo.useMutation<CreateAuthorMutation, CreateAuthorMutationVariables>(CreateAuthorDocument, baseOptions);
      }
export type CreateAuthorMutationHookResult = ReturnType<typeof useCreateAuthorMutation>;
export type CreateAuthorMutationResult = Apollo.MutationResult<CreateAuthorMutation>;
export type CreateAuthorMutationOptions = Apollo.BaseMutationOptions<CreateAuthorMutation, CreateAuthorMutationVariables>;
export const CreateQuoteDocument = gql`
    mutation CreateQuote($input: QuoteCreateInput!) {
  createQuote(input: $input) {
    id
    favCount
    subject
    dateOf
    author {
      id
      name
    }
  }
}
    `;
export type CreateQuoteMutationFn = Apollo.MutationFunction<CreateQuoteMutation, CreateQuoteMutationVariables>;

/**
 * __useCreateQuoteMutation__
 *
 * To run a mutation, you first call `useCreateQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuoteMutation, { data, loading, error }] = useCreateQuoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateQuoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuoteMutation, CreateQuoteMutationVariables>) {
        return Apollo.useMutation<CreateQuoteMutation, CreateQuoteMutationVariables>(CreateQuoteDocument, baseOptions);
      }
export type CreateQuoteMutationHookResult = ReturnType<typeof useCreateQuoteMutation>;
export type CreateQuoteMutationResult = Apollo.MutationResult<CreateQuoteMutation>;
export type CreateQuoteMutationOptions = Apollo.BaseMutationOptions<CreateQuoteMutation, CreateQuoteMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($input: LoginInput!) {
  loginUser(input: $input) {
    authToken {
      accessToken
      expiredAt
    }
    user {
      id
      username
      email
      isLoggedIn
      favouriteQuotes {
        id
        body
        favCount
        author {
          id
          name
        }
        subject
        createdAt
        updatedAt
      }
      favouriteAuthors {
        id
        name
        DOB
        DOD
        favCount
        quotes {
          id
          body
        }
      }
    }
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, baseOptions);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($input: RegisterInput!) {
  registerUser(input: $input) {
    authToken {
      accessToken
      expiredAt
    }
    user {
      id
      username
      email
      isLoggedIn
      favouriteQuotes {
        id
        body
        favCount
        author {
          id
          name
        }
        subject
        createdAt
        updatedAt
      }
      favouriteAuthors {
        id
        name
        DOB
        DOD
        favCount
        quotes {
          id
          body
        }
      }
    }
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, baseOptions);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const RemoveAuthorFromUsersFavDocument = gql`
    mutation RemoveAuthorFromUsersFav($id: ID!) {
  removeAuthorFromFavourites(id: $id) {
    __typename
    id
    name
    DOB
    DOD
    quotes {
      id
      body
    }
    favCount
  }
}
    `;
export type RemoveAuthorFromUsersFavMutationFn = Apollo.MutationFunction<RemoveAuthorFromUsersFavMutation, RemoveAuthorFromUsersFavMutationVariables>;

/**
 * __useRemoveAuthorFromUsersFavMutation__
 *
 * To run a mutation, you first call `useRemoveAuthorFromUsersFavMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAuthorFromUsersFavMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAuthorFromUsersFavMutation, { data, loading, error }] = useRemoveAuthorFromUsersFavMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveAuthorFromUsersFavMutation(baseOptions?: Apollo.MutationHookOptions<RemoveAuthorFromUsersFavMutation, RemoveAuthorFromUsersFavMutationVariables>) {
        return Apollo.useMutation<RemoveAuthorFromUsersFavMutation, RemoveAuthorFromUsersFavMutationVariables>(RemoveAuthorFromUsersFavDocument, baseOptions);
      }
export type RemoveAuthorFromUsersFavMutationHookResult = ReturnType<typeof useRemoveAuthorFromUsersFavMutation>;
export type RemoveAuthorFromUsersFavMutationResult = Apollo.MutationResult<RemoveAuthorFromUsersFavMutation>;
export type RemoveAuthorFromUsersFavMutationOptions = Apollo.BaseMutationOptions<RemoveAuthorFromUsersFavMutation, RemoveAuthorFromUsersFavMutationVariables>;
export const RemoveQuoteFromUsersFavDocument = gql`
    mutation RemoveQuoteFromUsersFav($id: ID!) {
  removeQuoteFromFavourites(id: $id) {
    __typename
    id
    body
    subject
    author {
      id
      name
    }
    favCount
  }
}
    `;
export type RemoveQuoteFromUsersFavMutationFn = Apollo.MutationFunction<RemoveQuoteFromUsersFavMutation, RemoveQuoteFromUsersFavMutationVariables>;

/**
 * __useRemoveQuoteFromUsersFavMutation__
 *
 * To run a mutation, you first call `useRemoveQuoteFromUsersFavMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveQuoteFromUsersFavMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeQuoteFromUsersFavMutation, { data, loading, error }] = useRemoveQuoteFromUsersFavMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveQuoteFromUsersFavMutation(baseOptions?: Apollo.MutationHookOptions<RemoveQuoteFromUsersFavMutation, RemoveQuoteFromUsersFavMutationVariables>) {
        return Apollo.useMutation<RemoveQuoteFromUsersFavMutation, RemoveQuoteFromUsersFavMutationVariables>(RemoveQuoteFromUsersFavDocument, baseOptions);
      }
export type RemoveQuoteFromUsersFavMutationHookResult = ReturnType<typeof useRemoveQuoteFromUsersFavMutation>;
export type RemoveQuoteFromUsersFavMutationResult = Apollo.MutationResult<RemoveQuoteFromUsersFavMutation>;
export type RemoveQuoteFromUsersFavMutationOptions = Apollo.BaseMutationOptions<RemoveQuoteFromUsersFavMutation, RemoveQuoteFromUsersFavMutationVariables>;
export const GetAuthorsDocument = gql`
    query GetAuthors($input: AuthorFilter!) {
  authors(filter: $input) {
    __typename
    id
    name
    DOB
    DOD
    favCount
    quotes {
      id
      body
    }
  }
}
    `;

/**
 * __useGetAuthorsQuery__
 *
 * To run a query within a React component, call `useGetAuthorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthorsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAuthorsQuery(baseOptions?: Apollo.QueryHookOptions<GetAuthorsQuery, GetAuthorsQueryVariables>) {
        return Apollo.useQuery<GetAuthorsQuery, GetAuthorsQueryVariables>(GetAuthorsDocument, baseOptions);
      }
export function useGetAuthorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthorsQuery, GetAuthorsQueryVariables>) {
          return Apollo.useLazyQuery<GetAuthorsQuery, GetAuthorsQueryVariables>(GetAuthorsDocument, baseOptions);
        }
export type GetAuthorsQueryHookResult = ReturnType<typeof useGetAuthorsQuery>;
export type GetAuthorsLazyQueryHookResult = ReturnType<typeof useGetAuthorsLazyQuery>;
export type GetAuthorsQueryResult = Apollo.QueryResult<GetAuthorsQuery, GetAuthorsQueryVariables>;
export const GetQuoteDocument = gql`
    query GetQuote($id: ID!) {
  quote(id: $id) {
    __typename
    id
    body
    author {
      name
      id
    }
    favCount
  }
}
    `;

/**
 * __useGetQuoteQuery__
 *
 * To run a query within a React component, call `useGetQuoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuoteQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetQuoteQuery(baseOptions?: Apollo.QueryHookOptions<GetQuoteQuery, GetQuoteQueryVariables>) {
        return Apollo.useQuery<GetQuoteQuery, GetQuoteQueryVariables>(GetQuoteDocument, baseOptions);
      }
export function useGetQuoteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuoteQuery, GetQuoteQueryVariables>) {
          return Apollo.useLazyQuery<GetQuoteQuery, GetQuoteQueryVariables>(GetQuoteDocument, baseOptions);
        }
export type GetQuoteQueryHookResult = ReturnType<typeof useGetQuoteQuery>;
export type GetQuoteLazyQueryHookResult = ReturnType<typeof useGetQuoteLazyQuery>;
export type GetQuoteQueryResult = Apollo.QueryResult<GetQuoteQuery, GetQuoteQueryVariables>;
export const GetQuotesDocument = gql`
    query GetQuotes($input: QuoteFilter!) {
  quotes(filter: $input) {
    __typename
    id
    body
    subject
    author {
      id
      name
    }
    favCount
  }
}
    `;

/**
 * __useGetQuotesQuery__
 *
 * To run a query within a React component, call `useGetQuotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuotesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetQuotesQuery(baseOptions?: Apollo.QueryHookOptions<GetQuotesQuery, GetQuotesQueryVariables>) {
        return Apollo.useQuery<GetQuotesQuery, GetQuotesQueryVariables>(GetQuotesDocument, baseOptions);
      }
export function useGetQuotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuotesQuery, GetQuotesQueryVariables>) {
          return Apollo.useLazyQuery<GetQuotesQuery, GetQuotesQueryVariables>(GetQuotesDocument, baseOptions);
        }
export type GetQuotesQueryHookResult = ReturnType<typeof useGetQuotesQuery>;
export type GetQuotesLazyQueryHookResult = ReturnType<typeof useGetQuotesLazyQuery>;
export type GetQuotesQueryResult = Apollo.QueryResult<GetQuotesQuery, GetQuotesQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: ID!) {
  user(id: $id) {
    __typename
    id
    username
    email
    createdAt
    updatedAt
    isLoggedIn
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;