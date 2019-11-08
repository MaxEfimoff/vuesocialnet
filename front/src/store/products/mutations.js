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

function RESET_PRODUCT (state, product) {
  state.product = {};
}

function ADD_PRODUCT (state, product) {
  state.products.unshift(product)
}

export {
  SET_PRODUCTS,
  SET_PRODUCT,
  ADD_PRODUCT,
  SET_MY_PRODUCTS,
  SET_FRIENDS_PRODUCTS,
  RESET_PRODUCT
};