import { ThemeProvider } from "@lightdotso/common";
import type { AppProps } from "next/app";
import type { FC } from "react";
import { RecoilRoot } from "recoil";

import "@lightdotso/og/styles/index.css";

const CustomApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
};

export default CustomApp;
