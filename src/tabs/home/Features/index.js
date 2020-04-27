import React, { memo } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
// import PropTypes from 'prop-types';

import { AnalyticsConsumer } from '@apollosproject/ui-analytics';
import ActionListFeature from './ActionListFeature';
import CampaignItemListFeature from './CampaignItemListFeature';
import HorizontalCardListFeature from './HorizontalCardListFeature';
import VerticalCardListFeature from './VerticalCardListFeature';

import GET_FEED_FEATURES from './getFeedFeatures';

const handleOnPressActionItem = ({
  action,
  navigation,
  relatedNode,
  track,
}) => {
  if (action === 'READ_CONTENT') {
    navigation.navigate('ContentSingle', {
      itemId: relatedNode.id,
      transitionKey: 2,
    });
  }
  if (action === 'READ_EVENT') {
    navigation.navigate('Event', {
      eventId: relatedNode.id,
      transitionKey: 2,
    });
  }
  track({
    eventName: `Clicked Home Feed Feature`,
    properties: [
      {
        field: 'Node ID',
        value: relatedNode.id,
      },
    ],
  });
};

const actionListLoadingStateData = [
  {
    id: 'fakeId1',
    title: '',
    subtitle: '',
    parentChannel: {
      id: '',
      name: '',
    },
    image: {
      sources: [
        {
          uri: '',
        },
      ],
    },
  },
  {
    id: 'fakeId2',
    title: '',
    subtitle: '',
    parentChannel: {
      id: '',
      name: '',
    },
    image: {
      sources: [
        {
          uri: '',
        },
      ],
    },
  },
  {
    id: 'fakeId3',
    title: '',
    subtitle: '',
    parentChannel: {
      id: '',
      name: '',
    },
    image: {
      sources: [
        {
          uri: '',
        },
      ],
    },
  },
  {
    id: 'fakeId4',
    title: '',
    subtitle: '',
    parentChannel: {
      id: '',
      name: '',
    },
    image: {
      sources: [
        {
          uri: '',
        },
      ],
    },
  },
];

const Features = memo(({ navigation }) => (
  <Query query={GET_FEED_FEATURES} fetchPolicy="cache-and-network">
    {({ data: features, loading }) =>
      get(features, 'userFeedFeatures', []).map(
        ({
          actions,
          cards,
          id,
          isFeatured,
          subtitle,
          title,
          __typename,
          ...props
        }) => {
          switch (__typename) {
            case 'ActionListFeature':
              return (
                <AnalyticsConsumer>
                  {({ track }) => (
                    <ActionListFeature
                      // TODO: How can we better handle generating a loading state.
                      actions={loading ? actionListLoadingStateData : actions}
                      isLoading={loading}
                      onPressActionItem={({ action, relatedNode }) =>
                        handleOnPressActionItem({
                          action,
                          navigation,
                          relatedNode,
                          track,
                        })
                      }
                      subtitle={subtitle}
                      title={title}
                      {...props}
                    />
                  )}
                </AnalyticsConsumer>
              );
            case 'HorizontalCardListFeature':
              return (
                <AnalyticsConsumer>
                  {({ track }) => (
                    <HorizontalCardListFeature
                      cards={cards.map(({ actionIcon, ...card }) => ({
                        ...card,
                        ...(actionIcon != null
                          ? { actionIcon: card.actionIcon }
                          : {}),
                        coverImage: get(card, 'coverImage.sources', undefined),
                        __typename: card.relatedNode.__typename,
                        id: card.relatedNode.id,
                      }))}
                      isLoading={loading}
                      listKey={id}
                      onPressItem={({ action, relatedNode }) =>
                        handleOnPressActionItem({
                          action,
                          relatedNode,
                          navigation,
                          track,
                        })
                      }
                      subtitle={subtitle}
                    />
                  )}
                </AnalyticsConsumer>
              );
            case 'VerticalCardListFeature': // eslint-disable-line no-case-declarations
              const Component = isFeatured
                ? CampaignItemListFeature
                : VerticalCardListFeature;
              return (
                <AnalyticsConsumer>
                  {({ track }) => (
                    <Component
                      cards={cards.map(({ actionIcon, ...card }) => ({
                        ...card,
                        ...(actionIcon != null
                          ? { actionIcon: card.actionIcon }
                          : {}),
                        coverImage: get(card, 'coverImage.sources', undefined),
                        __typename: card.relatedNode.__typename,
                      }))}
                      isLoading={loading}
                      listKey={id}
                      onPressItem={({ action, relatedNode }) =>
                        handleOnPressActionItem({
                          action,
                          relatedNode,
                          navigation,
                          track,
                        })
                      }
                      subtitle={subtitle}
                      title={title}
                    />
                  )}
                </AnalyticsConsumer>
              );
            default:
              return null;
          }
        }
      )
    }
  </Query>
));

Features.displayName = 'Features';

export default Features;
