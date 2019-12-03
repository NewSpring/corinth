import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

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
} from '@apollosproject/ui-kit';
import { WebBrowserConsumer } from '../../../ui/WebBrowser';
import NavigationActions from '../../../NavigationService';

const RowHeader = styled(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: theme.sizing.baseUnit,
}))(PaddedView);

const Name = styled({
  flexGrow: 1,
})(View);

const ActionTable = ({ isGroupLeader }) => (
  <View>
    <RowHeader>
      <Name>
        <H4>{'Connect with NewSpring'}</H4>
      </Name>
    </RowHeader>
    <TableView>
      <WebBrowserConsumer>
        {(openUrl) => (
          <View>
            <Touchable
              onPress={() =>
                openUrl(
                  'https://newspring.cc/connect',
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
                  'https://newspring.cc/serving',
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
            {isGroupLeader ? (
              <>
                <Divider />
                <Touchable
                  onPress={() =>
                    openUrl(
                      'https://newspring.cc/groups/leader',
                      {},
                      { useRockToken: true }
                    )
                  }
                >
                  <Cell>
                    <CellText>Manage your group</CellText>
                    <CellIcon name="arrow-next" />
                  </Cell>
                </Touchable>
              </>
            ) : null}
            <Divider />
            <Touchable
              onPress={() =>
                openUrl(
                  `https://newspring.cc/workflows/530?Source=3`,
                  {},
                  { useRockToken: true }
                )
              }
            >
              <Cell>
                <CellIcon name="settings" />
                <CellText>Bug Report!</CellText>
              </Cell>
            </Touchable>
            <Divider />
            {process.env.NODE_ENV !== 'production' ? (
              <Touchable
                onPress={() =>
                  NavigationActions.navigate('TestingControlPanel')
                }
              >
                <Cell>
                  <CellIcon name="settings" />
                  <CellText>Open Testing Panel</CellText>
                </Cell>
              </Touchable>
            ) : null}
          </View>
        )}
      </WebBrowserConsumer>
    </TableView>
  </View>
);

ActionTable.propTypes = {
  isGroupLeader: PropTypes.bool,
};

const StyledActionTable = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 100,
}))(ActionTable);

export default StyledActionTable;
