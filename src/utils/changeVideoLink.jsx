const changeVideoLink = (path, player) => {
  if (path.includes('comidas') && player) {
    player = player.replace('watch?v=', 'embed/');
    return player;
  }
  return player;
};

export default changeVideoLink;
