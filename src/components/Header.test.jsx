import { render, screen } from '@testing-library/react';

import Header from './Header';

jest.mock('react-router-dom', () => ({
  Link({ children }) {
    return children;
  },
}));

test('Header', () => {
  render(<Header />);

  screen.getByText(/Home/);
});
