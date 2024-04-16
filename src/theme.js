import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: '"Noto Sans KR","sans-serif"',
    body: '"Noto Sans KR","sans-serif"',
  },
  styles: {
    global: {
      body: {
        bg: "#5a71da",
      },
    },
  },
});
