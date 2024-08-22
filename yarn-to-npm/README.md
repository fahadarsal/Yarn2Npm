# Yarn to npm

![npm](https://img.shields.io/npm/v/yarn-to-npm)
![license](https://img.shields.io/npm/l/yarn-to-npm)
![downloads](https://img.shields.io/npm/dw/yarn-to-npm)

A CLI tool that simplifies the migration of projects from Yarn to npm. This tool converts the `yarn.lock` file to `package-lock.json` and updates `package.json` scripts to use npm commands.

## Features

- Converts `yarn.lock` to `package-lock.json` using [synp](https://www.npmjs.com/package/synp).
- Updates `package.json` scripts to replace Yarn commands with npm equivalents.
- Handles common Yarn commands like `yarn add`, `yarn remove`, `yarn global`, and shorthand script commands.
- Supports commands that should be run directly, such as `jest`, `eslint`, `prettier`, `tsc`, and `serverless`.

## Installation

You can install the CLI globally via npm:

```bash
npm install -g yarn-to-npm-cli
```

## Usage

To migrate your project from Yarn to npm, navigate to the root of your project directory and run:

```bash
yarn-to-npm migrate
```

This command will:

1. Convert your `yarn.lock` file to a `package-lock.json` file.
2. Update all `yarn` commands in your `package.json` scripts to their npm equivalents.

### Example

Before migration:

```json
"scripts": {
"start": "yarn start && yarn build",
"build": "yarn run build && yarn add lodash",
"test": "yarn test && yarn install",
"lint": "yarn eslint .",
"dev": "yarn run dev"
}
```

After migration:

```json
"scripts": {
"start": "npm run start && npm run build",
"build": "npm run build && npm install lodash",
"test": "npm run test && npm install",
"lint": "eslint .",
"dev": "npm run dev"
}
```

## Options

The CLI is simple to use and currently supports the following command:

- `migrate`: Converts the `yarn.lock` file to `package-lock.json` and updates `package.json` scripts to use npm commands.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [synp](https://github.com/imsnif/synp) - for converting `yarn.lock` to `package-lock.json`.
- [commander.js](https://github.com/tj/commander.js/) - for providing a robust framework for building CLI tools.
- [chalk](https://github.com/chalk/chalk) - for beautiful command-line output.

## Author

- **Fahad Ahmad Arsal** - [GitHub](https://github.com/faarsal)

---

Feel free to reach out if you have any questions or issues!
`
