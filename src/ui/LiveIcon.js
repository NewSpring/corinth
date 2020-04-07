import { Icon, withTheme } from '@apollosproject/ui-kit';

export default withTheme(({ theme }) => ({
  name: 'live-dot',
  size: theme.helpers.rem(0.4375),
  fill: 'red',
  style: {
    marginRight: theme.sizing.baseUnit * 0.5,
  },
}))(Icon);
