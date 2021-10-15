const handleIngredientsList = (details) => {
  if (details.length !== 0) {
    let keys = Object.keys(details);
    keys = keys.filter((key) => key.includes('Ingredient'));
    keys = keys.map((ingredient, index) => {
      const measure = details[`strMeasure${index + 1}`];
      let stringMeasure = `- ${measure}`;
      if (measure === null) {
        stringMeasure = '';
      }
      return details[ingredient] !== '' && details[ingredient] !== null ? (
        `${details[ingredient]} ${stringMeasure}`) : undefined;
    });
    return keys;
  }
};

export default handleIngredientsList;
