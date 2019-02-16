export default obj => {
  var result = Object.create(obj);
  for (const key in result) {
    result[key] = result[key];
  }
  return result;
};
