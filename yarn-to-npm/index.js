#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");
const path = require("path");
const synp = require("synp");
const chalk = require("chalk");

const packageJsonPath = path.join(process.cwd(), "package.json");

// List of commands that don't need 'npm run'
const directCommands = [
  "jest",
  "eslint",
  "prettier",
  "tsc",
  "sls",
  "serverless",
];

const replaceYarnWithNpm = (scripts) => {
  const updatedScripts = {};

  for (const [key, value] of Object.entries(scripts)) {
    let updatedValue = value;

    if (updatedValue.includes("yarn add")) {
      updatedValue = updatedValue.replaceAll("yarn add", "npm install");
    }

    if (updatedValue.includes("yarn global add")) {
      updatedValue = updatedValue.replaceAll(
        "yarn global add",
        "npm install -g"
      );
    }

    if (updatedValue.includes("yarn remove")) {
      updatedValue = updatedValue.replaceAll("yarn remove", "npm uninstall");
    }

    if (updatedValue.includes("yarn global remove")) {
      updatedValue = updatedValue.replaceAll(
        "yarn global remove",
        "npm uninstall -g"
      );
    }

    if (updatedValue === "yarn install") {
      updatedValue = "npm install";
    }

    if (updatedValue.includes("yarn run")) {
      const command = updatedValue.replaceAll("yarn run ", "");
      if (directCommands.includes(command.split(" ")[0])) {
        updatedValue = command;
      } else {
        updatedValue = `npm run ${command}`;
      }
    }

    if (
      updatedValue.includes("yarn ") &&
      !updatedValue.includes("install") &&
      !updatedValue.includes("add") &&
      !updatedValue.includes("remove") &&
      !updatedValue.includes("global")
    ) {
      const command = updatedValue.replaceAll("yarn ", "");
      if (directCommands.includes(command.split(" ")[0])) {
        updatedValue = command;
      } else {
        updatedValue = `npm run ${command}`;
      }
    }

    updatedScripts[key] = updatedValue;
  }

  return updatedScripts;
};

const convertYarnLockToNpm = () => {
  try {
    synp.convertLock({ yarnLock: path.join(process.cwd(), "yarn.lock") });
    console.log(
      chalk.green("Converted yarn.lock to package-lock.json successfully.")
    );
  } catch (error) {
    console.error(
      chalk.red("Failed to convert yarn.lock to package-lock.json:"),
      error.message
    );
  }
};

const updateScripts = () => {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    if (packageJson.scripts) {
      packageJson.scripts = replaceYarnWithNpm(packageJson.scripts);
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log(
        chalk.green(
          "Updated scripts in package.json to use npm instead of yarn."
        )
      );
    } else {
      console.log(chalk.yellow("No scripts found in package.json."));
    }
  } catch (error) {
    console.error(
      chalk.red("Failed to update package.json scripts:"),
      error.message
    );
  }
};

program
  .version("1.0.0")
  .description("CLI to help migrate projects from Yarn to npm")
  .command("migrate")
  .description(
    "Convert yarn.lock to package-lock.json and update package.json scripts"
  )
  .action(() => {
    convertYarnLockToNpm();
    updateScripts();
  });

program.parse(process.argv);
