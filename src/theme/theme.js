import Color from 'color';
import styleOverrides from './styleOverrides';
import propOverrides from './propOverrides';

/* Add your custom theme definitions below. Anything that is supported in UI-Kit Theme can be
 overridden and/or customized here! */

/* Base colors.
 * These get used by theme types (see /types directory) to color
 * specific parts of the interface. For more control on how certain
 * elements are colored, go there. The next level of control comes
 * on a per-component basis with "overrides"
 */
const colors = {
  // Brand Colors
  primary: '#6bac43',
  secondary: '#6bac43',
  tertiary: '#2a4930',
  screen: '#F8F7F4',
  paper: '#ffffff',
  // Dark shades
  darkPrimary: '#303030',
  darkSecondary: '#505050',
  darkTertiary: '#858585',
  // Light shades
  lightPrimary: '#ffffff',
  lightSecondary: '#f7f7f7',
  lightTertiary: '#dddddd',
  // Statics
  black: '#000000',
  white: '#ffffff',
  transparent: 'transparent',

  alert: '#c64f55',
  wordOfChrist: '#8b0000',
  shadows: {
    default: 'rgba(8, 0, 20, 0.25)',
  },
};

/* Base Typography sizing and fonts.
 * To control speicfic styles used on different type components (like H1, H2, etc), see "overrides"
 */
const typography = {
  baseFontSize: 16,
  baseLineHeight: 23.04, // 1.44 ratio
  sans: {
    regular: {
      default: 'Colfax-Regular',
      italic: 'Colfax-RegularItalic',
    },
    medium: {
      default: 'Colfax-Medium',
      italic: 'Colfax-MediumItalic',
    },
    bold: {
      default: 'Colfax-Bold',
      italic: 'Colfax-BoldItalic',
    },
    black: {
      default: 'Colfax-Black',
      italic: 'Colfax-BlackItalic',
    },
  },
  ui: {
    regular: 'Colfax-Medium',
  },
};

/* Responsive breakpoints */
// export const breakpoints = {};

/* Base sizing units. These are used to scale
 * space, and size components relatively to one another.
 */
// export const sizing = {};

/* Base alpha values. These are used to keep transparent values across the app consistant */
// export const alpha = {};

/* Base overlays. These are used as configuration for LinearGradients across the app */
// export const overlays = () => ({});

/* Overrides allow you to override the styles of any component styled using the `styled` HOC. You
 * can also override the props of any component using the `withTheme` HOC. See examples below:
 * ```const StyledComponent = styled({ margin: 10, padding: 20 }, 'StyledComponent');
 *    const PropsComponent = withTheme(({ theme }) => ({ fill: theme.colors.primary }), 'PropsComponent');
 * ```
 * These componnents can have their styles/props overriden by including the following overrides:
 * ```{
 *   overides: {
 *     StyledComponent: {
 *       margin: 5,
 *       padding: 15,
 *     },
 *     // #protip: you even have access 👇to component props! This applies to style overrides too 💥
 *     PropsComponent: () => ({ theme, isActive }) => ({
 *       fill: isActive ? theme.colors.secondary : theme.colors.primary,
 *     }),
 *   },
 * }
 * ```
 */
const overrides = {
  ...styleOverrides,
  ...propOverrides,
};

export const buttons = ({ colors: themeColors, alpha: themeAlpha }) => ({
  darkOverlay: {
    fill: Color(themeColors.darkTertiary).alpha(themeAlpha.low),
    accent: themeColors.darkSecondary,
  },
});

export const overrides = {
  'ui-kit.CardLabel': { borderWidth: 0 },
  'Button.Link': { fontWeight: '600' },
};

export default {
  colors,
  typography,
  buttons,
  overrides,
};
