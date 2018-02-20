# Node Express Sequelize Passport 

This example demonstrates how to use Express 4.x, Sequelize 4.x, and Passport to authenticate users using a username and password with form-based authentication and passport google oauth2. Use this example as a starting point for your own web applications.


## Sequelize setup and commands 

    $  npm install --save sequelize pg pg-hstore

    $  npm install -g sequelize-cli


create file .sequelize in root folder containing 

    const path = require('path');

    module.exports = {
      "config": path.resolve('./db/config', 'config.json'),
      "models-path": path.resolve('./db/models'),
      "seeders-path": path.resolve('./db/seeders'),
      "migrations-path": path.resolve('./db/migrations')
    };


Create directory strucure for sequelize 

    $ sequelize init

For other command
  
    $ sequelize -help

Create Model Using Sequelize CLI 
  
    $ sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string

DB migration 
  
    $ sequelize db:migrate

DB Seed
  
    $ sequelize db:seed:all


Add Migrations 

    $ sequelize migration:generate --name add-password-in-user

