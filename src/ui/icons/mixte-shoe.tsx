import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

import colors from '../colors';

export const MixteShoe = ({
  color = colors.neutral[900],
  ...props
}: SvgProps) => (
  <Svg width={27} height={13} viewBox="0 0 27 13" fill="none" {...props}>
    <G clipPath="url(#clip0)">
      <Path
        d="M26.6844 8.46295C26.6844 8.06742 26.6097 7.64582 26.4098 7.24597C26.2115 6.84657 25.8864 6.47591 25.4289 6.19821C25.0275 5.95317 24.329 5.59848 23.4485 5.16478C22.1307 4.51725 20.4225 3.70981 18.8466 2.94125C18.0586 2.55818 17.3048 2.18361 16.6499 1.84679C15.9964 1.50956 15.4419 1.2074 15.0638 0.974764C14.3186 0.517429 13.6769 0.301947 13.1036 0.29999C12.8103 0.299578 12.5373 0.359886 12.3001 0.475404C11.9422 0.648089 11.6816 0.939022 11.5246 1.26029C11.3651 1.58274 11.2974 1.93707 11.2966 2.28981C11.2966 3.43247 11.2966 3.84052 11.2966 4.24883C11.2982 4.38186 11.3099 4.47873 11.3091 4.54717C11.3091 4.60707 11.3021 4.63705 11.2982 4.64287L11.2904 4.65414C11.2771 4.66697 11.2212 4.71095 11.0648 4.75061C10.91 4.79026 10.6658 4.82065 10.3173 4.82024C8.60287 4.82024 5.33818 4.82024 4.52218 4.82024C4.08427 4.82024 3.75208 4.76693 3.49385 4.6938C3.10563 4.58142 2.87779 4.4297 2.67317 4.28004C2.56971 4.20454 2.47561 4.12677 2.35422 4.05054C2.29278 4.01285 2.22434 3.97473 2.14034 3.94322C2.05788 3.91288 1.95751 3.89032 1.851 3.89032C1.66194 3.88873 1.48307 3.96222 1.3469 4.05791C1.20769 4.15478 1.09176 4.27339 0.964194 4.42234C0.699681 4.73778 0.548782 5.12631 0.450774 5.54672C0.354466 5.96759 0.315582 6.42647 0.315582 6.89364C0.315582 7.52134 0.38717 8.16465 0.503821 8.74106C0.607288 9.24042 0.741861 9.67993 0.913774 10.0378L1.06704 12.7H9.7068L9.86388 12.1466L11.7206 12.7H25.9874L26.0932 12.3531C26.1329 12.2228 26.1601 12.0839 26.1835 11.9311C26.2534 11.4772 26.283 10.9051 26.2838 10.4585C26.2831 10.3022 26.2783 10.1719 26.269 10.0521C26.3694 9.88135 26.4549 9.6892 26.5241 9.4749C26.6222 9.17043 26.6844 8.8266 26.6844 8.46295ZM25.2648 11.3617C25.254 11.4908 25.2392 11.6113 25.2244 11.7203H11.863L9.19333 10.9245L8.96693 11.7203H1.99109L1.9094 10.289H25.3022C25.3037 10.3419 25.3045 10.3983 25.3045 10.4586C25.3045 10.725 25.2913 11.0583 25.2648 11.3617ZM25.5915 9.17553C25.5301 9.36958 25.4468 9.53295 25.3753 9.636H1.80207C1.68305 9.39369 1.55471 8.99697 1.46371 8.54509C1.35947 8.03399 1.29489 7.44672 1.29489 6.89369C1.29489 6.48256 1.33145 6.08975 1.40613 5.76576C1.47844 5.44099 1.59437 5.19131 1.71256 5.05483C1.77478 4.98015 1.82535 4.93035 1.86115 4.89924C1.90163 4.92602 1.95838 4.96733 2.02914 5.02135C2.21816 5.16411 2.50363 5.371 2.9089 5.5289C3.31493 5.68876 3.83999 5.8 4.52218 5.8C5.33818 5.8 8.60287 5.8 10.3173 5.8C10.6751 5.79923 10.9652 5.77394 11.2126 5.72141C11.3985 5.68253 11.5603 5.62732 11.705 5.55027C11.9205 5.4379 12.094 5.25857 12.1834 5.0641C12.2744 4.86963 12.2884 4.68566 12.2884 4.54723C12.2876 4.40565 12.276 4.29713 12.2768 4.24888C12.2768 3.84052 12.2768 3.43253 12.2768 2.28986C12.276 1.99002 12.36 1.71778 12.4914 1.55127C12.5576 1.46609 12.6322 1.40346 12.7271 1.3568C12.8228 1.31091 12.9411 1.27981 13.1036 1.27981C13.4179 1.27785 13.904 1.4097 14.5505 1.80914C15.1059 2.1506 15.9327 2.5862 16.8949 3.07042C18.3379 3.79541 20.0779 4.6234 21.5948 5.35385C22.3524 5.71899 23.0548 6.05973 23.6336 6.34989C24.2107 6.63928 24.6689 6.88159 24.9178 7.03362C25.2266 7.22346 25.4125 7.44316 25.5331 7.68357C25.6529 7.92352 25.705 8.19112 25.705 8.463C25.7058 8.71149 25.6608 8.96076 25.5915 9.17553ZM25.7448 9.96618V9.96226L25.7487 9.96577L25.7448 9.96618Z"
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Path fill="#fff" d="M0 0H27V13H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
