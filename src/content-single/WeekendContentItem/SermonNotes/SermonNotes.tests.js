import React from 'react';

import Providers from '../../../Providers';
import { renderWithApolloData } from '../../../utils/testUtils';
import getSermonNotes from './getSermonNotes';
import SermonNotes from './SermonNotes';
import SermonNotesConnected from '.';

const contentItemStuff = {
  id: 'WeekendContentItem:123',
  __typename: 'WeekendContentItem',
  title: 'a sermon',
  seriesConnection: {
    __typename: 'SeriesConnection',
    series: { __typename: 'ContentSeriesContentItem', title: 'a series' },
  },
  communicators: [],
  guestCommunicators: [],
};

const notes = [
  {
    id: 'TextNote:123',
    __typename: 'TextNote',
    simpleText: '1. Point One',
    allowsCustomNote: false,
    isHeader: true,
    hasBlanks: true,
    hiddenText: '1. Point ___',
  },
  {
    id: 'TextNote:234',
    __typename: 'TextNote',
    simpleText: 'Sub point',
    allowsCustomNote: true,
    isHeader: false,
    hasBlanks: false,
    hiddenText: null,
  },
  {
    id: 'ScriptureNote:123',
    __typename: 'ScriptureNote',
    simpleText:
      '11) The greatest among you will be your servant.  Matthew 23:11',
    allowsCustomNote: false,
    scripture: {
      __typename: 'Scripture',
      reference: 'Matthew 23:11',
      html:
        '<p class="p"><span data-number="11" data-sid="MAT 23:11" class="v">11</span><span class="wj">The greatest among you will be your servant.</span> </p>',
      copyright:
        '\n          The Holy Bible, New International Version® NIV®\n          Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc.®\n          Used by Permission of Biblica, Inc.® All rights reserved worldwide.\n        ',
      version: 'NIV',
    },
  },
];

const emptyMock = {
  request: {
    query: getSermonNotes,
    variables: { contentID: 'WeekendContentItem:123' },
  },
  result: {
    data: {
      node: {
        sermonNotes: [],
        ...contentItemStuff,
      },
    },
  },
};

const notesMock = { sermonNotes: notes, ...contentItemStuff };

describe('the sermon notes', () => {
  it('renders a custom note block when notes are blank', async () => {
    const tree = await renderWithApolloData(
      <Providers mocks={[emptyMock]}>
        <SermonNotesConnected contentID={'WeekendContentItem:123'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders sermon notes', async () => {
    const tree = await renderWithApolloData(
      <Providers>
        <SermonNotes isLoading={false} {...notesMock} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
