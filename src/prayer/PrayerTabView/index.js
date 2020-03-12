import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import {
  HorizontalTileFeed,
  TouchableScale,
  ErrorCard,
} from '@apollosproject/ui-kit';
import PrayerMenuCard from '../PrayerMenuCard';

import GET_PRAYER_COUNT from '../data/queries/getPrayerCount';
import PrayerTab from './PrayerTab';

class PrayerTabView extends PureComponent {
  types = {
    'my-campus': 'CAMPUS',
    'my-community': 'GROUP',
    'my-saved-prayers': 'SAVED',
  };

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

  render() {
    return (
      <TabView
        initialLayout={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
        }}
        navigationState={{ ...this.state }}
        renderScene={({ route: category }) => (
          <Query
            query={GET_PRAYER_COUNT}
            variables={{
              type:
                category.key !== 'my-church' ? this.types[category.key] : null,
            }}
            fetchPolicy="cache-and-network"
          >
            {({
              data: { prayerFeed = { totalCount: 0 } } = {
                prayerFeed: { totalCount: 0 },
              },
              loading: prayersLoading,
              error,
            }) => {
              if (error) return <ErrorCard error={error} />;
              return (
                <PrayerTab
                  loading={prayersLoading}
                  hasPrayers={prayerFeed.totalCount > 0}
                  description={category.description}
                  title={category.title}
                  type={category.key.split('-')[1]}
                  feedType={
                    category.key !== 'my-church'
                      ? this.types[category.key]
                      : null
                  }
                  {...this.props}
                />
              );
            }}
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
