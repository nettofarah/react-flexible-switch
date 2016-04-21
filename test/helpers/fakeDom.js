const jsdom = require('jsdom');
const doc = jsdom.jsdom('<!doctype html><html><body><div id="main"></div></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;
global.navigator = {userAgent: 'node.js'};

propagateToGlobal(win);

function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key];
  }
}
