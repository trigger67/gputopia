# GPUtopia

GPUtopia is a marketplace for decentralized GPU compute and related AI services.

Read more in our [FAQ](https://gputopia.ai/docs/faq).

This is the website and app UI at gputopia.ai.

Code is alpha/beta quality. App UI is on v4 beta and kinda works.

See [opensource](https://gputopia.ai/docs/opensource) for more on how our three codebases work together.

## Contributing

See [bounties](https://gputopia.ai/docs/bounties).

## Running locally

You will need to create a .env.local file from [`.env.local.template`](.env.local.template) and to fill at least the database and alby sections to be ably to log in.

### Database

The app is using a mysql database. You can configure one easily [using docker](https://hub.docker.com/_/mysql).

Then connect to your database and run the commands in [createDB.sql](scripts/createDB.sql)

### Alby

The app is using alby to authenticate users.

You will need to create an account on getalby.com and configure an OAuth application [here](https://getalby.com/developer/oauth_clients).

### Run the project

```
$ yarn install
$ yarn dev
```
