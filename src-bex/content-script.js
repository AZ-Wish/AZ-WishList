// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks

import { bexContent } from 'quasar/wrappers';

/**
 * Content hooks which listen for messages from the BEX in the iFrame
 * @param bridge
 */
//export default function attachContentHooks(bridge) {
export default bexContent((bridge) => {
  /* #3 why use Quasar port to open a tab? (that disconnect sometimes) */
  bridge.on('showAmazon', (event) => {
    console.log('[bexContent] showAmazon');
    iFrame.hidden = true;
    showAmazon();
  });

  bridge.on('getProducts', async (event) => {
    const data = getProducts();
    bridge.send('products', data);
  });

  bridge.on('fetchProducts', async (event) => {
    const data = await fetchProducts();
    bridge.send(event.eventResponseKey, data);
    //   try {
    //     const data = await fetchProducts();
    //     bridge.send(event.eventResponseKey, data);
    //   } catch {
    //     bridge.send(event.eventResponseKey, null);
    //   }
  });

  /* #1 why use Quasar port to open a tab? (that disconnect sometimes)
  bridge.on('openDetail', async ({ data }) => {
    console.log ('bridge.on OpenDetail')
    openDetail(data.link);
  });
  */

  // bridge.send('products', { data: [1, 2, 3] });
  /**
   * When the drawer is toggled set the iFrame height to take the whole page.
   * Reset when the drawer is closed.
   */
  bridge.on('wb.drawer.toggle', (event) => {
    const payload = event.data;
    if (payload.open) {
      setIFrameHeight('100%');
    } else {
      resetIFrameHeight();
    }
    bridge.send(event.eventResponseKey);
  });
});

const debugExtension = false;

const iFrame = document.createElement('iframe');

/**
 * The code below will get everything going. Initialize the iFrame with defaults and add it to the page.
 * @type {string}
 */
iFrame.id = 'bex-app-iframe';
iFrame.width = '100%';
iFrame.height = '100%';

// Assign some styling so it looks seamless
Object.assign(iFrame.style, {
  position: 'fixed',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  border: '0',
  zIndex: '9999999', // Make sure it's on top
  overflow: 'visible',
});
(function () {
  // When the page loads, insert our browser extension app.
  iFrame.src = chrome.runtime.getURL('www/index.html');
  document.body.prepend(iFrame);
  document.body.style.overflowY = 'hidden';
})();

// -----------------------------

console.log('content-script.js loaded');

const baseUrl = location.href; //'https://www.amazon.es/gp/registry/wishlist';
console.log('***: ', location.href);
var amazonPage = false;

// chrome.runtime.sendMessage({
//   action: 'updateIcon',
//   value: 'on',
// });

/* #3 why use Quasar port to open a tab? (that disconnect sometimes)  */
const reloadAmazon = (force) => {
  console.log('Reload Amazon 2');
  if (force || location.href.indexOf('amazon') === -1) location.href = baseUrl;
  else location.reload();
};

/* #3 why use Quasar port to open a tab? (that disconnect sometimes) */
const showAmazon = () => {
  console.log('Return to Amazon done');
  amazonPage = true;
  window.scrollTo(0, 0);
  document.body.style.overflowY = 'auto';
  document.getElementById('a-page').hidden = false;
};

const fetchProducts = async () =>
  new Promise((resolve, reject) => {
    const pageElm = document.getElementById('a-page');

    // const search = new URLSearchParams(window.location.search).get('itemSearchKeyword');
    // console.log ('S:' + String(search));
    // if (search) {
    //   store.commit('products/setSearch', search);
    // }

    if (!pageElm) return;
    if (amazonPage) return;
    //    pageElm.hidden = false;

    console.log('Scrolling for lazy loading products...');
    //    document.body.style.overflowY = 'hidden'
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100);
    setTimeout(() => {
      try {
        const products = getProducts();
        //      pageElm.hidden = true;
        resolve(products);
      } catch {
        reject();
      }
    }, 1000);
  });

