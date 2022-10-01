import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';

import main from '../assets/main.png';

const Home = styled.div`
`;

const Title = styled.h2`
  position: absolute;
  top: 35%;
  left: 20%;
  font-size: 2.2em;
  font-weight: bold;
  line-height: 1.5em;
`;

const Strong = styled.strong`
  display: block;
`;

const ImageBox = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  width: 60vh;
  height: 50vh;
  background: url(${main}) no-repeat 0 50%; 
  background-size: contain;
`;

const ButtonBox = styled.div`
  position: absolute;
  top: 55%;
  left: 20%;
`;

const ButtonToTransfer = styled.button`
  margin-right: 1.5em;
  width: 9em;
  height: 4em;
  border: 1px solid #ABD9FF;
  border-radius: 3em;
  background-color: #ABD9FF;
  color: #FFF;
`;

const ButtonToTransaction = styled.button`
  width: 9em;
  height: 4em;
  border: 1px solid #ABD9FF;
  border-radius: 3em;
  background-color: #ABD9FF;
  color: #FFF;
`;

export default function HomePage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const navigate = useNavigate();

  const handleClickToTransfer = () => {
    if (accessToken ? navigate('/transfer') : navigate('/login'));
  };

  const handleClickToTransaction = () => {
    if (accessToken ? navigate('/transactions') : navigate('/login'));
  };
  return (
    <Home>
      <Title>
        <Strong>마카오뱅크에서</Strong>
        똑똑한 금융습관을 들이세요
      </Title>
      <ButtonBox>
        <ButtonToTransfer
          type="button"
          onClick={handleClickToTransfer}
        >
          송금하기
        </ButtonToTransfer>
        <ButtonToTransaction
          type="button"
          onClick={handleClickToTransaction}
        >
          거래내역조회
        </ButtonToTransaction>
      </ButtonBox>
      <ImageBox />
    </Home>
  );
}
