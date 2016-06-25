module.exports = (init) => {
  return Object.assign(
    require('../pull/js-eval')(init),
    require('../push/random-time')(init));
};
