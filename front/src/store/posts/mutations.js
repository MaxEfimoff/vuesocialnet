function SET_POSTS (state, posts) {
  state.posts = posts;
}

function SET_POST (state, post) {
  state.post = post;
}

export {
  SET_POSTS,
  SET_POST
};