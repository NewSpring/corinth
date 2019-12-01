import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions, Platform, PixelRatio } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import RNMapView from 'react-native-maps';
import { debounce } from 'lodash';

import {
  Button,
  Touchable,
  PaddedView,
  FlexedView,
  styled,
  withTheme,
  CampusCard,
} from '@apollosproject/ui-kit';
import { MediaPlayerSpacer } from '@apollosproject/ui-media-player';

import Marker from './Marker';

const getCampusAddress = (campus) =>
  `${campus.street1}\n${campus.city}, ${campus.state} ${campus.postalCode}`;

/* TODO: remove magic number. `theme.sizing.baseUnit * 2.25` This width value is a brittle
 * calculation of width minus `CampusCard` margins */
const CARD_WIDTH = Dimensions.get('window').width - 36;

const FlexedMapView = styled({ flex: 1 })(({ mapRef, ...props }) => (
  <RNMapView ref={mapRef} {...props} />
));

const Footer = styled({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
})(SafeAreaView);

const StyledCampusCard = styled(({ theme }) => ({
  width: CARD_WIDTH,
  marginHorizontal: theme.sizing.baseUnit / 4,
}))(CampusCard);

class MapView extends Component {
  static propTypes = {
    campuses: PropTypes.arrayOf(
      PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
      })
    ),
    currentCampus: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }),
    onLocationSelect: PropTypes.func.isRequired,
    initialRegion: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      latitudeDelta: PropTypes.number,
      longitudeDelta: PropTypes.number,
    }).isRequired,
    userLocation: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }),
    theme: PropTypes.shape({
      sizing: PropTypes.shape({
        baseUnit: PropTypes.number,
      }),
    }),
    navigation: PropTypes.shape({
      goBack: PropTypes.func,
    }),
  };

  animation = new Animated.Value(0);

  scrollView = null;

  componentDidMount() {
    this.animation.addListener(debounce(this.updateCoordinates));
  }

  componentDidUpdate(oldProps) {
    // update mapview if there are campuses and the location changes
    if (
      this.props.campuses.length &&
      oldProps.userLocation !== this.props.userLocation
    ) {
      this.updateCoordinates({ value: this.previousScrollPosition });
    }
  }

  get currentCampus() {
    const cardIndex = Math.floor(
      this.previousScrollPosition / CARD_WIDTH + 0.3
    ); // animate 30% away from landing on the next item;
    return this.sortedCampuses[cardIndex];
  }

  get sortedCampuses() {
    const { currentCampus = null, campuses = [] } = this.props;
    const publicCampuses = campuses.filter(({ name }) => name !== 'Web');
    if (currentCampus && currentCampus.name !== 'Web') {
      return [
        currentCampus,
        ...publicCampuses.filter(({ id }) => id !== currentCampus.id),
      ];
    }
    return publicCampuses;
  }

  scrollToIndex = (index) => {
    this.scrollView.getNode().scrollTo({
      x: index * (CARD_WIDTH + 8),
      y: 0,
      animated: true,
    });
    this.updateCoordinates({ value: index * (CARD_WIDTH + 8) });
  };

  updateCoordinates = ({ value }) => {
    this.previousScrollPosition = value;

    const { userLocation } = this.props;
    // campus card height + some padding

    const bottomPadding = 100 + this.props.theme.sizing.baseUnit * 12;
    const edgePadding = {
      top: 100,
      left: 100,
      right: 100,
      bottom:
        Platform.OS === 'android'
          ? // NOTE: android bug
            // https://github.com/react-native-community/react-native-maps/issues/2543
            PixelRatio.getPixelSizeForLayoutSize(bottomPadding)
          : bottomPadding,
    };

    const visibleCampuses = [
      userLocation,
      ...(this.currentCampus ? [this.currentCampus] : this.sortedCampuses),
    ];

    this.map.fitToCoordinates(visibleCampuses, {
      edgePadding,
    });
  };

  render() {
    const { onLocationSelect } = this.props;
    const interpolations = this.sortedCampuses.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH,
      ];
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: 'clamp',
      });
      return { opacity };
    });

    return (
      <FlexedView>
        <FlexedMapView
          initialRegion={this.props.initialRegion}
          showsUserLocation
          mapRef={(map) => {
            this.map = map;
          }}
        >
          {this.sortedCampuses.map((campus, index) => {
            const campusOpacity = {
              opacity: interpolations[index].opacity,
            };
            return (
              <Marker
                onPress={() => this.scrollToIndex(index)}
                key={campus.id}
                opacityStyle={campusOpacity}
                latitude={campus.latitude}
                longitude={campus.longitude}
              />
            );
          })}
        </FlexedMapView>
        <Footer>
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 8} // account for padding
            snapToAlignment={'start'}
            decelerationRate={'fast'}
            contentContainerStyle={{
              paddingHorizontal: this.props.theme.sizing.baseUnit * 0.75,
            }}
            ref={(ref) => (this.scrollView = ref)} // eslint-disable-line
            scrollEventThrottle={16} // roughtly 1000ms/60fps = 16ms
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: this.animation,
                    },
                  },
                },
              ],
              { useNativeDriver: true }
            )}
          >
            {this.sortedCampuses.map((campus) => (
              <Touchable
                key={campus.id}
                onPress={() => onLocationSelect(campus)}
              >
                <StyledCampusCard
                  distance={campus.distanceFromLocation}
                  title={campus.name}
                  description={getCampusAddress(campus)}
                  images={[campus.image]}
                />
              </Touchable>
            ))}
          </Animated.ScrollView>
          <MediaPlayerSpacer>
            <PaddedView>
              <Button
                title="Select Campus"
                pill={false}
                type="secondary"
                onPress={() =>
                  onLocationSelect(this.currentCampus || this.sortedCampuses[0])
                }
              />
            </PaddedView>
          </MediaPlayerSpacer>
        </Footer>
      </FlexedView>
    );
  }
}

export default withTheme()(MapView);
