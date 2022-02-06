## For developers
### Installation


All microservice basic dependencies are listed in the package.json file, hence there is no need to install any global packages. Simply run npm install.

```
npm install
```

**NOTE:** if you required additional packages, ensure you install using --save-exact so that your project is compatible when other developers contribute.

Example:

```
npm install axios --save --save-exact
```

### Start development server
```
npm start
```

### Run tests

Test cases be written and then added to the ./test/index.ts file for compilation.
You are also able to add tests to the

### Deployment

#### Prerequites
Before deploying, the following prerequisites need to met:

* [Docker](https://docs.docker.com/install/) needs to be installed on the host server.
* [bridge network](https://docs.docker.com/engine/reference/commandline/network_create/) needs to be created using docker on the host server to link microservices.
* [git](https://gist.github.com/derhuerst/1b15ff4652a867391f03) needs to be installed on the host server.
* [ssh](https://confluence.atlassian.com/bitbucketserver/creating-ssh-keys-776639788.html) key link to project so that git pull is possible using ssh.
* [npm token](https://docs.npmjs.com/files/npmrc) (optional) so that you can install @sosafe packages if there is such a dependency.

#### Installation
1. clone solution
    To install the solution, first clone the repo to the host server
    ```
    git clone https://github.com/etizaz98/deck-api
    ```
    In some cases, you may need to activate your ssh-agent to link your local private key to the command in the following manner:
    ```
    eval $(ssh-agent -s) && $(ssh-add /path/to/your/.ssh/id_rsa; git pull https://github.com/etizaz98/deck-api)
    ```

2. build docker container
   simply run
   ```
   sudo docker-compose up -d
   ```

### Technical users

The microservice has the following  urls
For Testing
* http://localhost:port/api/v1/tests                      - Test status of solution
For Ping
* http://localhost:port/api/v1/ping                     - Check Application is working fine




### Scripts

kindly create a .env file having the following variables change it according to your database access also kindly update API_KEY Accordingly
```
PG_HOST=localhost
PG_DATABASE=katana
PG_USER=katana
PG_PASSWORD=katana
PG_PORT=5428
PORT=3008
```
before start creates cards
to create the cards table call the following post request 
http://localhost:port/api/v1/deck/createcards


to get the postman collections kindly import it from the following link thanks
https://www.getpostman.com/collections/a4dd5cffbaff37503b29

import it and change your port accordingly

In case of any issue kindly write me an email to : etizaz7ahsan@gmail.com Thank you
