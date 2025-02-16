module.exports = {
    apps: [{
      name: 'crystal-fb',
      script: './src/index.ts', // the path of the script you want to execute,
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      instances: 1,
      autorestart: true,
      watch: false,
      error_file: 'err.log',
      out_file: 'out.log',
      log_file: 'combined.log',
      time: true,
      env: {
      },
    }],
  };