// creates a new object without undefined values
const destructurizationHelper = (obj, ...values) => {
  const result = {};

  values.forEach(value => {
    if (obj[value] !== undefined) {
      result[value] = obj[value];
    }
  });

  return result;
};

module.exports = destructurizationHelper;
