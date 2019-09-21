const serverUrl = 'http://localhost:5000';

const getOnePageUrl = `${serverUrl}/pages/getOnePage`;
const resetPasswordUrl = `${serverUrl}/auth/sendRecoveryHash`;
const servicesUrl = `${serverUrl}/pages/getAllServices`;
const newsUrl = `${serverUrl}/news/getAllNews`;
const logoutUrl = `${serverUrl}/auth/logout`;
const checkAuthUrl = `${serverUrl}/auth/check`;
const oneGroupUrl = `${serverUrl}/pages/getOneGroup`;



const loginUrl = `${serverUrl}/api/users/login/`;
const registerUrl = `${serverUrl}/api/users/register/`;
const profileUrl = `${serverUrl}/api/profile/`;
const allGroupsUrl = `${serverUrl}/api/groups/`;
const allPostsUrl = `${serverUrl}/api/posts/`;
const allMessagesUrl = `${serverUrl}/api/messages/`;
const allProfilesUrl = `${serverUrl}/api/profile/all`;
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
  // profileByHandleUrl
};
