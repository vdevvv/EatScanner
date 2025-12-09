import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SaveIcon = ({ fill = 'white', stroke = 'white', fillOpacity = 0.4 }) => {
  return (
    <Svg width="26" height="32" viewBox="0 0 26 32" fill="none">
      <Path
        d="M24.3333 31L12.6667 24.3333L1 31V4.33333C1 3.44928 1.35119 2.60143 1.97631 1.97631C2.60143 1.35119 3.44928 1 4.33333 1H21C21.8841 1 22.7319 1.35119 23.357 1.97631C23.9821 2.60143 24.3333 3.44928 24.3333 4.33333V31Z"
        fill={fill} fillOpacity={fillOpacity} stroke={stroke} strokeWidth="2" strokeLinecap="round"
        strokeLinejoin="round" />
    </Svg>
  );
};

export default SaveIcon;