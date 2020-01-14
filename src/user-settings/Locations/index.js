import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Dimensions } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PaddedView, ButtonLink } from '@apollosproject/ui-kit';
import { get } from 'lodash';

import GET_PRAYERS from '../../prayer/data/queries/getPrayers';
import GET_CAMPUSES from './getCampusLocations';
import CHANGE_CAMPUS from './campusChange';
import MapView from './MapView';

class Location extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: 'Location',
    headerLeft: null,
    headerRight: (
      <PaddedView vertical={false}>
        <ButtonLink onPress={() => navigation.goBack()}>Back</ButtonLink>
      </PaddedView>
    ),
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
      goBack: PropTypes.func,
    }),
    initialRegion: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      latitudeDelta: PropTypes.number,
      longitudeDelta: PropTypes.number,
    }),
  };

  static defaultProps = {
    initialRegion: {
      latitude: 32.916107,
      longitude: -80.974731,
      latitudeDelta: 8,
      longitudeDelta:
        (5 * Dimensions.get('window').width) / Dimensions.get('window').height,
    },
  };

  state = {
    userLocation: {
      latitude: 34.59778,
      longitude: -82.62259,
    },
  };

  async componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      (e) => console.warn('Error getting location!', e),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  render() {
    return (
      <Query
        query={GET_CAMPUSES}
        variables={{
          latitude: this.state.userLocation.latitude,
          longitude: this.state.userLocation.longitude,
        }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data: { campuses, currentUser } = {} }) => (
          <Mutation mutation={CHANGE_CAMPUS}>
            {(handlePress) => (
              <MapView
                navigation={this.props.navigation}
                isLoading={loading}
                error={error}
                campuses={campuses || []}
                initialRegion={this.props.initialRegion}
                userLocation={this.state.userLocation}
                currentCampus={get(currentUser, 'profile.campus')}
                onLocationSelect={async (campus) => {
                  handlePress({
                    variables: {
                      campusId: campus.id,
                    },
                    optimisticResponse: {
                      updateUserCampus: {
                        __typename: 'Mutation',
                        id: currentUser.id,
                        campus,
                      },
                    },
                    refetchQueries: [
                      {
                        query: GET_PRAYERS,
                        variables: { type: 'CAMPUS' },
                      },
                    ],
                  });
                  this.props.navigation.goBack();
                }}
              />
            )}
          </Mutation>
        )}
      </Query>
    );
  }
}

export default Location;
