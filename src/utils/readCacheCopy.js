import { cloneDeep } from 'lodash';

const readCacheCopy = (cache, query, variables = {}) => {
  const cacheData = cache.readQuery({ query, variables });
  return cloneDeep(cacheData);
};

export default readCacheCopy;
