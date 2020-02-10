// TODO don't think we'll need this file at all
import GET_PRAYERS from '../queries/getPrayerFeed';

export default (cache, id) => {
  const types = ['', 'SAVED', 'CAMPUS', 'GROUP'];

  types.forEach((type) => {
    try {
      const { prayers } = cache.readQuery({
        query: GET_PRAYERS,
        variables: type !== '' ? type : null,
      });
      const filteredPrayers = prayers.filter(
        (filteredPrayer) => filteredPrayer.id !== id
      );
      cache.writeQuery({
        query: GET_PRAYERS,
        variables: type !== '' ? type : null,
        data: { prayers: filteredPrayers },
      });
    } catch (e) {
      console.warn(
        `${type} prayers not in cache. Probably just hasn't been run yet.`
      );
    }
  });
};
