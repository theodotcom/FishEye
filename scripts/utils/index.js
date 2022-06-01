/* eslint-disable no-unused-vars */
export function getNickname(str) {
  const strArray = str.split(' ');
  strArray.forEach(function(entry) {
    entry += ' ';
  });
  return strArray[0];
}
