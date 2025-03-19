import readline from "readline/promises";
import chalk from "chalk";

const API_KEY = "0b4c05d140cb555db5bea837e0d75d51";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getWeather = async (city) => {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`City not found.Please check the city name`);
    }
    const weatherData = await response.json();
~
    console.log(chalk.cyan("\n🌍 Weather Information:"));
    console.log(chalk.green(`📍 City: ${weatherData.name}`));
    console.log(chalk.yellow(`🌡 Temperature: ${weatherData.main.temp}°C`));
    console.log(
      chalk.blue(`🌤 Description: ${weatherData.weather[0].description}`)
    );
    console.log(chalk.magenta(`💧 Humidity: ${weatherData.main.humidity}%`));
    console.log(chalk.cyan(`💨 Wind Speed: ${weatherData.wind.speed} m/s\n`));
  } catch (error) {
    console.log(error);
  }
};

const city = await rl.question("\nEnter a City Name to Check the wheather: ");
await getWeather(city);
rl.close();
