const pkg = require("./package.json")

module.exports = {
  apps: [
    {
      name: `prod@${pkg.name}`,
      script: pkg.main,
      args: "",
      cwd: __dirname,
      interpreter: "node",
      exec_mode: "fork",
      watch: false,
      instances: 1,
    },
  ],
}
