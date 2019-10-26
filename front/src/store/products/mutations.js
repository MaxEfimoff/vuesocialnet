function SET_PRODUCTS (state, products) {
  state.products = products;
}

function SET_MY_PRODUCTS (state, myproducts) {
  state.myproducts = myproducts;
}

function SET_FRIENDS_PRODUCTS (state, friendsproducts) {
  state.friendsproducts = friendsproducts;
}

function SET_PRODUCT (state, product) {
  state.product = product;
}

function ADD_PRODUCT (state, product) {
  // Vue.set(state.tasks, product);
  Object.assign(state.tasks, product);
}

export {
  SET_PRODUCTS,
  SET_PRODUCT,
  ADD_PRODUCT,
  SET_MY_PRODUCTS,
  SET_FRIENDS_PRODUCTS
};