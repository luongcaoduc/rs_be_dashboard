class ErrorWithCode extends Error {
  constructor(code) {
    super();
    this.code = code;
  }
}

module.exports = ErrorWithCode;
