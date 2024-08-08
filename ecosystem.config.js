module.exports = {
  apps: [
    {
      name: "litepad.adelriosantiago.com",
      script: "index.js",
      args: "",
      watch: false,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
}
