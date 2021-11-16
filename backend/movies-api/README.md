## Description

### This is a super fast and smart rest-api to simply search movies. It has been built to showcase the best practices and industry standards for building a scalable and maintainable codebase. Features include: 
1. Automated OpenAPI Spec document generation via swagger from code     
2. Aggregates Youtube Search Api and The Movie Database Api and smartly builds search results     
3. Caching for fast performance     
4. Opinionated convention over confiration approach in codebase and strict type/format checking to enforce self-documentation and code readability
5. Use of object oriented, functional programming and reactive programming where each is suitable
6. Input, Response and Request validation using decorators
7. Unit & Integration tests
8. Authentication
9. Logging
10. Api Healthcheck    


## Prerequisites for running locally     
* Nodejs      
* Nestjs Cli. Install with command ```npm i -g @nest/cli```     
### Optional
* Install and use Vscode
* Install Prettier extension in vscode
* Install EsLint extension in vscode

## Instructions      
* Install latest nodejs     
* Install Nestjs cli      
* For environment, create a new .env file in the project root. Copy sample.env file's content and in it. Finally, insert required credentials i.e. Youtube api key and you are good to go!       


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Developer - [Osama Ishtiaq](https://osamaishtiaq.github.io/)

