import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schemas from './schemas';
import resolvers from './resolvers';
import dataSources from './data-sources';


const app = express();
app.use(cors());

const getUser = async () => ({ id: 1, name: 'Mr. wonderful' });

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  dataSources,
  context: async ({ req }) => {
    if (req) {
      const me = await getUser(req);

      return {
        me,
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(9090, () => {
  console.log('connected in port 9090');
});
