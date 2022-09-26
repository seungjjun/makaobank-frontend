/* eslint-disable class-methods-use-this */
import axios from 'axios';

const baseUrl = 'http://localhost:8000';

export default class ApiService {
  async postSession({ accountNumber, password }) {
    const url = `${baseUrl}/session`;
    const { data } = await axios.post(url, { accountNumber, password });
    return {
      accessToken: data.accessToken,
      name: data.name,
      amount: data.amoun,
    };
  }
}

export const apiService = new ApiService();
