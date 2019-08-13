# Sendsteps dashboard

This is app to manage your presentation which you can create  in PowerPoint using plugin.

dashboard.sendsteps.com - current old dashboard version<br />
sendsteps.me - response site

## Getting started

Clone the repository

checkout to the branch keenEthics
git clone https://github.com/keenethics/sendsteps-dashboard.git
```

Navigate to your repository folder, then to the dashboard folder

```bash
cd dashboard-new/dashboard
```
Install the project dependencies:

```bash
npm i
```
Create `.env` file from example and make sure it has correct values:

```bash
cp .env.example .env
```
This project using MariaDB as database. You need to install it locally
here is helpfull link for Ubuntu [Install MariaDB on Ubuntu](https://computingforgeeks.com/how-to-install-mariadb-10-4-on-ubuntu-18-04-ubuntu-16-04/)

Create database with some test data<br />
(you will need to change creadantional in package.json:<br />
  YOUR_USER - your user name for MariaDB<br />
  YOUR_PASSWORD - your password for user in MariaDB)

```bash
npm run migration
```
or run the command, where generate_addis.sql - path to SQL file
```bash
mysql -u YOUR_USER -p YOUR_PASSWORD < generate_addis.sql
```

Running the project in development mode:

```bash
npm run dev
```
navigate to localhost:3000 in your browser.

## Start project in production mode

Make project build:

```bash
npm run build-prod
```
Run the project:

```bash
npm run start-prod
```
navigate to localhost:3001 in your browser.

## Photo uploader

App using [Rackspace](https://developer.rackspace.com/sdks/node-js/) CDN for photo uploading

## Email sending

App using [Mandrill](https://mandrillapp.com/api/docs/index.nodejs.html) for sending emails

## Other

We are using [sequelize](http://docs.sequelizejs.com/manual/tutorial/migrations.html) ORM for working with database

Folders: /api-bastet /api-common /api-nova - is the old backend PHP logic
