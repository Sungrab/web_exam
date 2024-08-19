const addOneQuery = async (query) => {
    try{
      const options = {
        method: 'POST',
        body: JSON.stringify(query),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await fetch('/api/queries', options);
      const newQuery = await res.json();

      // eslint-disable-next-line no-console
      console.log(`Frontend newQuery after fetch: + ${newQuery}` , newQuery);

      return newQuery;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('addOneQuery::error: ', err);
      throw err;
    }
};

const getAllQueries = async () => {
    try {
      const res = await fetch('/api/queries');
      const queries = await res.json();
      return queries;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('getAllQueries::error: ', err);
      throw err;
    }
};

export { addOneQuery, getAllQueries };