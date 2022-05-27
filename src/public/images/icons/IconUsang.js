import * as React from 'react';
import { SvgIcon as MuiSvgIcon, styled } from '@mui/material';

const SvgIcon = styled(MuiSvgIcon, {
  name: 'IconPenjualan',
  shouldForwardProp: (prop) => prop !== 'fill'
})(() => ({
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: '0px'
}));

SvgIcon.defaultProps = {
  viewBox: '0 0 24 24',
  focusable: 'false',
  'aria-hidden': 'true'
};

const IconUsang = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        d="M14.9999 8.27998C15.5999 8.62998 15.9999 9.26998 15.9999 9.99998V12.8L11.4999 8.28998L11.9999 7.99998L13.7499 8.99998L14.9999 8.27998ZM11.9999 6.49998L13.7499 7.49998L15.2699 6.62998C14.7199 5.65998 13.9099 4.93998 12.9699 4.64998C12.8851 3.92124 12.536 3.24892 11.9885 2.76048C11.4411 2.27204 10.7335 2.00144 9.99986 1.99998V3.99998C10.4399 3.99998 10.7999 4.28998 10.9399 4.68998C10.2599 4.91998 9.65986 5.36998 9.16986 5.96998L10.5399 7.33998L11.9999 6.49998ZM2.38986 1.72998L1.10986 2.99998L7.99986 9.89998V11C7.99986 20 15.9999 22 15.9999 22V17.89L20.8399 22.73L22.1099 21.46L2.38986 1.72998Z"
        fill="white"
      />
    </SvgIcon>
  );
};

export default IconUsang;
