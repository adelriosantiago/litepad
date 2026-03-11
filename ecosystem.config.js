const pkg = require("./package.json")

module.exports = {
  apps: [
    {
      name: pkg.name,
      script: pkg.main,
      args: "",
      watch: false,
    },
  ],
}
