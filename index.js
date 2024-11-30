import { getArgs } from "./utilities/args.js";
import * as crous from "crowous";
import { formatCategories } from "./utilities/formatCategories.js";
import { EmbedBuilder, WebhookClient } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const args = getArgs();
const city = args.city;
const ids = args.restaurants?.split(",")?.map((identifier) => parseInt(identifier, 10));

const momentsTranslations = {
  [crous.Moment.LUNCH]: "midi",
  [crous.Moment.DINNER]: "soir",
  [crous.Moment.EVENING]: "matin",
}

if (!city) {
  throw new Error("Please provide a city name");
}

if (!ids || ids.length === 0) {
  throw new Error("Please provide at least one restaurant id");
}

if (!process.env.DISCORD_WEBHOOK_URL) {
  throw new Error("Please provide a Discord webhook URL");
}

const [ webhookId, webhookToken ] = process.env.DISCORD_WEBHOOK_URL.split("/").slice(-2);
if (!webhookId || !webhookToken) {
  throw new Error("Invalid Discord webhook URL");
}

const webhookClient = new WebhookClient({ id: webhookId, token: webhookToken });

const mealsList = [];
const currentDate = new Date();

try {
  const restaurants = await crous.restaurants(city);
  for (const identifier of ids) {
    const restaurant = restaurants.find((restaurant) => restaurant.id === identifier);
    if (!restaurant) {
      throw new Error(`Restaurant with id ${identifier} not found`);
    }

    const meals = crous.meals(restaurant, currentDate);
    mealsList.push({ restaurant, meals });
  }
} catch (e) {
  console.log(e);
  throw new Error(`No restaurants found for ${city}`);
}

for (const { restaurant, meals } of mealsList) {
  if (meals.length === 0) {
    console.log(`No meals found for ${restaurant.name}`);
    continue;
  }

  for (const meal of meals) {
    if (!momentsTranslations[meal.moment]) {
      console.log(`Unknown moment ${meal.moment}`);
      continue;
    }

    const embed = new EmbedBuilder()
    embed.setTitle(`${restaurant.title} - Repas du ${momentsTranslations[meal.moment]} (${currentDate.toLocaleDateString("fr")})`);

    const categories = formatCategories(meal.categories);
    for (const category of categories) {
      embed.addFields({
        name: category.name,
        value: category.dishes.map((meal) => `- ${meal}`).join("\n"),
        inline: true
      })
    }
    if (embed.data.fields.length == 0) { 
      console.log(`No meals found for ${restaurant.name}`);
      continue; 
    }

    embed.setColor('#d02e26')
    embed.setFooter({ text: "Powered by Crowous npm package" });
    embed.setTimestamp();

    webhookClient.send({
      username: "Qu'est ce qu'on mange aujourd'hui ?",
      avatarURL: "https://i.imgur.com/HhmnK2P.png",
      embeds: [embed]
    })
  }
}
