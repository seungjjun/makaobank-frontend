/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

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

const Label = styled.label`
  font-weight: bold;
  display: flex;
  color: #A0A0A0;
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

const Error = styled.div`
  margin-bottom: 1.4em;
  color: #f23434d3;
`;

const P = styled.p`
  margin-bottom: 1.4em;
  color: #A0A0A0;
`;

const Button = styled.button`
  margin-top: 3em;
  padding: 1.8em 1em;
  width: 100%;
  border: 1px solid #ABD9FF;
  background-color: #ABD9FF;
  color: #FFF;
`;

export default function RegisterForm() {
  const bankStore = useBankStore();

  const navagate = useNavigate();

  const {
    register, watch, handleSubmit, formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    bankStore.registrationState = '';

    const {
      name, accountNumber, password, confirmPassword,
    } = data;
    await bankStore.register({
      name, accountNumber, password, confirmPassword,
    });

    if (bankStore.isExistingAccountnumber) {
      return;
    }

    navagate('/');
  };

  return (
    <Container>
      <Title>SIGN UP</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="input-name">
            이름:
          </Label>
          <Input
            id="input-name"
            type="text"
            {...register('name', {
              required: true,
              minLength: 3,
              maxLength: 8,
              pattern: /^[ㄱ-ㅎ|가-힣]+$/,
            })}
          />
          {errors.name ? (
            <Error>3 ~ 7자까지 한글만 사용 가능</Error>
          ) : (
            <P>3 ~ 7자까지 한글만 사용 가능</P>
          ) }
        </div>
        <div>
          <Label htmlFor="input-account-number">
            계좌번호 입력:
          </Label>
          <Input
            id="input-account-number"
            type="text"
            {...register('accountNumber', {
              required: true,
              minLength: 8,
              maxLength: 8,
            })}
          />
          {bankStore.isExistingAccountnumber ? (
            <Error>
              {bankStore.errorMessage}
            </Error>
          ) : errors.accountNumber ? (
            <Error>로그인 및 거래시 사용될 계좌번호이며 숫자만 사용 가능(8글자)</Error>
          ) : (
            <P>로그인 및 거래시 사용될 계좌번호이며 숫자만 사용 가능(8글자)</P>
          ) }
        </div>
        <div>
          <Label htmlFor="input-password">
            비밀번호:
          </Label>
          <Input
            id="input-password"
            type="password"
            {...register('password', {
              required: true,
              pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            })}
          />
          {errors.password ? (
            <Error>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</Error>
          ) : (
            <P>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</P>
          ) }
        </div>
        <div>
          <Label htmlFor="input-confirm-password">
            비밀번호 확인:
          </Label>
          <Input
            id="input-confirm-password"
            type="password"
            {...register('confirmPassword', {
              required: true,
              validate: (value) => value === watch('password'),
            })}
          />
          {errors.confirmPassword ? (
            <Error>비밀번호가 일치하지 않습니다</Error>
          ) : (
            null
          ) }
        </div>
        <Button type="submit">
          회원가입
        </Button>
      </Form>
    </Container>
  );
}
