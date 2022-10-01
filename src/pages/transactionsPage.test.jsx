import { render, screen, waitFor } from '@testing-library/react';

import TransactionsPage from './TransactionsPage';

test('TransactionsPage', async () => {
  render(<TransactionsPage />);

  await waitFor(() => {
    screen.getByText('거래 내역이 없습니다');
  });
});
