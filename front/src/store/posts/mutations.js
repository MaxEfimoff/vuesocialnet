function SET_POSTS (state, posts) {
  state.posts = posts;
}

function SET_MY_POSTS (state, myposts) {
  state.myposts = myposts;
}

function SET_FRIENDS_POSTS (state, friendsposts) {
  state.friendsposts = friendsposts;
}

function SET_POST (state, post) {
  state.post = post;
}

function ADD_POST (state, post) {
  state.posts.unshift(post)
}

export {
  SET_POSTS,
  SET_POST,
  ADD_POST,
  SET_MY_POSTS,
  SET_FRIENDS_POSTS
};