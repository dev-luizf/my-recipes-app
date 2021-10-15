export async function fetchRandomFood() {
  const randomFood = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  return randomFood.json();
}

export async function fetchRandomDrink() {
  const randomDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  return randomDrink.json();
}
