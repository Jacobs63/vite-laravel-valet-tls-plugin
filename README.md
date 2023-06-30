# A Vite plugin to easily handle Laravel Valet TLS sites

[![Latest Version on NPM](https://img.shields.io/npm/v/vite-laravel-valet-tls-plugin.svg?style=flat-square)](https://npmjs.com/package/vite-laravel-valet-tls-plugin)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![npm](https://img.shields.io/npm/dt/vite-laravel-valet-tls-plugin.svg?style=flat-square)](https://www.npmjs.com/package/vite-laravel-valet-tls-plugin)

The package contains a [Vite](https://vitejs.dev) plugin to easily handle [Laravel Valet](https://laravel.com/docs/10.x/valet) sites in Secure mode with TLS.

## Installation

You can install the package via yarn:

```bash
yarn add vite-laravel-valet-tls-plugin
```

or npm:

```bash
npm install vite-laravel-valet-tls-plugin --save
```

## Usage

Register the plugin in your vite config:

```js
import laravelValetTlsPlugin from 'vite-laravel-valet-tls-plugin'

export default defineConfig({
    plugins: [
        //
        laravelValetTlsPlugin(),
        //
    ],
});
```

Make sure you specify your Valet app url in your `.env`:
```dotenv
MIX_APP_URL=http://my-app.test
```

Optionally, you could explicitly set the Valet app url when configuring the plugin:

```js
import laravelValetTlsPlugin from 'vite-laravel-valet-tls-plugin'

export default defineConfig({
    plugins: [
        //
        laravelValetTlsPlugin({
            host: 'my-app.test'
        }),
        //
    ],
});
```

The plugin will now automatically handle the certificates for you whenever running Vite in development mode.