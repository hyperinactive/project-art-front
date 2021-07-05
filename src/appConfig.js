const config = {
  baseURL: process.env.REACT_APP_BASE_URL,
  // baseURL: process.env.REACT_APP_BASE_URL_PROD,
  welcome: `${process.env.PUBLIC_URL}/hello.gif`,
  wip: `${process.env.PUBLIC_URL}/wip.jpeg`,
  defaultAvatar: `${process.env.PUBLIC_URL}/defaults/defaultAvatar.jpeg`,
  example1: `${process.env.PUBLIC_URL}/defaults/example1.png`,
  example2: `${process.env.PUBLIC_URL}/defaults/example2.jpeg`,
  example3: `${process.env.PUBLIC_URL}/defaults/example3.gif`,
  example4: `${process.env.PUBLIC_URL}/defaults/example4.gif`,
  backgroundGradient: `${process.env.PUBLIC_URL}/defaults/projectArtBackground.jpg`,
  backgroundGradientInverted: `${process.env.PUBLIC_URL}/defaults/projectArtBackgroundInverted.jpg`,
};

module.exports = config;
