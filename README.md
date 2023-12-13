# CaSMM

> Computation and Science Modeling through Making

Cloud-based programming interface

![Deploy Staging](https://github.com/STEM-C/CaSMM/workflows/Deploy%20Staging/badge.svg)
![Deploy Production](https://github.com/STEM-C/CaSMM/workflows/Deploy%20Production/badge.svg)

<br/>

## Application

### `client` 
[client](/client#client) is the frontend of the application. It is powered by [React](https://reactjs.org/) and [Blockly](https://developers.google.com/blockly).

### `server`

[server](/server#server) is the web server and application server. It is powered by [Node](https://nodejs.org/en/) and [Strapi](https://docs-v3.strapi.io/developer-docs/latest/getting-started/introduction.html).

### `compile`

  [compile](/compile#compile) is an arduino compiler service. It is an unofficial fork of [Chromeduino](https://github.com/spaceneedle/Chromeduino).

<br/>

## Environments

> The project is divided into three conceptual environments.

### Development
#### Structure

The development environment is composed of five servers. The first one is run with the [Create React App](https://create-react-app.dev/docs/getting-started/) dev server. The later four are containerized with docker and run with [docker compose](https://docs.docker.com/compose/).

* `casmm-client-dev` - localhost:3000

* `casmm-server-dev` - localhost:1337/admin

* `casmm-compile-dev` 

* `casmm-db-dev` - localhost:5432

  > The first time the db is started, the [init_db.sh](/scripts/init_db.sh) script will run and seed the database with an environment specific dump. Read about Postgres initialization scripts [here](https://github.com/docker-library/docs/blob/master/postgres/README.md#initialization-scripts). To see how to create this dump, look [here](https://github.com/DavidMagda/CaSMM_fork_2023/blob/develop/scripts/readme.md).

* `casmm-compile_queue-dev`

#### Running

`casmm-client-dev`

1. Follow the [client](/client#setup) setup
2. Run `yarn start` from `/client`

`casmm-server-dev`, `casmm-compile-dev`, `casmm-db-dev`, and `casmm-compile_queue-dev`

1. Install [docker](https://docs.docker.com/get-docker/)

2. Run `docker compose up` from `/`

   > Grant permission to the **scripts** and **server** directories if you are prompted
   
### How to update the database and server connections
To update the database and server connections in a Strapi project with a PostgreSQL database, modify the DATABASE_URL environment variable. 
This URL should be in the format postgres://username:password@host:port/database_name. 
Ensure the URL reflects the new database host, port, username, password, and database name. 
For local development, set these details in a .env file at your project's root. 
In a production environment, like Heroku, set DATABASE_URL in the platform's environment variable settings. 
After updating, test the connection by running Strapi and checking the admin panel and API endpoints

### Staging

#### Structure

The staging environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

* `casmm-staging` - [casmm-staging.herokuapp.com](https://casmm-staging.herokuapp.com/)
  * The web dyno runs `server`
  * The compile dyno runs `compile`

#### Running

`casmm-staging` is automatically built from the latest commits to branches matching `release/v[0-9].[0-9]`. Heroku runs the container orchestration from there.

### Production

#### Structure

The production environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

* `casmm` - [www.casmm.org](https://www.casmm.org/)
  * The web dyno runs `server`
  * The compile dyno runs `compile`

#### Running

`casmm` is automatically built from the latest commits to `master`. Heroku runs the container orchestration from there.

<br/>

## Maintenance

All three components of the application have their own dependencies managed in their respective `package.json` files. Run `npm outdated` in each folder to see what packages have new releases. Before updating a package (especially new major versions), ensure that there are no breaking changes. Avoid updating all of the packages at once by running `npm update` because it could lead to breaking changes. 

### Strapi

This is by far the largest and most important dependency we have. Staying up to date with its [releases](https://github.com/strapi/strapi/releases) is important for bug/security fixes and new features. When it comes to actually upgrading Strapi make sure to follow the [migration guides](https://docs-v3.strapi.io/developer-docs/latest/update-migration-guides/migration-guides.html#v3-guides)!

<br/>

## CI/CD

All of the deployments and releases are handled automatically with [GitHub Actions](https://docs.github.com/en/actions). The workflows implement custom [Actions](https://github.com/STEM-C/CaSMM/actions) that live in the [auto](https://github.com/STEM-C/auto) repo.

<br/>

## Contributing

### Git Flow 

> We will follow this git flow for the most part — instead of individual release branches, we will have one to streamline staging deployment 

![Git Flow](https://nvie.com/img/git-model@2x.png)

### Branches

#### Protected

> Locked for direct commits — all commits must be made from a non-protected branch and submitted via a pull request with one approving review

- **master** - Production application

#### Non-protected

> Commits can be made directly to the branch

- **release** - Staging application
- **develop** - Working version of the application
- **feature/<`scaffold`>-<`feature-name`>** - Based off of develop
  - ex. **feature/cms-strapi**
- **hotfix/<`scaffold`>-<`fix-name`>** - Based off of master
  - ex. **hotfix/client-cors**

### Pull Requests

Before submitting a pull request, rebase the feature branch into the target branch to resolve any merge conflicts.

- PRs to **master** should squash and merge
- PRs to all other branches should create a merge commit

## Project 9

Running the project locally follows the same instructions as above (running `docker compose up` from `/` and `yarn start` from `/client`). If the server throws authentication errors when trying to access organization features, in Strapi you will need to give the Admin role permissions to create, delete, and find Organizations, Schools, and Mentors. (This information does not seem to transfer through git.)

### Features added

- Admin role
  - Users can log in as Organization Administrators and have access to the admin-specific features we created.
- Organization dashboard
  - Organizations are displayed in tiles which show their name and schools, and include links to the management pages for the orgs.
- Organization management (creation, deletion, editing)
  - A user can edit an organization’s name and delete it entirely. There is input validation to prevent accidental deletions. There is a form which allows users to create organizations and connect them to schools.
- Account management (creation, deletion, sorting)
  - The accounts in an organization are displayed in a searchable and sortable list.
  - Admin can add and delete accounts.
- School dashboard
  - Schools are displayed as cards in a tile format showing their name and there is a link to create new schools.
  - An admin can view the classrooms within the school and edit its information (name, county, state).
- School creation
  - Form allows admins to create new schools by specifying a name. The school is tied to the organization that is currently being viewed.
- School Editing and Deletion
  - Edit modal on a school tile opens a modal where name, county, and state fields can be edited. Also has a button to delete which requires confirmation by typing the name of the school to prevent accidental deletion.
- Gallery management
  - A landing page where admin can view all the galleries within their organization.
 
### Outstanding work
- Admin-specific display of organizations (in development on `Caleb_backend` branch)
- Allowing admin to access classroom dashboards (in development on `admin-access-to-schools` branch)
- Editing and deletion of classrooms (in development)
- Flag/report galleries and other content for admin review
- Deleting org accounts and data recovery for org accounts

### Built upon
- Existing CASMM architecture (especially the classroom dashboard in `Mentor/Dashboard/Dashboard.jsx`)
- Ant Design Modal and Select for deletion/editing modals (in `DeleteOrgModal.jsx`, `CreateClassroomModal.jsx`, and `EditClassroomModal.jsx`) and selecting schools dropdowns (in `ManageAccount.jsx` and `CreateOrg.jsx`)
