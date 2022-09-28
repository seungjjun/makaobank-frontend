/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import styled from 'styled-components';

import useBankStore from '../hooks/useBankStore';

import numberFormat from '../utils/numberFormat';

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
  padding-top: 4em;
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
  margin-bottom: 2.3em;
  color: #A0A0A0;
`;

const Button = styled.button`
  margin-top: 2.3em;
  padding: 1.8em 1em;
  width: 100%;
  border: 1px solid #ABD9FF;
  background-color: #ABD9FF;
  color: #FFF;
`;

const TransferState = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 2em;
  font-size: 1.5em;
  color: #A0A0A0;
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
    <Container>
      <Title>송금</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="input-account">
            받을 분 계좌 번호
          </Label>
          <Input
            id="input-account"
            {...register('accountNumber', {
              required: true,
              minLength: 8,
              maxLength: 8,
            })}
          />
          {bankStore.isExistentId ? (
            <Error>
              {bankStore.errorMessage}
            </Error>
          ) : bankStore.isMyAccount ? (
            <Error>
              {bankStore.errorMessage}
            </Error>
          ) : errors.accountNumber ? (
            <Error>계좌번호를 입력해주세요</Error>
          ) : (
            <P>하이픈(-) 제외 숫자 8글자를 입력하세요</P>
          )}
        </div>
        <div>
          <Label htmlFor="input-amount">
            보낼 금액(원):
          </Label>
          <Input
            id="input-amount"
            type="number"
            {...register('amount', { required: true })}
          />
          {errors.amount ? (
            <Error>금액을 입력해주세요</Error>
          ) : bankStore.isTransferFail ? (
            <Error>
              {bankStore.errorMessage}
            </Error>
          ) : bankStore.isEnoughAmount ? (
            <Error>
              {bankStore.errorMessage}
            </Error>
          ) : (
            <P>
              내 계좌 잔액:
              {' '}
              {numberFormat(bankStore.amount)}
              원
            </P>
          )}
        </div>
        <div>
          <Label htmlFor="input-name">
            받는 분 통장 표시:
          </Label>
          <Input
            id="input-name"
            {...register('name', { required: true })}
          />
          {errors.name ? (
            <Error>입금 받는 분의 통장에 표시될 이름을 입력하세요</Error>
          ) : (
            <P>입금 받는 분의 통장에 표시될 이름을 입력하세요</P>
          ) }
        </div>
        <Button type="submit">
          보내기
        </Button>
        {bankStore.isTransferProcessing ? (
          <TransferState>송금 진행중...</TransferState>
        ) : null}
        {bankStore.isTransferSuccess ? (
          <TransferState>🐳송금 완료!</TransferState>
        ) : null}
        {bankStore.isTransferFail ? (
          <Error>
            <TransferState>계좌 이체 실패</TransferState>
          </Error>
        ) : null}
      </Form>
    </Container>
  );
}
