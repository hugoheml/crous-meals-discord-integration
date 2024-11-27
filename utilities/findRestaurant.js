import * as crous from "crowous";
import { getArgs } from "./args.js";

const identifier = getArgs().city;
if (!identifier) {
  throw new Error("Please provide a city name");
}

try {
  const restaurants = await crous.restaurants(identifier);
   
  for (const restaurant of restaurants) {
    console.log(restaurant.title);
    console.log("Address:", restaurant.address);
    console.log("Id:", restaurant.id);
  }
} catch (e) {
  throw new Error(`No restaurants found for ${identifier}`);
}