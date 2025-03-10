#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to prompt for input
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Function to update package.json files
async function updatePackageJson(projectName) {
  // Update root package.json
  const rootPackagePath = path.join(process.cwd(), "package.json");
  const rootPackage = JSON.parse(fs.readFileSync(rootPackagePath, "utf8"));

  rootPackage.name = projectName;

  fs.writeFileSync(
    rootPackagePath,
    JSON.stringify(rootPackage, null, 2) + "\n"
  );

  console.log("✅ Updated root package.json");

  // Update apps package.json files
  const appsDir = path.join(process.cwd(), "apps");
  if (fs.existsSync(appsDir)) {
    const apps = fs
      .readdirSync(appsDir)
      .filter((file) => fs.statSync(path.join(appsDir, file)).isDirectory());

    for (const app of apps) {
      const appPackagePath = path.join(appsDir, app, "package.json");

      if (fs.existsSync(appPackagePath)) {
        const appPackage = JSON.parse(fs.readFileSync(appPackagePath, "utf8"));

        // Update name to follow the pattern: project-name-app
        appPackage.name = `${projectName}-${app}`;

        fs.writeFileSync(
          appPackagePath,
          JSON.stringify(appPackage, null, 2) + "\n"
        );
        console.log(`✅ Updated ${app} package.json`);
      }
    }
  }
}

// Main function
async function main() {
  console.log("🚀 Welcome to the Universal Turborepo Template setup!");

  const projectName = await prompt("Enter your project name (kebab-case): ");

  if (!projectName) {
    console.log("❌ Project name is required. Exiting setup.");
    process.exit(1);
  }

  // Validate project name (kebab-case)
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(projectName)) {
    console.log(
      "❌ Project name must be in kebab-case (e.g., my-project). Exiting setup."
    );
    process.exit(1);
  }

  // Update package.json files
  await updatePackageJson(projectName);

  console.log(`
🎉 Setup complete! Your project "${projectName}" is ready to go.

Next steps:
1. Run 'yarn install' to install dependencies
2. Start developing with 'yarn dev'

Happy coding! 🚀
  `);

  rl.close();
}

main().catch((error) => {
  console.error("❌ An error occurred during setup:", error);
  process.exit(1);
});
