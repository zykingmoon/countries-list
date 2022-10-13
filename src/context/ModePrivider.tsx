import React, {FC, ReactNode} from 'react';
import { PaletteMode } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { getDesignTokens, lightTheme } from './theme';
import {colors, breakpoints, fontWeight} from '../base/colors';
import NunitoSansBold from '../fonts/NunitoSans-Bold.ttf';
import NunitoSansRegular from '../fonts/NunitoSans-Regular.ttf';
import NunitoSansLight from '../fonts/NunitoSans-Light.ttf';

interface Props {
  children: ReactNode | ReactNode[];
};

const getDesignTokens = (mode: PaletteMode) => ({
  breakpoints: {
    values: {
      xs: 0,
      sm: breakpoints.mobile,
      md: 900,
      lg: breakpoints.desktop,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: 'NunitoSans, Arial',
    fontWeightBold: fontWeight.bold,
    fontWeightMedium: fontWeight.normal,
    fontWeightLight: fontWeight.light,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'NunitoSans';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: "local('NunitoSans'), local('NunitoSans-Regular'), url(${NunitoSansRegular}) format('ttf')";
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
        }
      `,
    },
  },
  palette: {
    mode,
    palette: {
      ...(mode === 'light'
      ? 
      {
        primary: {
          main: colors.white,
        },
        text: {
          primary: colors.darkGray,
          secondary: colors.darkBlueText,
        },
        background: {
          default: colors.lightGray,
          paper: colors.white
        }
      }
      : {
        primary: {
          main: colors.darkBlue,
        },
        text: {
          primary: colors.white,
          secondary: colors.lightGray,
        },
        background: {
          default: colors.darkBlueBackground,
          paper: colors.darkBlue
        }
      }),
    }
  },
});
export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export const ModePrivider:FC<Props> = ({children}: Props) => {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );
  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}



