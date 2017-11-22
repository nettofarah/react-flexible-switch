'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.merge = merge;
exports.disableScroll = disableScroll;
exports.reEnableScroll = reEnableScroll;
var events = exports.events = {
  touch: {
    start: 'touchstart',
    stop: 'touchend',
    move: 'touchmove'
  },
  mouse: {
    start: 'mousedown',
    stop: 'mouseup'
  }
};

function merge() {
  for (var _len = arguments.length, hashes = Array(_len), _key = 0; _key < _len; _key++) {
    hashes[_key] = arguments[_key];
  }

  return Object.assign.apply(Object, [{}].concat(hashes));
}

function disableScroll() {
  document.addEventListener(events.touch.move, preventScroll, false);
}

function reEnableScroll() {
  document.removeEventListener(events.touch.move, preventScroll, false);
}

function preventScroll(e) {
  e.preventDefault();
}