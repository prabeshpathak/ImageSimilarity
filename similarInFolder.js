// in this file I want to slow some animation while the promise is pending

import readline from "readline";
import { readFiles } from "./readFiles.js";
import { generateHash } from "./generateHash.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const timeOut = [];

const startSpinner = () => {
  let i = 0;
  const frames = [".", "..", "...", ""];
  timeOut.push(
    setInterval(() => {
      process.stdout.write(`\rLoading${frames[i++ % frames.length]}   `);
    }, 100)
  );
};

const stopSpinner = (spinner) => {
  clearInterval(spinner);
  process.stdout.write("\r\x1b[K"); // Clear the line
};

const askQuestions = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer));
  });
};

const closeInterface = () => {
  rl.close();
};

const main = async () => {
  try {
    let pathName = await askQuestions("Enter folder directory: ");
    startSpinner();
    await readFiles(
      (pathName = "./input_images/"),
      async (filename) => {
        await generateHash("./input_images/" + filename);

        // console.log(filename);
      },
      (error) => {
        throw error;
      }
    );
    stopSpinner(timeOut[0]);
  } catch (error) {
    console.error(error);
    stopSpinner(timeOut[0]);
  }
  closeInterface();
};
main();
