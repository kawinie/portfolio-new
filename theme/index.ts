import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

import twconfig from "tailwind.config.js";
const { base: _, ...breakpointValues } = twconfig.theme.screens;

export default extendTheme({
    breakpoints: createBreakpoints({ ...breakpointValues } as const),
    colors: { ...twconfig.theme.extend.colors },
    styles: {
        global: {
            a: {
                color: "blueGray.900",
                _hover: {
                    color: "purple.700",
                },
            },
        },
    },
    fonts: {
        heading: "Roboto",
        body: "Roboto",
    },
});
