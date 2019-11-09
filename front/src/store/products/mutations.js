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

function RESET_PRODUCT (state) {
  state.product = {};
}

function RESET_PRODUCTS (state) {
  state.products = [];
}

function RESET_MY_PRODUCTS (state) {
  state.myproducts = [];
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
  RESET_PRODUCT,
  RESET_PRODUCTS,
  RESET_MY_PRODUCTS
};