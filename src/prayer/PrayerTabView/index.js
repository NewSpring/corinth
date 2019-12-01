import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { HorizontalTileFeed, TouchableScale } from '@apollosproject/ui-kit';
import PrayerMenuCard from '../PrayerMenuCard';

import GET_GROUP_PRAYERS from '../data/queries/getGroupPrayers';
import GET_PRAYERS from '../data/queries/getPrayers';
import GET_CAMPUS_PRAYERS from '../data/queries/getCampusPrayers';
import GET_SAVED_PRAYERS from '../data/queries/getSavedPrayers';
import PrayerTab from './PrayerTab';

class PrayerTabView extends PureComponent {
  static propTypes = {
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        title: PropTypes.string,
        key: PropTypes.string,
      })
    ),
    campusID: PropTypes.string,
  };

  static defaultProps = {
    categories: [],
  };

  state = {
    index: 0,
    routes: this.props.categories.map((category) => ({
      key: category.key,
      title: category.title,
      description: category.description,
    })),
    itemSelected: 1,
  };

  queries = {
    'my-church': GET_PRAYERS,
    'my-campus': GET_CAMPUS_PRAYERS,
    'my-community': GET_GROUP_PRAYERS,
    'my-saved-prayers': GET_SAVED_PRAYERS,
  };

  render() {
    return (
      <TabView
        initialLayout={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
        }}
        navigationState={{ ...this.state }}
        renderScene={({ route }) => (
          <Query
            query={this.queries[route.key]}
            fetchPolicy="cache-and-network"
          >
            {({ data, loading: prayersLoading }) => (
              <PrayerTab
                loading={prayersLoading}
                prayers={
                  data && Object.values(data).length > 0
                    ? Object.values(data)[0]
                    : []
                }
                description={route.description}
                title={route.title}
                type={route.key.split('-')[1]}
                {...this.props}
              />
            )}
          </Query>
        )}
        renderTabBar={(props) => (
          <HorizontalTileFeed
            content={this.props.categories}
            renderItem={({ item }) => (
              <TouchableScale
                key={item.key}
                onPress={() => {
                  this.setState({ itemSelected: item.key });
                  props.jumpTo(item.key);
                }}
              >
                <PrayerMenuCard
                  image={item.image}
                  title={item.title}
                  selected={this.state.itemSelected === item.key}
                />
              </TouchableScale>
            )}
            loadingStateObject={{
              node: {
                id: 'fakeId0',
                isLoading: true,
              },
            }}
          />
        )}
        onIndexChange={(index) => this.setState({ index })}
        swipeEnabled={false}
      />
    );
  }
}

export default PrayerTabView;
