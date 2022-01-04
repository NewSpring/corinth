/* Export your custom style overrides here. */
export default {
  'ui-kit.ButtonLink.ButtonLink': { fontWeight: '600' },
  ScriptureText: (theme) => ({
    fontSize: theme.helpers.rem(1.25),
    lineHeight: theme.helpers.verticalRhythm(1.5, 1.625),
  }),
};
