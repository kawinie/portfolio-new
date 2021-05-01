import { AppProps } from "next/app";
import { ReactElement, useEffect } from "react";
import { GlobalStyles, theme as tailwindTheme } from "twin.macro";
import { ChakraProvider } from "@chakra-ui/react";
import * as smoothscroll from "smoothscroll-polyfill";

import { ScreenProvider } from "hooks";
import theme from "theme";
import Fonts from "theme/fonts";

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
    useEffect(() => {
        smoothscroll.polyfill();
    }, []);
    return (
        <ScreenProvider screens={tailwindTheme`screens`}>
            <GlobalStyles />
            <Fonts />
            <ChakraProvider theme={theme}>
                <div tw="debug-screens" />
                <Component {...pageProps} />
            </ChakraProvider>
        </ScreenProvider>
    );
}
