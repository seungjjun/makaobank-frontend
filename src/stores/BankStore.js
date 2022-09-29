import { apiService } from '../services/ApiService';

export default class BankStore {
  constructor() {
    this.listeners = new Set();

    this.accountNumber = '';
    this.name = '';
    this.amount = 0;
    this.transactions = [];

    this.transferState = '';

    this.loginState = '';

    this.registrationState = '';

    this.errorMessage = '';
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  publish() {
    this.listeners.forEach((listener) => listener());
  }

  async login({ accountNumber, password }) {
    try {
      const { accessToken, name, amount } = await apiService.postSession({
        accountNumber, password,
      });

      this.name = name;
      this.amount = amount;

      return accessToken;
    } catch (e) {
      const { message } = e.response.data;
      this.changeLoginState('fail', { errorMessage: message });
      return '';
    }
  }

  async register({
    name, accountNumber, password, confirmPassword,
  }) {
    try {
      await apiService.createAccount({
        name, accountNumber, password, confirmPassword,
      });
    } catch (e) {
      const { message } = e.response.data;
      this.changeRegistrationState('existing', { errorMessage: message });
    }
  }

  async fetchAccount() {
    const { name, accountNumber, amount } = await apiService.fetchAccount();

    this.name = name;
    this.accountNumber = accountNumber;
    this.amount = amount;

    this.publish();
  }

  async requestTransfer({ to, amount, name }) {
    this.changeTransferState('processing');

    try {
      await apiService.createTransaction({ to, amount, name });
      this.changeTransferState('success');
    } catch (e) {
      const { message } = e.response.data;
      if (message === '잘못된 계좌번호입니다. 다시 입력해주세요') {
        this.changeTransferState('nonexistent', { errorMessage: message });
      }

      if (message === '계좌 잔액이 부족합니다') {
        this.changeTransferState('insufficient', { errorMessage: message });
      }

      if (message === '본인의 계좌입니다. 다시 입력해주세요') {
        this.changeTransferState('myAccount', { errorMessage: message });
      }
    }
  }

  changeLoginState(state, { errorMessage = '' } = {}) {
    this.errorMessage = errorMessage;
    this.loginState = state;
    this.publish();
  }

  changeRegistrationState(state, { errorMessage = '' } = {}) {
    this.errorMessage = errorMessage;
    this.registrationState = state;
    this.publish();
  }

  changeTransferState(state, { errorMessage = '' } = {}) {
    this.errorMessage = errorMessage;
    this.transferState = state;
    this.publish();
  }

  async fetchTransactions() {
    this.transactions = [];
    this.publish();

    this.transactions = await apiService.fetchTransactions();
    this.publish();
  }

  get isTransferProcessing() {
    return this.transferState === 'processing';
  }

  get isTransferSuccess() {
    return this.transferState === 'success';
  }

  get isTransferFail() {
    return this.transferState === 'fail';
  }

  get isEnoughAmount() {
    return this.transferState === 'insufficient';
  }

  get isExistentId() {
    return this.transferState === 'nonexistent';
  }

  get isMyAccount() {
    return this.transferState === 'myAccount';
  }

  get isExistingAccountnumber() {
    return this.registrationState === 'existing';
  }

  get isLoginFail() {
    return this.loginState === 'fail';
  }
}

export const bankStore = new BankStore();
