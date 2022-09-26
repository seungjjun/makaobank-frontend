export default class BankStore {
  constructor() {
    this.accountNumber = '';
    this.name = '';
    this.amount = 0;
    this.transactions = [];
  }

  login({ accountNumber, password }) {
    if (accountNumber !== '1234') {
      return;
    }
    // TODO 서버에서 가져와야 함
    this.name = 'Pikachu';
    this.amount = 100_000;
  }
}
