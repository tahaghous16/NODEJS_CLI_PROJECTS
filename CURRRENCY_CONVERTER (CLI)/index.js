import https from "https";
import readline from "readline/promises";
import chalk from "chalk";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const apiKey = "b6701961c770b5f75a54bc53"; 
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const convertCurrency = (amount, rate) => {
  return (amount * rate).toFixed(2);
};

https
  .get(url, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", async () => {
      try {
        const rates = JSON.parse(data).conversion_rates;

        const amountStr = await rl.question("Enter the Amount in USD: ");
        const amount = parseFloat(amountStr);

        if (isNaN(amount) || amount <= 0) {
          console.log(
            chalk.red("Invalid amount. Please enter a valid number.")
          );
          rl.close();
          return;
        }

        const currency = await rl.question(
          "Enter the Target Currency (E.g: PKR,EUR): "
        );
        const rate = rates[currency.toUpperCase()];

        if (rate) {
          console.log(
            chalk.blue.bgGreen.bold(
              `${amount} USD is approximately ${convertCurrency(
                amount,
                rate
              )} ${currency.toUpperCase()}`
            )
          );
        } else {
          console.log(chalk.red("Invalid Currency Code"));
        }
      } catch (err) {
        console.log(
          chalk.red("Error processing exchange rate data: "),
          err.message
        );
      } finally {
        rl.close();
      }
    });
  })
  .on("error", (err) => {
    console.log(chalk.red("Error fetching data: " + err.message));
    rl.close();
  });
