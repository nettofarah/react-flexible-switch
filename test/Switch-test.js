import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Switch from '../src/Switch';
import assert from 'assert';

function simulateEvent(eventName, el) {
  const event = new MouseEvent(eventName, { bubbles: true, cancelable: false });
  el.dispatchEvent(event);
}

function renderComponent() {
  return ReactDOM.render(<Switch />, document.getElementById('main'));
}

function isOn(el) {
  return el.style.transform === 'translateX(65px)';
}

function isOff(el) {
  return el.style.transform === 'translateX(0px)';
}

describe('Switch', () => {
  let switchComponent, node, circle;

  beforeEach(() => {
    switchComponent = renderComponent();
    node = ReactDOM.findDOMNode(switchComponent);
    circle = node.children[0];
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(switchComponent).parentNode);
    switchComponent = node = circle = null;
  });

  it('is off by default', () => {
    assert(isOff(circle));
  });

  describe('can be turned on', () => {
    it('by clicking the circle', () => {
      simulateEvent('mousedown', circle);
      simulateEvent('mouseup', circle);

      assert(isOn(circle));
    });

    it('by touching the circle', () => {
      simulateEvent('touchstart', circle);
      simulateEvent('touchend', circle);

      assert(isOn(circle));
    });

    it('by clicking the switch', () => {
      simulateEvent('mousedown', node);
      simulateEvent('mouseup', node);

      assert(isOn(circle));
    });

    it('by touching the switch', () => {
      simulateEvent('touchstart', node);
      simulateEvent('touchend', node);

      assert(isOn(circle));
    });
  });

  describe('can be turned off', () => {
    it('by clicking the circle', () => {
      simulateEvent('mousedown', circle);
      simulateEvent('mouseup', circle);

      simulateEvent('mousedown', circle);
      simulateEvent('mouseup', circle);

      assert(isOff(circle));
    });

    it('by touching the circle', () => {
      simulateEvent('touchstart', circle);
      simulateEvent('touchend', circle);

      simulateEvent('touchstart', circle);
      simulateEvent('touchend', circle);

      assert(isOff(circle));
    });

    it('by clicking the switch', () => {
      simulateEvent('mousedown', node);
      simulateEvent('mouseup', node);

      simulateEvent('mousedown', node);
      simulateEvent('mouseup', node);

      assert(isOff(circle));
    });

    it('by touching the switch', () => {
      simulateEvent('touchstart', node);
      simulateEvent('touchend', node);

      simulateEvent('touchstart', node);
      simulateEvent('touchend', node);

      assert(isOff(circle));
    });
  });
});
