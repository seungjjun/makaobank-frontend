/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import styled from 'styled-components';

import useBankStore from '../hooks/useBankStore';

import numberFormat from '../utils/numberFormat';

const Error = styled.div`
  color: #f23434d3;
`;

export default function TransferForm() {
  const bankStore = useBankStore();

  useEffect(() => {
    bankStore.fetchAccount();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const { accountNumber, amount, name } = data;
    bankStore.requestTransfer({ to: accountNumber, amount, name });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="input-account">
          받을 분 계좌 번호
        </label>
        <input
          id="input-account"
          {...register('accountNumber', {
            required: true,
            minLength: 8,
            maxLength: 8,
          })}
        />
        {errors.accountNumber ? (
          <Error>계좌번호를 입력해주세요</Error>
        ) : (
          <p>하이픈(-) 제외 숫자 8글자를 입력하세요</p>
        ) }
      </div>
      <div>
        <label htmlFor="input-amount">
          보낼 금액(원):
        </label>
        <input
          id="input-amount"
          type="number"
          {...register('amount', { required: true })}
        />
        {bankStore.isTransferFail ? (
          <Error>
            {bankStore.errorMessage}
          </Error>
        ) : (
          null
        )}
        {errors.amount ? (
          <Error>금액을 입력해주세요</Error>
        ) : null}
        {errors.amount ? (
          null
        ) : (
          <p>
            내 계좌 잔액:
            {' '}
            {numberFormat(bankStore.amount)}
            원
          </p>
        )}
      </div>
      <div>
        <label htmlFor="input-name">
          받는 분 통장 표시:
        </label>
        <input
          id="input-name"
          {...register('name', { required: true })}
        />
        {errors.name ? (
          <Error>입금 받는 분의 통장에 표시될 이름을 입력하세요</Error>
        ) : (
          <p>입금 받는 분의 통장에 표시될 이름을 입력하세요</p>
        ) }
      </div>
      <button type="submit">
        보내기
      </button>
      {bankStore.isTransferProcessing ? (
        <p>송금 진행중...</p>
      ) : null}
      {bankStore.isTransferSuccess ? (
        <p>송금 완료!</p>
      ) : null}
      {bankStore.isTransferFail ? (
        <Error>
          <p>계좌 이체 실패</p>
        </Error>
      ) : null}
    </form>
  );
}
