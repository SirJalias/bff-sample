import { gql } from 'apollo-server';


const linkSchema = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: String!
    authorV2: String
    authorV3: String
  }

  type Query {
    post(id: ID!): Post!
    posts(n: Int!): [Post!]!
  }
  type Mutation {
    _: Boolean
  }
  
`;

export default [linkSchema];
