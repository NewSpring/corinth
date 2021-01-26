import React from 'react';
import PropTypes from 'prop-types';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { ContentHTMLViewConnected } from '@apollosproject/ui-connected';

import HTMLView, { defaultRenderer } from '@apollosproject/ui-htmlview';
import bugsnag from '../bugsnag';

const handleOnPressAnchor = (url) => InAppBrowser.open(url);

const isLocalImg = (src) => src.startsWith('/');

const customRenderer = (contentId) => (node, ...otherArgs) => {
  if (node.name === 'img' && isLocalImg(node.attribs.src)) {
    bugsnag.notify(new Error(`Bad image URL`), (report) => {
      // eslint-disable-next-line
      report.addMetadata('content', { url: node.attribs.src, contentId });
    });
    return null;
  }
  return defaultRenderer(node, ...otherArgs);
};

const CustomHTMLView = (props) => (
  <HTMLView renderer={customRenderer(props.contentId)} {...props} />
);

CustomHTMLView.propTypes = { contentId: PropTypes.string };

const CustomHTMLViewConnected = (props) => (
  <ContentHTMLViewConnected
    {...props}
    onPressAnchor={handleOnPressAnchor}
    Component={CustomHTMLView}
  />
);

export default CustomHTMLViewConnected;
