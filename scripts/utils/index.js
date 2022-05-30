export function getNickname(str) {
  const strArray = str.split(' ');
  strArray.forEach(function(entry) {
    // eslint-disable-next-line no-unused-vars
    entry += ' ';
  });
  return strArray[0];
}
