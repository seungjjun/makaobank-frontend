import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import useBankStore from '../hooks/useBankStore';

import PrimaryButton from './ui/PrimaryButton';

export default function LoginForm() {
  const navagate = useNavigate();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const bankStore = useBankStore();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const { accountNumber, password } = data;
    const accessToken = await bankStore.login({ accountNumber, password });

    if (accessToken) {
      setAccessToken(accessToken);
      navagate('/');
    }
    console.log(accessToken);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>로그인</h2>
      <div>
        <label htmlFor="input-account-number">
          계좌 번호
        </label>
        <input
          id="input-account-number"
          {...register('accountNumber', { required: true })}
        />
      </div>
      <div>
        <label htmlFor="input-password">
          패스워드
        </label>
        <input
          id="input-password"
          type="password"
          {...register('password', { required: true })}
        />
      </div>
      <PrimaryButton type="submit" onClick={() => {}}>
        로그인
      </PrimaryButton>
    </form>
  );
}
