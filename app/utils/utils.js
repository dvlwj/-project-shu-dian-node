exports.checkIfObjectEmpty = function checkIfObjectEmpty(data) {
  return Object.keys(data).length === 0;
};
exports.checkIfPropertyEmpty = function checkIfPropertyEmpty(data) {
  return data === undefined;
};
