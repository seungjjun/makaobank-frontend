/* eslint-disable class-methods-use-this */

export default class ApiService {
  async postSession({ accountNumber, password }) {
    if (accountNumber === '1234' && password === 'password') {
      return {
        name: 'Pikachu',
        amount: 100_000,
      };
    }
    throw new Error('Login failed');
  }
}

export const apiService = new ApiService();
