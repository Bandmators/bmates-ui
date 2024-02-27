import styled from '@emotion/styled';

const SelectIcon = () => {
  return (
    <SelectSVG
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </SelectSVG>
  );
};
export default SelectIcon;

const SelectSVG = styled.svg`
  margin-left: auto;
`;
