/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

const Error = styled.div`
  color: #f23434d3;
`;

export default function RegisterForm() {
  // const navagate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const {
      name, accountNumber, password, confirmPassword,
    } = data;
  };

  // TODO 회원가입이 성공했을 시 홈으로 이동
  // navagate('/');

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>SIGN UP</h2>
        <div>
          <label htmlFor="input-name">
            이름:
          </label>
          <input
            id="input-name"
            type="text"
            {...register('name', { required: true })}
          />
          {errors.name ? (
            <Error>3 ~ 7자까지 한글만 사용 가능</Error>
          ) : (
            <p>3 ~ 7자까지 한글만 사용 가능</p>
          ) }
        </div>
        <div>
          <label htmlFor="input-account-number">
            계좌번호 입력:
          </label>
          <input
            id="input-account-number"
            type="text"
            {...register('accountNumber', { required: true })}
          />
          {errors.accountNumber ? (
            <Error>로그인 및 거래시 사용될 계좌번호이며 숫자만 사용 가능(8글자)</Error>
          ) : (
            <p>로그인 및 거래시 사용될 계좌번호이며 숫자만 사용 가능(8글자)</p>
          ) }
        </div>
        <div>
          <label htmlFor="input-password">
            비밀번호:
          </label>
          <input
            id="input-password"
            type="number"
            {...register('password', { required: true })}
          />
          {errors.password ? (
            <Error>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</Error>
          ) : (
            <p>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</p>
          ) }
        </div>
        <div>
          <label htmlFor="input-confirm-password">
            비밀번호 확인:
          </label>
          <input
            id="input-confirm-password"
            type="number"
            {...register('confirmPassword', { required: true })}
          />
          {errors.password ? (
            <Error>비밀번호가 일치하지 않습니다</Error>
          ) : (
            null
          ) }
        </div>
        <button type="submit" onClick={() => {}}>
          회원가입
        </button>
      </form>
    </div>

  );
}
