'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.merge = merge;
exports.disableScroll = disableScroll;
exports.reEnableScroll = reEnableScroll;
var events = {
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

exports.events = events;

function merge() {
  for (var _len = arguments.length, hashes = Array(_len), _key = 0; _key < _len; _key++) {
    hashes[_key] = arguments[_key];
  }

  return _extends.apply(undefined, [{}].concat(hashes));
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