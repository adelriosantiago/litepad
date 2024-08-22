const package = require("./package.json")

module.exports = {
  apps: [
    {
      name: package.name,
      script: package.main,
      args: "",
      watch: false,
    },
  ],
}
