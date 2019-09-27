function SET_DOCUMENTS (state, documents) {
  state.documents = documents;
}

function SET_DOCUMENT (state, document) {
  state.document = document;
}

function ADD_DOCUMENT(state, document) {
  // Vue.set(state.documents, document);
  Object.assign(state.documents, document);
}

function DELETE_DOCUMENT(state, id) {
  // state.documents = state.documents.filter(document => document._id !== action.payload)
  Vue.delete(state.documents, id);
}

export {
  SET_DOCUMENTS,
  SET_DOCUMENT,
  ADD_DOCUMENT,
  DELETE_DOCUMENT
};