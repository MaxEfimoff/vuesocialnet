const serverUrl = 'http://localhost:5000';

const getOnePageUrl = `${serverUrl}/pages/getOnePage`;
const resetPasswordUrl = `${serverUrl}/auth/sendRecoveryHash`;
const servicesUrl = `${serverUrl}/pages/getAllServices`;
const newsUrl = `${serverUrl}/news/getAllNews`;
const logoutUrl = `${serverUrl}/auth/logout`;
const checkAuthUrl = `${serverUrl}/auth/check`;
const oneGroupUrl = `${serverUrl}/pages/getOneGroup`;


// Auth
const loginUrl = `${serverUrl}/api/users/login/`;
const registerUrl = `${serverUrl}/api/users/register/`;
// Profile
const profileUrl = `${serverUrl}/api/profile/`;
const allProfilesUrl = `${serverUrl}/api/profile/all`;
// Posts
const addPostUrl = `${serverUrl}/api/posts`;
const allPostsUrl = `${serverUrl}/api/posts/`;
const myPostsUrl = `${serverUrl}/api/posts/my-posts`;
const friendsPostsUrl = `${serverUrl}/api/posts/friends-posts`;
// Notes
const addNoteUrl = `${serverUrl}/api/notes`;
const allNotesUrl = `${serverUrl}/api/notes/`;
// Documents
const addDocumentUrl = `${serverUrl}/api/documents`;
const allDocumentsUrl = `${serverUrl}/api/documents/`;
// Photos
const addPhotoUrl = `${serverUrl}/api/photos`;
const allPhotosUrl = `${serverUrl}/api/photos/`;
// Messages
const addMessageUrl = `${serverUrl}/api/messages`;
const allMessagesUrl = `${serverUrl}/api/messages/`;
// Friends
const addToFriendsUrl = `${serverUrl}/api/profile/friends`
const allFriendsUrl = `${serverUrl}/api/friends/`;
// Groups
const allGroupsUrl = `${serverUrl}/api/groups/`;
const manageGroupsUrl = `${serverUrl}/api/groups/manage-groups`;
const myGroupsUrl = `${serverUrl}/api/groups/my-groups`;
const createGroupUrl = `${serverUrl}/api/groups/create-group`;
// const subscribeGroupUrl = `${serverUrl}/api/groups/subscribe/`;
// const profileByHandleUrl = `${serverUrl}/api/profile/handle/${handle}`;

export {
  serverUrl,
  registerUrl,
  resetPasswordUrl,
  servicesUrl,
  loginUrl,
  newsUrl,
  logoutUrl,
  checkAuthUrl,
  getOnePageUrl,
  allGroupsUrl,
  oneGroupUrl,
  profileUrl,
  allPostsUrl,
  allMessagesUrl,
  allProfilesUrl,
  allNotesUrl,
  allFriendsUrl,
  addPostUrl,
  addNoteUrl,
  addMessageUrl,
  addToFriendsUrl,
  addDocumentUrl,
  allDocumentsUrl,
  addPhotoUrl,
  allPhotosUrl,
  myPostsUrl,
  friendsPostsUrl,
  createGroupUrl,
  manageGroupsUrl,
  myGroupsUrl
  // profileByHandleUrl
};
