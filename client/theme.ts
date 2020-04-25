import { createTheme } from 'baseui';

const primitives = {
  primaryFontFamily: 'Roboto',
};

const overrides = {
  typography: {
    DisplayLarge: {
      fontFamily: 'Playfair Display',
    },
    DisplayMedium: {
      fontFamily: 'Playfair Display',
    },
    DisplaySmall: {
      fontFamily: 'Playfair Display',
    },
    HeadingXXLarge: {
      fontFamily: 'Montserrat',
      fontWeight: 700,
    },
    HeadingXLarge: {
      fontFamily: 'Montserrat',
      fontWeight: 700,
    },
    HeadingLarge: {
      fontFamily: 'Montserrat',
    },
    HeadingMedium: {
      fontFamily: 'Montserrat',
    },
    HeadingSmall: {
      fontFamily: 'Montserrat',
    },
    HeadingXSmall: {
      fontFamily: 'Montserrat',
    },
  },
};

const theme = createTheme(primitives, overrides);

export default theme;