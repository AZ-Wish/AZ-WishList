# AZwish List

AZwish List Version 1.2 — [Change log](CHANGELOG.md)

Extension: [Chrome web store](https://chrome.google.com/webstore/detail/az-wish/abphgoldafiaioaljbhgdhjhailijkkn) 

Code: [Github repository](https://github.com/AZ-Wish/bew)

## Requirements

To use Manifest v3 you will need to use Quasar CLI with Vite instead of Quasar CLI with Webpack.


## Install the dependencies

```bash
yarn
```
If the next step you find problems starting the App, you can try making a 'npm install' before repeating this step. Even deleting the node_modules folder and yarn.lock file and repeating this step.

### Update dependencies (not required !!!)
View outdated dependencies and audit vulnerabilities

```bash
npm outdated

npm audit
```

Fix security vulnerabilities

```bash
npm audit fix
```


Update yarn and packages if you feel brave (it could break everything)
```bash
yarn set version stable
yarn install

npm update
```

### Lint the files

Hide warnings with the --quiet flag

```bash
yarn lint --quiet
```

### Images

[Doc](https://quasar.dev/quasar-cli-webpack/handling-assets/)

Statis images must be placed in '/public/..'' and '/src/assets/..''

And are automatically copied to ZIP:/www/..

### Build the extension in development mode (hot-code reloading, error reporting, etc.)

```bash
yarn dev -m bex
```

Will create all the required files and the \www folder inside \bew\src-bex

After building the Chrome extension:

- Open Chrome tab: chrome://extensions/
- Press button "Load unpacked"
- Select folder:
  - Dev:  \AZ-WishList\src-bex

Include hot-reload even in the current running Chrome extension. Most of the changes works refreshing the browser page some source files requires refreshing the extension using the cycle icon in the extension page ( chrome://extensions/ ) 

### Build the Chrome extension for preproduction and production
```bash
quasar build -m bex
```

Will build a production version ZIP file inside \dist\bex

### Install and test the Chrome extension in Preproduction:

After building the Chrome extension:

- Open Chrome tab: chrome://extensions/
- Drop file:
  - Pro:  C:\IGZ\Proyectos\Personal\Amazon_wishlist\AZ-WishList\dist\bex\Packaged.az-wishlist.zip 

To test the Chrome extension just browse to your Amazon WishList page or load:
https://www.amazon.es/gp/registry/wishlist

At first you´ll see an empty list, wait while your Wish List is loaded.


### Publish Chrome extension in Production:

[AZwish List - Chrome Web Store page](https://chrome.google.com/webstore/devconsole/42db463a-bca9-4d00-93dc-d9d100c27e5a/abphgoldafiaioaljbhgdhjhailijkkn/edit/package?hl=en-GB)

In the Build/Package section press 'Upload new package' and select the same ZIP file from previous step.

Update the 'Store listing' and 'Privacy' fields and "Publish changes"

Check status at [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/42db463a-bca9-4d00-93dc-d9d100c27e5a?hl=en-GB)


~~DEPRECATED: Keep your key file in a safe place. You will need it to create new versions of your extension.~~

~~C:\IGZ\Proyectos\Personal\Amazon_wishlist\AZ-WishList\dist\bex.pem~~

~~ - Prod: AZ-WishList\dist\bex\ ¿UnPackaged?~~





### Format the files
```bash
yarn format
# or
npm run format
```


### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
