/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';

import useBankStore from '../hooks/useBankStore';

import PrimaryButton from './ui/PrimaryButton';

const Error = styled.div`
  color: #f23434d3;
`;

export default function LoginForm() {
  const navagate = useNavigate();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const bankStore = useBankStore();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { accountNumber, password } = data;
    const accessToken = await bankStore.login({ accountNumber, password });

    if (accessToken) {
      setAccessToken(accessToken);
      navagate('/');
    }
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
        {errors.accountNumber ? (
          <Error>아이디를 입력해주세요</Error>
        ) : null}
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
        {errors.password ? (
          <Error>비밀번호를 입력해주세요</Error>
        ) : null}
      </div>
      {bankStore.isLoginFail ? (
        <Error>{bankStore.errorMessage}</Error>
      ) : null}
      <PrimaryButton type="submit" onClick={() => {}}>
        로그인
      </PrimaryButton>
    </form>
  );
}
