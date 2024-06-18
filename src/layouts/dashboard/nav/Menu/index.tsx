import { DetailedHTMLProps, InputHTMLAttributes, memo, useState } from 'react';
import { Badge, Grid } from '@mui/material';
import { Decoder, DefaultFontSize } from '@/utils/utils';
import { themes } from '@/theme/styles/theme/colors';
import { StyledTypography } from '@/components/Typography';
import styled from '@emotion/styled';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface Props extends InputProps {
  id: string;
  className: 'mobile' | 'web';
  onClick: (event:any) => void;
  icon?: any;
  iconOver?: any;
  value: string;
  active: boolean;
  badge?: boolean;
  key?: any;
}

export const StyledMenu = ({ iconOver, id, className, icon, value, active, onClick, badge, key }: Props) => {
    const cartItem: number = JSON.parse(localStorage.userData).data.orders_count;
    const [menuIcon, setMenuIcon] = useState(icon);
    const fontSize = DefaultFontSize();
    return (
      <>
        <MenuStyle
          key={key}
          id={id}
          className={active ? className + 'Active' : className}
          onMouseOver={() => setMenuIcon(iconOver)}
          onMouseLeave={() => setMenuIcon(icon)}
          onClick={onClick}
        >
          <Grid container id={id}>
            {badge && (
              <Badge
                badgeContent={cartItem}
                sx={{ '& .MuiBadge-badge': { right: 4, top: 5 } }}
                color={'secondary'}
              />
            )}
            <div id={id} style={active ? { fontWeight: 'bold' } : { fontWeight: 'regular' }}>
              {menuIcon}
            </div>
            <div style={{ paddingRight: '10px' }}>
              <StyledTypography id={id} variant={fontSize} weight={active ? 'bold' : 'regular'}>
                {value}
              </StyledTypography>
            </div>
          </Grid>
        </MenuStyle>
      </>
    );
  }


export default { StyledMenu };
  
const MenuStyle = styled.div`
  cursor: pointer;
  margin: 1px;
  @media only screen and (min-width: 320px) {
    padding: 9px 30px 9px 0;
    height: 40px;
  }

  @media only screen and (min-width: 1024px) {
    padding: 10px 30px 10px 0;
    border-radius: 6px 0 0 6px;
    height: 48px;
  }

  &.web {
    line-height: 34px;
    transition: all 400ms;

    &:hover {
      color: ${themes.light.Secondary.main};
      font-weight: bold;
    }
  }

  &.webActive {
    line-height: 34px;
    background-color: rgba(222, 116, 163, 0.082);
    border-left: 6px solid ${themes.light.Secondary.main};
  }

  &.mobile {
    line-height: 24px;
    transition: all 400ms;

    &:hover {
      color: ${themes.light.Secondary.main};
    }
  }

  &.mobileActive {
    line-height: 24px;
    color: ${themes.light.Secondary.main};
  }
`;