/* #1 why use Quasar port to open a tab? (that disconnect sometimes)
const openDetail = (link) => {
  console.log ('OpenDetail', link)
  window.open(String(link), '_blank').focus();
};
*/

const getProducts = () => {
  const products = [];

  var c = document.querySelectorAll('.g-item-sortable');
  if (!c || c.length == 0) return c;
  console.log('[getProducts] ' + c.length);
  var moneda = null;
  var prods = c.length;
  while (!moneda && prods--) {
    try {
      moneda = c[prods]
        .querySelector(
          '#itemPrice_' + String(c[prods].getAttribute('data-itemid')),
        )
        .getElementsByClassName('a-price-symbol')[0].textContent;
    } catch {}
  }
  if (!moneda) {
    console.log('!!! Moneda not found');
    moneda = '€';
  }

  for (var i = 0; i < c.length; i++) {
    var product = {};
    var id = c[i].getAttribute('data-itemid');
    if (debugExtension) console.log('1.0 ID: ' + id);
    if (debugExtension) console.log(c[i]);
    product['n'] = i;
    product['id'] = id;
    product['moneda'] = moneda;
    try {
      product['title'] = c[i].querySelector('#itemName_' + String(id)).title;
    } catch (err) {
      console.log(
        'ERROR: verify Amazon URL param viewType=list (Github issue #42) ',
      );
      console.log(c[i]);
      product['title'] = '';
    }

    //console.log ('2:'+product['title'] )
    try {
      product['link'] = c[i].querySelector('#itemName_' + String(id)).href;
    } catch (err) {
      product['link'] = '';
    }

    try {
      product['description'] = c[i].querySelector(
        '#item-byline-' + String(id),
      ).innerText;
    } catch (err) {
      product['description'] = '';
    }
    if (debugExtension) console.log('Description: ' + product['description']);

    try {
      product['reviewStars'] = c[i]
        .querySelector('#review_stars_' + String(id)) //       .getElementsByClassName('a-icon-alt')[0]
        .textContent.split(' ')[0]
        .trim();
    } catch (err) {
      product['reviewStars'] = '1';
    }
    if (debugExtension) console.log('3.0 Stars: ' + product['reviewStars']);

    try {
      product['reviewCount'] = c[i]
        .querySelector('#review_count_' + String(id))
        .textContent.replace(/[/.,]/g, '') //separador de miles (. y ,)
        .trim();
    } catch (err) {
      product['reviewCount'] = '1';
    }
    if (debugExtension) console.log('3.1 Reviews: ' + product['reviewCount']);

    product['reviewStarsAZ'] = parseFloat(
      product['reviewStars'] - 1 * Math.min(1, 20 / product['reviewCount']),
    ); // Normalize ratings by users: minimum 200 users or uo to 1 star less
    if (debugExtension)
      console.log('3.2 reviewStarsAZ: ' + product['reviewStarsAZ']);

    try {
      var sPrice = c[i].querySelector('#itemPrice_' + String(id));
      var decimal =
        sPrice.getElementsByClassName('a-price-decimal')[0].innerText;
      //    var symbol = sPrice.getElementsByClassName('a-price-symbol')[0].innerText

      var price = c[i].getAttribute('data-price');
      if (isNaN(price) || !isFinite(price)) {
        //si no es un número finito
        price = sPrice
          .getElementsByClassName('a-offscreen')[0]
          .innerHTML?.replace(/[€$¥£]/g, ''); // moneda

        //        price = parseFloat(price.replace(',', '.')).toFixed(2);
        if (decimal == ',')
          price = price.replace(/[/.]/g, '').replace(',', '.'); // ES
        else price = price.replace(/[,]/g, ''); // US
        price = parseFloat(price).toFixed(2);
      }

      product['price'] = price;
    } catch (err) {
      product['price'] = '-';
      if (price) {
        product['agotado'] = true;
      }
    }
    if (debugExtension) console.log('3.4: Precio: ' + product['price']);

    try {
      var sDiscount = '';
      sDiscount = document.querySelectorAll(
        'span #itemPriceDrop_' + String(id),
      )[0].innerText;
      //var discount = /[€$¥£](\d+)\s?[€$¥£]/i.exec(sDiscount);
      var discount = /[^a-zA-Z\s]+/gi.exec(sDiscount);
      if (!/[\%]/.exec(sDiscount)) {
        //descuento
        product['discount'] = parseFloat(discount[0].replace(',', '.'));
        product['discount_pc'] = (
          (product['discount'] * 100) /
          product['price']
        ).toFixed(0);
      } else {
        //porcentaje
        //        product['discount_pc'] = parseFloat((/reducido en un (.*?).%/i.exec(sDiscount))[1]);
        //       product['discount_pc'] = parseFloat(( /(\d+)\s?%/i.exec(sDiscount))[1]);
        product['discount_pc'] = parseFloat(discount[0]);
        product['discount'] = (
          (product['price'] * product['discount_pc']) /
          (100 - product['discount_pc'])
        ).toFixed(2);
      }
      if (isNaN(Number(product['discount_pc']))) {
        product['discount_pc'] = 0;
        product['discount'] = 0;
      }
    } catch (err) {
      if (sDiscount)
        console.log(
          'Error Discount 1a: Producto: ' +
            String(i) +
            ' ID: #itemPrice_' +
            String(id) +
            ' {' +
            product['price'] +
            '} [' +
            sDiscount +
            '] ' +
            String(err),
        );
      else {
        if (debugExtension) console.log('3.2 Buscar otro precio...');
        try {
          var fullPrice = c[i]
            .querySelectorAll(
              '[data-csa-c-element-id="list-desktop-wishlist-item-info-deal-badge-price"]',
            )[0]
            .innerText?.replace(/[€$¥£]/g, '');

          if (decimal == ',')
            fullPrice = fullPrice.replace(/[/.]/g, '').replace(',', '.'); // ES
          else fullPrice = fullPrice.replace(/[,]/g, ''); // US
          discount = fullPrice - product['price'];

          if (debugExtension)
            console.log(
              'D3:' + discount + '= ' + fullPrice + ' - ' + product['price'],
            );

          product['discount'] = discount.toFixed(2);
          product['discount_pc'] = ((discount * 100) / fullPrice).toFixed(0);
        } catch (err) {
          if (debugExtension)
            console.log(
              'Error Discount 2: Producto: ' + sDiscount + ':' + String(err),
            );
          product['discount'] = '0';
          product['discount_pc'] = '0';
        }
      }
    }
    if (debugExtension) console.log('4.0 Discount:' + product['discount']);

    try {
      product['image'] = c[i].querySelector(
        '#itemImage_' + String(id) + ' img',
      ).src;
    } catch (err) {
      product['image'] = '';
    }

    try {
      product['itemAddedDateStr'] = c[i].querySelector(
        '#itemAddedDate_' + String(id),
      ).textContent;
      if (product['itemAddedDateStr'])
        product['itemAddedDate'] = new Date(
          product['itemAddedDateStr'].replace('Item added ', ''),
        );
      if (debugExtension)
        console.log('itemAddedDate:', product['itemAddedDateStr']);
    } catch (err) {
      console.log('itemAddedDate error:', err);
      product['itemAddedDateStr'] = '';
      product['itemAddedDate'] = null;
    }

    /*
  try {
    product["asin"] = JSON.parse(
      c[i].getAttribute("data-reposition-action-params")
    ).itemExternalId.match(/ASIN:(.+?)\|/)[1];
  } catch (err) {
    product["asin"] = "";
  }
*/
    try {
      if (c[i].getElementsByClassName('a-icon-prime')[0])
        product['prime'] = true;
    } catch (err) {
      product['prime'] = false;
    }

    if (debugExtension) console.log('6:' + product.title);

    if (product.link || product.title) {
      products.push(product);
    }
  }

  return products;
};
