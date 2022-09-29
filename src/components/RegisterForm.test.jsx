import { fireEvent, render, screen } from '@testing-library/react';

import RegisterForm from './RegisterForm';

test('register', async () => {
  render(<RegisterForm />);

  screen.getByText('SIGN UP');

  fireEvent.change(screen.getByLabelText('이름:'), {
    target: { value: '노승준' },
  });

  fireEvent.change(screen.getByLabelText('계좌번호 입력:'), {
    target: { value: '99999999' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호:'), {
    target: { value: 'Qwe1234!' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
    target: { value: 'Qwe1234!' },
  });

  fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

  // await waitFor(() => {
  //   expect(navigate).toBeCalledWith('/');
  // });
});
