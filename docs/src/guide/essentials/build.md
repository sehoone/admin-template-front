# Build and deploy

::: tip Preface

Since it is a display project, it is relatively large after packaging. If there are no plug-ins used in the project, you can delete the corresponding files or routes without citing them. If there are no references, they will not be packaged.

:::

## Build

After the project development is completed, execute the following command to build:

**Note:** Please execute the following command in the project root directory

```bash
pnpm build
```

After the build and packaging is successful, a `dist` folder under the corresponding application will be generated in the root directory, which contains the built and packaged files, for example: `apps/web-antd/dist/`

## Preview

You can preview locally before publishing. There are many ways. Here are two:

- Use project-customized commands to preview (recommended)

**Note:** Please execute the following command in the project root directory

```bash
pnpm preview
```

After waiting for the build to be successful, visit `http://localhost:4173` to view the effect.

- Local server preview

You can install the `serve` service globally on the computer, such as `live-server`,

```bash
npm i -g live-server
```

Then execute the `live-server` command in the `dist` directory to view the effect locally.

```bash
cd apps/web-antd/dist
# Local preview, default port 8080
live-server
#Specify port
live-server --port 9000
```

## Compression

### Enable `gzip` compression

You need to change the `.env.production` configuration when packaging:

```bash
VITE_COMPRESS=gzip
```

### Enable `brotli` compression

You need to change the `.env.production` configuration when packaging:

```bash
VITE_COMPRESS=brotli
```

### Enable `gzip` and `brotli` compression at the same time

You need to change the `.env.production` configuration when packaging:

```bash
VITE_COMPRESS=gzip,brotli
```

::: tip tip

Both `gzip` and `brotli` require specific modules to be installed in order to be used.

:::

::: details gzip and brotli configuration in nginx

```bash
http {
  # enable gzip
  gzip on;
  # Enable gzip_static
  # gzip_static may report an error after being turned on. You need to install the corresponding module. You can check the specific installation method by yourself.
  # Only if this is enabled, the .gz file packaged by the vue file will be effective, otherwise there is no need to enable gzip for packaging.
  gzip_static on;
  gzip_proxied any;
  gzip_min_length 1k;
  gzip_buffers 4 16k;
  #If a multi-layer proxy is used in nginx, this must be set to enable gzip.
  gzip_http_version 1.0;
  gzip_comp_level 2;
  gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
  gzip_vary off;
  gzip_disable "MSIE [1-6]\.";

  # Enable brotli compression
  # The corresponding nginx module needs to be installed. You can check the specific installation method by yourself.
  # Can coexist with gzip without conflict
  brotli on;
  brotli_comp_level 6;
  brotli_buffers 16 8k;
  brotli_min_length 20;
  brotli_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/javascript image/svg+xml;
}
```

:::

## Build analysis

If your build file is large, you can use the project's built-in [rollup-plugin-analyzer](https://github.com/doesdev/rollup-plugin-analyzer) plug-in to perform code volume analysis to optimize your code. Just execute the following command in the `root directory`:

```bash
pnpm run build:analyze
```

After running, you can see the specific volume distribution on the automatically opened page to analyze which dependencies have problems.

![Build analysis report](/guide/report.png)

## Deployment

A simple deployment only requires publishing the final generated static files and the static files in the dist folder to your cdn or static server. It should be noted that the index.html is usually the entry page of your background service. After confirming After making js and css static, you may need to change the introduction path of the page.

For example, to upload to the nginx server, you can upload the files in the dist folder to the `/srv/www/project/index.html` directory of the server, and then access the configured domain name.

```bash
# nginx configuration
location/{
  # Do not cache html to prevent the cache from continuing to take effect after the program is updated.
  if ($request_filename ~* .*\.(?:htm|html)$) {
    add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
    access_log on;
  }
  # Here is the storage path of the files in the vue packaged file dist
  root /srv/www/project/;
  index index.html index.htm;
}
```

You may find that the resource path is incorrect during deployment. You only need to modify the `.env.production` file.

```bash
# Configure changes according to your own path
# Note that it needs to start and end with /
VITE_BASE=/
VITE_BASE=/xxx/
```

### Combination of front-end routing and server

The project front-end routing uses vue-router, so you can choose two methods: history and hash.

- `hash` will splice `#` after the url by default
- `history` will not, but `history` requires the cooperation of the server

Mode modifications can be made within `.env.production`

```bash
VITE_ROUTER_HISTORY=hash
```

### history Server configuration in routing mode

Enabling `history` mode requires server configuration. For more server configuration details, please see [history-mode](https://router.vuejs.org/guide/essentials/history-mode.html#html5-mode)

Here we take the `nginx` configuration as an example:

#### Deploy to root directory

```bash {5}
server {
  listen 80;
  location/{
    # For use with History
    try_files $uri $uri/ /index.html;
  }
}
```

#### Deploy to non-root directory

- First you need to change the `.env.production` configuration when packaging:

```bash
VITE_BASE = /sub/
```

- Then configure it in the nginx configuration file

```bash {8}
server {
    listen 80;
    server_name localhost;
    location /sub/ {
      # Here is the storage path of the files in the vue packaged file dist
      alias /srv/www/project/;
      index index.html index.htm;
      try_files $uri $uri/ /sub/index.html;
    }
}
```

## Cross-domain processing

Use nginx to handle cross-domain issues after project deployment

1. Configure the front-end project interface address in the ``.env.production` file in the project directory:

```bash
VITE_GLOB_API_URL=/api
```

2. Configure nginx to forward requests to the background

```bash {10-11}
server {
  listen 8080;
  server_name localhost;
  #Interface proxy, used to solve cross-domain problems
  location /api {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    #Backend interface address
    proxy_pass http://110.110.1.1:8080/api;
    rewrite "^/api/(.*)$" /$1 break;
    proxy_redirect default;
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Headers X-Requested-With;
    add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
  }
}
```