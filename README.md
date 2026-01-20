# AZwish List

AZwish List Version 2.2 — [Change log](CHANGELOG.md)

Extension: [Chrome web store](https://chromewebstore.google.com/detail/azwish-list/gdjlahpieanojklejhdjedcopmhjmhgp)

Code:

- v2 : [GitHub Manifest v3 latest repository](https://github.com/AZ-Wish/AZ-WishList)
- v1 : [Github Manifest v2 original repository](https://github.com/AZ-Wish/bew)

## Requirements

v2: to compile for Manifest v3 you will need to use Quasar CLI with Vite instead of Quasar CLI with Webpack.

## Install the dependencies

```bash
yarn
```

If the next step you find problems starting the App, you can try making a 'yarn install' before repeating this step. Even deleting the node_modules folder and yarn.lock file and repeating this step.

### Update dependencies (not required !!!)

View upgradeable dependencies and select which one to upgrade

```bash
yarn upgrade-interactive
```

Update yarn and packages if you feel brave (it could break everything)

```bash
yarn set version stable
yarn install
```

### Lint files

Hide warnings with the --quiet flag

```bash
yarn lint --quiet
```

### Images

[Doc](https://quasar.dev/quasar-cli-webpack/handling-assets/)

Static images must be placed in '/public/..'' and '/src/assets/..'.
Also icons included in the 'manifest.json' need to be added in the folder 'src-bex/icons'

And are automatically copied to ZIP:/www/..

### Build the extension in development mode (hot-code reloading, error reporting, etc.)

```bash
yarn dev -m bex
```

Will create all the required files and the \www folder inside \dist\bex

After building the Chrome extension:

- Open Chrome tab: chrome://extensions/
- [In Developer mode] Press button "Load unpacked"
- Select folder:
  - Dev: \AZ-WishList\dist\bex
- Browse to the URL of your Amazon WishList page:
  - https://www.amazon.es/gp/registry/wishlist

Include hot-reload even in the current running Chrome extension.

_Note_ Most of the changes works refreshing the browser page some source files (like content-script.js) requires refreshing the extension using the cycle icon in the extension page ( chrome://extensions/ )

### Build the Chrome extension for preproduction and production

```bash
quasar build -m bex
```

A production version ZIP file will be build inside \dist\bex

If 'quasar' not found, install manually the version required in package.json:

```bash
 npm install -g @quasar/app-vite@1.11.0
```

### Install and test the Chrome extension in Preproduction:

After building the Chrome extension:

- Open Chrome tab: chrome://extensions/
- Drop file:
  - Pro: C:\Proyectos\Personal\Amazon_wishlist\AZ-WishList\dist\bex\Packaged.azwish-list.zip

To test the Chrome extension just browse to your Amazon WishList page or load:
https://www.amazon.es/gp/registry/wishlist

At first you´ll see an empty list, wait while your Wish List is loaded.

### Publish Chrome extension in Production:

[AZwish List - Chrome Web Store page](https://chrome.google.com/webstore/devconsole/42db463a-bca9-4d00-93dc-d9d100c27e5a/abphgoldafiaioaljbhgdhjhailijkkn/edit/package?hl=en-GB)

In the Build/Package section press 'Upload new package' and select the same ZIP file from previous step.

Description:

Update the 'Store listing' and 'Privacy' fields and "Publish changes"

Texts at: https://docs.google.com/document/d/1VAcRGzkZPiwegI5XUH1m52AH3jakZx322SB-WSH3awI/edit?tab=t.0
Images at: https://drive.google.com/drive/folders/1LeZbtFgztL-kwhxiNJZ48ihycL0mN-qu?usp=drive_link

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
