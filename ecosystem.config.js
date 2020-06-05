module.exports = {
  apps: [
    {
      name: "LinksApp",
      script: "./scripts/start.sh",
      args: "",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      user: "zeko",
      host: "167.86.117.186",
      ref: "origin/master",
      repo: "git@github.com:Zeko369/links-app.git",
      path: "/home/zeko/deploy-links",
      "post-deploy": "./scripts/postDeploy.sh",
    },
  },
}
