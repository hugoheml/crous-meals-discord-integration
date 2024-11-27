# Crous Meals  Discord Integration
This is a script that uses [Crowous NPM Package](https://npmjs.com/package/crowous) to get the meals of the current day from the Crous API and send it to a Discord channel using a **Discord Webhook**.

## Installation
1. Clone the repository
2. Install the dependencies using `npm install`
3. Duplicate the `.env.example` file and rename it to `.env`
4. Fill the `.env` file with your Discord Webhook URL

## Usage
### Get the restaurant id
Before launch the script, **you need to get the restaurant id** of the Crous restaurant you want to get the meals from.
You can get the **restaurant id by running** `node utilities/findRestaurant.js --city={{ restaurantCityName }}` where `restaurantCityName` is the **city of the restaurant**.
You will see a **list of restaurants with their id**, copy the **id of the restaurant** you want to get the meals from.

### Launch the script
To launch the script, **run `node index.js --restaurant={{ restaurantId }} --city={{ city }}`** where `restaurantId` is the **id of the restaurant** you want to get the meals from and `city` is the **city of the restaurant**.

## GitHub Actions
This repository is using GitHub Actions to run the script every day at 6:00 AM UTC. You can find the workflow file in the `.github/workflows` directory.

## Contributing
If you want to contribute to this project, feel free to fork the repository and submit a pull request.