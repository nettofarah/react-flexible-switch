export const events = {
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

export function merge(...hashes) {
	return Object.assign({}, ...hashes);
}

export function disableScroll() {
  document.addEventListener(events.touch.move, preventScroll, false);
}

export function reEnableScroll() {
  document.removeEventListener(events.touch.move, preventScroll, false);
}

function preventScroll(e) {
	e.preventDefault();
}
