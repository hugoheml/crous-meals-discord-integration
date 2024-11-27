const OR = "OU"

export const formatCategories = (categories) => {
  const categoriesList = [];
  for (const category of categories) {
    const dishes = [];
    for (let dish of category.dishes) {
      dish = dish.trim();
      if (dish == "") { continue; }

      if (dish.startsWith(OR)) {
        dishes.push(dish.slice(OR.length + 1).trim());
      } else {
        dishes.push(dish);
      }
    }

    categoriesList.push({ name: category.name.trim().replace('   ', ' - ').replaceAll('  ', ' '), dishes });
  }

  return categoriesList;
}