import { bexBackground } from 'quasar/wrappers';


console.log('background.ts')

/*
  chrome.runtime.onInstalled.addListener(() => {
    console.log('background.ts/onInstalled: ' + action_url)
  });
*/

    chrome.action.onClicked.addListener((/* tab */) => {
    // Opens our extension in a new browser window.
    // Only if a popup isn't defined in the manifest.
    const action_url = 'https://www.amazon.es/gp/registry/wishlist'
    console.log('background.ts/onClicked: ' + action_url)
    chrome.tabs.create( { url: action_url } );
  });

/*
      { 
        url: action_url + '?create'
//      url: chrome.runtime.getURL('https://www.amazon.es/gp/registry/wishlist'),
      },
      (/ * newTab * /) => {
        // Tab opened.
        url: action_url + '?opened'
      }
*/
// 3  url: chrome.runtime.getURL('https://www.amazon.es/gp/registry/wishlist'),
// 2  url: 'https://www.amazon.es/gp/registry/wishlist',
// 4  chrome.tabs.create({url: "https://www.youtube.com"});
 
declare module '@quasar/app-vite' {
  interface BexEventMap {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    log: [{ message: string; data?: any[] }, never];
    getTime: [never, number];

    'storage.get': [{ key: string | null }, any];
    'storage.set': [{ key: string; value: any }, any];
    'storage.remove': [{ key: string }, any];
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }
}

export default bexBackground((bridge , allActiveConnections) => {


  console.log (allActiveConnections);

  /*

  if (allActiveConnections && allActiveConnections[0].app) {
    console.log('Port Listener');
    allActiveConnections[0].app.port.onDisconnect.addListener(() => {
      console.log('Port disconnected');
    });
  }
*/

  bridge.on('log', ({ data, respond }) => {
    console.log(`[BEX] ${data.message}`, ...(data.data || []));
//    respond();
  });

  bridge.on('getTime', ({ respond }) => {
    respond(Date.now());
  });

  bridge.on('storage.get', ({ data, respond }) => {
    const { key } = data;
    if (key === null) {
      chrome.storage.local.get(null, (items) => {
        // Group the values up into an array to take advantage of the bridge's chunk splitting.
        respond(Object.values(items));
      });
    } else {
      chrome.storage.local.get([key], (items) => {
        respond(items[key]);
      });
    }
  });
  // Usage:
  // const { data } = await bridge.send('storage.get', { key: 'someKey' })

  bridge.on('storage.set', ({ data, respond }) => {
    chrome.storage.local.set({ [data.key]: data.value }, () => {
      respond();
    });
  });
  // Usage:
  // await bridge.send('storage.set', { key: 'someKey', value: 'someValue' })

  bridge.on('storage.remove', ({ data, respond }) => {
    chrome.storage.local.remove(data.key, () => {
      respond();
    });
  });
  // Usage:
  // await bridge.send('storage.remove', { key: 'someKey' })



chrome.runtime.onMessage.addListener(({ action, value }) => {
  if (action === 'updateIcon') {
    chrome.browserAction.setIcon({
      path: `/icons/icon-128x128_${value}.png`,
    });
  }
});



  /*
  // EXAMPLES
  // Listen to a message from the client
  bridge.on('test', d => {
    console.log(d)
  })

  // Send a message to the client based on something happening.
  chrome.tabs.onCreated.addListener(tab => {
    bridge.send('browserTabCreated', { tab })
  })

  // Send a message to the client based on something happening.
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      bridge.send('browserTabUpdated', { tab, changeInfo })
    }
  })
   */
});
