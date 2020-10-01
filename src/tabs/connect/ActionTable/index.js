import React from 'react';
import { View } from 'react-native';

import {
  TableView,
  Cell,
  CellIcon,
  CellText,
  Divider,
  Touchable,
  styled,
  PaddedView,
  H4,
  NavigationService,
} from '@apollosproject/ui-kit';
import { RockAuthedWebBrowser } from '@apollosproject/ui-connected';

const RowHeader = styled(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: theme.sizing.baseUnit,
}))(PaddedView);

const Name = styled({
  flexGrow: 1,
})(View);

const ActionTable = () => (
  <RockAuthedWebBrowser>
    {(openUrl) => (
      <View>
        <RowHeader>
          <Name>
            <H4>{'Connect with NewSpring'}</H4>
          </Name>
        </RowHeader>
        <TableView>
          <Touchable
            onPress={() =>
              openUrl(
                'https://newspring.cc/connect/?hidenav=true',
                {},
                { useRockToken: true }
              )
            }
          >
            <Cell>
              <CellText>Sign up for Connect</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
          <Divider />
          <Touchable
            onPress={() =>
              openUrl(
                'https://newspring.cc/serving/?hidenav=true',
                {},
                { useRockToken: true }
              )
            }
          >
            <Cell>
              <CellText>Find a serving opportunity</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
          <Divider />
          <Touchable
            onPress={() =>
              openUrl(
                'https://newspring.cc/missions/?hidenav=true',
                {},
                { useRockToken: true }
              )
            }
          >
            <Cell>
              <CellText>Go on a mission trip</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
          <Divider />
          <Touchable
            onPress={() =>
              openUrl(
                'https://open.spotify.com/artist/1wUcqswHv80fp5nMF2hVwM',
                { externalBrowser: true }
              )
            }
          >
            <Cell>
              <CellText>Listen to NewSpring Worship</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
          <Divider />
          <Touchable
            onPress={() =>
              openUrl(
                `https://newspring.cc/workflows/530?Source=3&hidenav=true`,
                {},
                { useRockToken: true }
              )
            }
          >
            <Cell>
              <CellText>Report a bug</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
          <Divider />
          {process.env.NODE_ENV !== 'production' ? (
            <Touchable
              onPress={() => NavigationService.navigate('TestingControlPanel')}
            >
              <Cell>
                <CellIcon name="settings" />
                <CellText>Open Testing Panel</CellText>
              </Cell>
            </Touchable>
          ) : null}
        </TableView>
      </View>
    )}
  </RockAuthedWebBrowser>
);

const StyledActionTable = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 100,
}))(ActionTable);

export default StyledActionTable;
