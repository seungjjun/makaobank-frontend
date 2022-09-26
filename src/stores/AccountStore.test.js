import AccountStore from './AccountStore';

describe('AccountStore', () => {
  test('create with all attributes', () => {
    const accountStore = new AccountStore({
      account: '12345678',
      amount: 1_000,
      transacions: [],
    });

    expect(accountStore.account).toBe('12345678');
    expect(accountStore.amount).toBe(1000);
    expect(accountStore.transactions).toEqual([]);
  });

  test('create with only account', () => {
    const accountStore = new AccountStore({
      account: '12345678',
    });

    expect(accountStore.account).toBe('12345678');
    expect(accountStore.amount).toBe(0);
    expect(accountStore.transactions).toEqual([]);
  });
});
