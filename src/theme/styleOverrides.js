/* Export your custom style overrides here. */
export default {
  'ui-kit.ButtonLink.ButtonLink': { fontWeight: '600' },
  ScriptureText: (theme) => ({
    fontSize: theme.helpers.rem(1.15),
    lineHeight: theme.helpers.verticalRhythm(1.4, 1.5),
  }),
};
