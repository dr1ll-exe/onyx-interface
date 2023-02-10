import * as React from 'react';
import { SVGProps } from 'react';

const SvgTelegram = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_319_1904)">
      <path
        d="M10 20C15.5242 20 20 15.5242 20 10C20 4.47583 15.5242 0 10 0C4.47583 0 0 4.47583 0 10C0 15.5242 4.47583 20 10 20ZM4.57583 9.78333L14.2175 6.06583C14.665 5.90417 15.0558 6.175 14.9108 6.85167L14.9117 6.85083L13.27 14.585C13.1483 15.1333 12.8225 15.2667 12.3667 15.0083L9.86667 13.1658L8.66083 14.3275C8.5275 14.4608 8.415 14.5733 8.15667 14.5733L8.33417 12.0292L12.9675 7.84333C13.1692 7.66583 12.9225 7.56583 12.6567 7.7425L6.93083 11.3475L4.4625 10.5775C3.92667 10.4075 3.915 10.0417 4.57583 9.78333Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_319_1904">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgTelegram;
