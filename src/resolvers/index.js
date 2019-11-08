import { range } from 'ramda';
import fetch from 'node-fetch';


const postResolver = {
  Query: {
    post: async (parent, { id }) => ({ id, title: 'title', content: 'NT' }),
    posts: async (parent, { n }) => {
      // const posts = range(1, n + 1);
      const posts = [6, 3, 4, 6];
      return posts.map((id) => ({ id, title: `post ${id}`, content: 'My book' }));
    },
  },

  Post: {
    author: async ({ id }, args, { models }, info) => {
      const fetchObj = await fetch('http://localhost:3001/account/6');
      const { firstName, lastName } = await fetchObj.json();
      const user = `${firstName} ${lastName}`;
      return user;
    },
    authorV2: async ({ id }, args, { dataSources: { userAPI } }) => {
      try {
        const userFromAPI = await userAPI.getUser(id);
        if (!userFromAPI) return null;
        const { firstName, lastName } = userFromAPI;
        const user = `${firstName} ${lastName}`;
        return user;
      } catch (error) {
        return '';
      }
    },
    authorV3: async ({ id }, args, { dataSources: { userAPI } }) => {
      const userFromAPI = await userAPI.getUsersCached(id);
      if (!userFromAPI) return null;
      const { firstName, lastName } = userFromAPI;
      const user = `${firstName} ${lastName}`;
      return user;
    },
  },
};

export default [postResolver];
