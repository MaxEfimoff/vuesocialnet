function SET_PHOTOS (state, photos) {
  state.photos = photos;
}

function SET_PHOTO (state, photo) {
  state.photo = photo;
}

function ADD_PHOTO(state, photo) {
  Object.assign(state.photos, photo);
}

function DELETE_PHOTO(state, id) {
  Vue.delete(state.photos, id);
}

export {
  SET_PHOTOS,
  SET_PHOTO,
  ADD_PHOTO,
  DELETE_PHOTO
};