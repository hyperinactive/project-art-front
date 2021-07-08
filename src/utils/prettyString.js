const prettyString = (str, limit) => {
  if (str.length > limit) {
    return `${str.substring(0, limit).trim()}...`;
  }
  return str;
};

export default prettyString;
