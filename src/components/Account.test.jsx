import { render, screen } from '@testing-library/react';

import { bankStore } from '../stores/BankStore';

import Account from './Account';

test('Account', async () => {
  await bankStore.fetchAccount();

  render(<Account />);

  screen.getByText(/이름: Pikachu/);
  screen.getByText(/계좌번호: 1234/);
  screen.getByText(/잔액: 123,000원/);
});
