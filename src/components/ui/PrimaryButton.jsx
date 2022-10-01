import styled from 'styled-components';

const PrimaryButton = styled.button`
  align-items: center;
  padding: 1em 2.5em;
  border: none;
  background-color: ${[(props) => props.theme.colors.button]};
  color: ${[(props) => props.theme.colors.primaryText]};
  cursor: pointer;
`;

export default PrimaryButton;
