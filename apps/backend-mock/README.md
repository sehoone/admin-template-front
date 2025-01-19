# @vben/backend-mock

## Description

Vben Admin data mock service does not connect to any database. All data is simulated and used to provide data support during front-end development. The online environment no longer provides mock integration. You can deploy services by yourself or connect to real data. Since tools such as `mock.js` have some limitations, such as the inability to upload files and the inability to simulate complex logic, a real backend is used here. services to achieve. The only trouble is that you need to start the back- end service and the front-end service locally at the same time, but this can better simulate the real environment. This service does not need to be started manually. It has been integrated into the vite plug-in and is enabled with the application.

## Running the app

```bash
#development
$ pnpm run start

# production mode
$ pnpm run build
```