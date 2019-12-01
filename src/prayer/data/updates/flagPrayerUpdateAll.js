import GET_GROUP_PRAYERS from '../queries/getGroupPrayers';
import GET_PRAYERS from '../queries/getPrayers';
import GET_CAMPUS_PRAYERS from '../queries/getCampusPrayers';
import GET_SAVED_PRAYERS from '../queries/getSavedPrayers';

export default (cache, id) => {
  const queries = [
    [GET_SAVED_PRAYERS, 'savedPrayers'],
    [GET_PRAYERS, 'prayers'],
    [GET_CAMPUS_PRAYERS, 'campusPrayers'],
    [GET_GROUP_PRAYERS, 'groupPrayers'],
  ];

  queries.forEach((query) => {
    try {
      const data = cache.readQuery({ query: query[0] });
      const filteredPrayers = data[query[1]].filter(
        (filteredPrayer) => filteredPrayer.id !== id
      );
      cache.writeQuery({
        query: query[0],
        data: { [`${query[1]}`]: filteredPrayers },
      });
    } catch (e) {
      console.warn(
        `${query[1]} not in cache. Probably just hasn't been run yet`
      );
    }
  });
};
