/* eslint-disable class-methods-use-this */

export default class ApiService {
  async postSession({ accountNumber, password }) {
    if (accountNumber === '1234' && password === 'password') {
      return {
        accessToken: 'ACCESS.TOKEN',
        name: 'Pikachu',
        amount: 3_000,
      };
    }
    throw new Error('Login failed');
  }
}

export const apiService = new ApiService();
