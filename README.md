## Scrabble Score Calculator

A very simple scrabble score calculator built with Next.js, Nest.js, and MongoDB.

## Running the app with Docker

```bash
# docker-compose up
$ yarn docker:up

# docker-compose down
$ yarn docker:down

# docker-compose down with volume cleaned
$ yarn docker:down:clean
```

## Installation

```bash
$ yarn install
```

## Datebase setup locally

```bash
# start up volume
$ yarn docker:up:local

# stop volume
$ yarn docker:down:local

# stop and delete volume
$ yarn docker:down:clean:local
```

## Running the app locally

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If
you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
