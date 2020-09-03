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

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};


export type AuthPayload = {
  __typename?: 'AuthPayload';
  authToken: AuthToken;
  user: User;
};

export type AuthToken = {
  __typename?: 'AuthToken';
  accessToken: Scalars['String'];
  expiredAt: Scalars['Time'];
};

export type AuthorFilter = {
  name?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
};

export type Quote = {
  __typename?: 'Quote';
  id: Scalars['ID'];
  body: Scalars['String'];
  author: Author;
  dateOf?: Maybe<Scalars['Time']>;
  subject?: Maybe<Scalars['String']>;
  user: User;
  createdAt: Scalars['Time'];
  updatedAt: Scalars['Time'];
};

export type QuoteCreateInput = {
  body: Scalars['String'];
  authorId: Scalars['ID'];
  dateOf: Scalars['Time'];
  subject: Scalars['String'];
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
};


export type QueryAuthorArgs = {
  id: Scalars['ID'];
};


export type QueryAuthorsArgs = {
  filter?: Maybe<AuthorFilter>;
};

export type AuthorCreateInput = {
  name: Scalars['String'];
  DOD: Scalars['Time'];
  DOB: Scalars['Time'];
};

export type EditAuthor = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
};

export type Author = {
  __typename?: 'Author';
  id: Scalars['ID'];
  name: Scalars['String'];
  subject?: Maybe<Scalars['String']>;
  DOB: Scalars['Time'];
  DOD: Scalars['Time'];
  quotes: Array<Quote>;
  user: User;
  createdAt: Scalars['Time'];
  updatedAt: Scalars['Time'];
};

export type QuoteFilter = {
  authorId?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['ID']>;
  subject?: Maybe<Scalars['String']>;
};

export type EditQuote = {
  id: Scalars['ID'];
  body?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  dateOf?: Maybe<Scalars['Time']>;
  subject?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registerUser: AuthPayload;
  loginUser: AuthPayload;
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
};


export type MutationRegisterUserArgs = {
  input: RegisterInput;
};


export type MutationLoginUserArgs = {
  input: LoginInput;
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

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  isLoggedIn: Scalars['Boolean'];
  createdAt: Scalars['Time'];
  updatedAt: Scalars['Time'];
};

export type UserFilter = {
  username?: Maybe<Scalars['String']>;
};

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
      & Pick<User, 'id' | 'username' | 'email' | 'password'>
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
      & Pick<User, 'id' | 'username' | 'email' | 'password'>
    ) }
  ) }
);

export type GetQuotesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetQuotesQuery = (
  { __typename?: 'Query' }
  & { quotes: Array<(
    { __typename?: 'Quote' }
    & Pick<Quote, 'id' | 'body'>
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
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'createdAt' | 'updatedAt' | 'isLoggedIn'>
  ) }
);


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
      password
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
      password
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
export const GetQuotesDocument = gql`
    query GetQuotes {
  quotes(filter: {}) {
    id
    body
    author {
      id
      name
    }
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