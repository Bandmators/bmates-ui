import { Avatar, Button } from '@/components';
import styled from '@emotion/styled';

import BandmatesLogo from '@/assets/bandmate.png';
import Plus from '@/assets/icons/plus.svg';

const HeaderStyled = styled.div`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  background-color: white;

  display: flex;
  height: 4rem;
  align-items: center;
  padding: 0rem 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['200']};
`;

const HeaderBarStart = styled.div`
  flex: 1 1 auto;
  display: flex;
  gap: 1rem;
  align-items: center;
`;
const HeaderBarEnd = styled.div`
  flex: 0 1 auto;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  align-items: center;
`;

const Logo = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const Header = () => {
  return (
    <HeaderStyled>
      <HeaderBarStart>
        <Logo src={BandmatesLogo} alt="bandmates" />
        Dashboard
      </HeaderBarStart>
      <HeaderBarEnd>
        <Button variant="outline">Search Input</Button>
        <Button variant="outline" size="icon">
          <img src={Plus} alt="+" />
        </Button>
        <Avatar src="/src/assets/bandmate2_60.png" alt="profile" />
      </HeaderBarEnd>
    </HeaderStyled>
  );
};
export default Header;
