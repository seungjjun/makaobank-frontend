/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';

import useBankStore from '../hooks/useBankStore';

const Container = styled.div`
  margin: auto;
  margin-top: 4em;
  height: 100%;
  width: 50%;  
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  margin-bottom: .15em;
  font-size: 3em;
  font-weight: bold;
`;

const Form = styled.form`
  padding-top: 2.2em;
  border-top: 2px solid #ABD9FF;
`;

const Input = styled.input`
  margin: .6em 0;
  padding: 1.2em .6em;
  width: 100%;
  border: 1px solid #A0A0A0;
  color: #A0A0A0;
  &:focus {
    border: 1px solid #ABD9FF;
  }
`;

const LoginButton = styled.button`
  margin-top: 3em;
  padding: 1.8em 1em;
  width: 100%;
  border: 1px solid #ABD9FF;
  background-color: #ABD9FF;
  color: #FFF;
`;

const Registration = styled.button`
  display: flex;
  margin: auto;
  margin-top: 3em;
  border: none;
  color: #363636;
`;

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

  const handleClick = () => {
    navagate('/register');
  };

  return (
    <Container>
      <Title>USER LOGIN</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* <label htmlFor="input-account-number" /> */}
          <Input
            id="input-account-number"
            placeholder="아이디(계좌번호)"
            {...register('accountNumber', { required: true })}
          />
          {errors.accountNumber ? (
            <Error>아이디를 입력해주세요</Error>
          ) : null}
        </div>
        <div>
          {/* <label htmlFor="input-password">
            패스워드
          </label> */}
          <Input
            id="input-password"
            placeholder="비밀번호"
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
        <LoginButton type="submit">
          로그인하기
        </LoginButton>
        <Registration
          type="button"
          onClick={handleClick}
        >
          회원가입
        </Registration>
      </Form>
    </Container>
  );
}
