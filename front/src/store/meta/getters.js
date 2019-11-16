function setLocation(state) {
  const {country, city} = state.metadata;
  return (city && country) ? (city + ', ' + country) : '';
}
export {
  setLocation,
};

