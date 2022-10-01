export default class TransferStore {
  constructor() {
    this.amounts = {
      12345678: 2_000,
      56789012: 0,
    };
  }

  amount(account) {
    return this.amounts[account];
  }

  transfer(from, to, amount) {
    if (amount > this.amounts[from]) {
      return;
    }
    this.amounts[from] -= amount;
    this.amounts[to] += amount;
  }
}
