import { RESTDataSource } from 'apollo-datasource-rest';
import DataLoader from 'dataloader';

export default class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3001/';
    this.progressLoader = new DataLoader(async (ids) => {
      console.log('progressLoader', ids);
      const allUsers = await this.getUsers();
      return ids.map((id) => allUsers.find((progress) => progress.id === id));
    });
  }

  async getUser(id) {
    return this.get(`account/${id}`);
  }

  async getUsers() {
    return this.get('users');
  }

  // progressLoader

  async getUsersCached(id) {
    console.log('getUsersCached', id);
    return this.progressLoader.load(id);
  }
}
