import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import HTMLView, { defaultRenderer } from '@apollosproject/ui-htmlview';
import { ErrorCard } from '@apollosproject/ui-kit';
import bugsnag from '../bugsnag';
import GET_CONTENT_ITEM_CONTENT from './getContentItemContent';

const handleOnPressAnchor = (url) => InAppBrowser.open(url);

const isLocalImg = (src) => src.startsWith('/');

const customRenderer = (contentId) => (node, ...otherArgs) => {
  if (node.name === 'img' && isLocalImg(node.attribs.src)) {
    bugsnag.notify(new Error(`Bad image URL`), (report) => {
      // eslint-disable-next-line
      report.metaData = {
        metaData: { url: node.attribs.src, contentId },
        severity: 'warning',
      };
    });
    return null;
  }
  return defaultRenderer(node, ...otherArgs);
};

const CustomHTMLView = (props) => (
  <HTMLView renderer={customRenderer(props.contentId)} {...props} />
);

CustomHTMLView.propTypes = { contentId: PropTypes.string };

const ContentHTMLViewConnected = ({ Component, contentId }) => {
  if (!contentId) return <HTMLView isLoading />;

  return (
    <Query
      query={GET_CONTENT_ITEM_CONTENT}
      variables={{ contentId }}
      fetchPolicy={'cache-and-network'}
    >
      {({
        data: { node: { htmlContent, summary, id } = {} } = {},
        loading,
        error,
      }) => {
        if (!htmlContent && error) return <ErrorCard error={error} />;
        return (
          <Component
            contentId={id}
            isLoading={!htmlContent && !summary && loading}
            onPressAnchor={handleOnPressAnchor}
          >
            {htmlContent || summary}
          </Component>
        );
      }}
    </Query>
  );
};

ContentHTMLViewConnected.propTypes = {
  contentId: PropTypes.string.isRequired,
  Component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object, // type check for React fragments
  ]),
};

ContentHTMLViewConnected.defaultProps = {
  Component: CustomHTMLView,
};

export default ContentHTMLViewConnected;
