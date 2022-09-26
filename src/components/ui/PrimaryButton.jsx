import styled from 'styled-components';

const PrimaryButton = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.primaryText};
  cursor: pointer;
`;

export default PrimaryButton;
