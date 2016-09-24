import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Switch from '../src/Switch';
import Label from '../src/Label';
import assert from 'assert';

describe('props', () => {
  it('has default props', () => {
    const comp = renderComponent();
    const props = comp.props;

    assert(typeof props.onInactive === 'function');
    assert(typeof props.onActive === 'function');
    assert(typeof props.circleStyles === 'object');
    assert(typeof props.switchStyles === 'object');
  });

  describe('value', () => {

    it('turns the switch on', () => {
      const comp = renderComponent({ value: true });
      assert(isOn(comp));
    });

    it('turns the switch off', () => {
      const comp = renderComponent({ value: false });
      assert(isOff(comp));
    });
  });

  describe('onActive', () => {
    it('gets called after the switch is turned on', () => {
      let called = false;
      const onActive = () => called = true;
      const comp = renderComponent({ onActive });

      flip(comp);

      assert(isOn(comp));
      assert(called);
    });

    it('does not get called when the switch is turned off', () => {
      let called = false;
      const onActive = () => called = true;
      const comp = renderComponent({ value: true, onActive });
      assert(isOn(comp));

      flip(comp);

      assert(isOff(comp));
      assert(!called);
    });
  });

  describe('onInactive', () => {
    it('gets called when the switch is turned off', () => {
      let called = false;
      const onInactive = () => called = true;
      const comp = renderComponent({ value: true, onInactive });

      flip(comp);

      assert(isOff(comp));
      assert(called);
    });

    it('does not get called when the switch is turned on', () => {
      let called = false;
      const onInactive = () => called = true;
      const comp = renderComponent({ value: false, onInactive });
      assert(isOff(comp));

      flip(comp);

      assert(isOn(comp));
      assert(!called);
    });
  });

  describe('locked', () => {
    it('turned on -> locks the switch, blocking user interaction', () => {
      const comp = renderComponent({ value: true, locked: true });
      assert(isOn(comp));

      flip(comp);
      assert(isOn(comp));
    });

    it('turned off -> locks the switch, blocking user interaction', () => {
      const comp = renderComponent({ value: false, locked: true });
      assert(isOff(comp));

      flip(comp);
      assert(isOff(comp));
    });
  });

  // TODO: add tests for styles
});


describe('mobile devices', () => {
  let switchComponent, node, circle;

  beforeEach(() => {
    window['ontouchstart'] = function() {};
    switchComponent = renderComponent();
    node = switchComponent.refs.switch;
    circle = switchComponent.refs.circle;
  });

  afterEach(() => {
    unmount();
    window['ontouchstart'] = undefined;
  });

  describe('can be turned on', () => {
    it('by touching the circle', () => {
      simulateEvent('touchstart', circle);
      simulateEvent('touchend', circle);

      assert(isOn(switchComponent));
    });

    it('by touching the switch', () => {
      simulateEvent('touchstart', node);
      simulateEvent('touchend', node);

      assert(isOn(switchComponent));
    });
  });

  describe('can be turned off', () => {
    it('by touching the circle', () => {
      simulateEvent('touchstart', circle);
      simulateEvent('touchend', circle);

      simulateEvent('touchstart', circle);
      simulateEvent('touchend', circle);

      assert(isOff(switchComponent));
    });

    it('by touching the switch', () => {
      simulateEvent('touchstart', node);
      simulateEvent('touchend', node);

      simulateEvent('touchstart', node);
      simulateEvent('touchend', node);

      assert(isOff(switchComponent));
    });
  });
});

describe('User interaction', () => {
  let switchComponent, node, circle;

  beforeEach(() => {
    switchComponent = renderComponent();
    node = switchComponent.refs.switch;
    circle = switchComponent.refs.circle;
  });


  afterEach(unmount);

  describe('can be turned on', () => {

    it('is off by default', () => {
      assert(isOff(switchComponent));
    });

    it('by clicking the circle', () => {
      simulateEvent('mousedown', circle);
      simulateEvent('mouseup', circle);

      assert(isOn(switchComponent));
    });

    it('by clicking the switch', () => {
      simulateEvent('mousedown', node);
      simulateEvent('mouseup', node);

      assert(isOn(switchComponent));
    });
  });

  describe('can be turned off', () => {
    it('by clicking the circle', () => {
      simulateEvent('mousedown', circle);
      simulateEvent('mouseup', circle);

      simulateEvent('mousedown', circle);
      simulateEvent('mouseup', circle);

      assert(isOff(switchComponent));
    });

    it('by clicking the switch', () => {
      simulateEvent('mousedown', node);
      simulateEvent('mouseup', node);

      simulateEvent('mousedown', node);
      simulateEvent('mouseup', node);

      assert(isOff(switchComponent));
    });
  });
});

describe('Labels', () => {

  it('renders labels as instances of <Label>', () => {
    const comp = renderComponent();
    assert(TestUtils.isCompositeComponentWithType(comp.refs.label, Label));
  });

  it('are empty by default', () => {
    const comp = renderComponent();
    const labelContent = ReactDOM.findDOMNode(comp.refs.label).innerHTML;
    assert.equal(labelContent, '');
  });

  it('can be passed in as options', () => {
    const comp = renderComponent({ labels: { on: 'Turned On', off: 'Turned Off' }});
    let labelContent = ReactDOM.findDOMNode(comp.refs.label).innerHTML;
    assert.equal(labelContent, 'Turned Off');

    flip(comp);

    labelContent = ReactDOM.findDOMNode(comp.refs.label).innerHTML;
    assert.equal(labelContent, 'Turned On');
  });
});

function simulateEvent(eventName, el) {
  const event = new MouseEvent(eventName, { bubbles: true, cancelable: false });
  el.dispatchEvent(event);
}

function isOn(comp) {
  const el = comp.refs.circle;
  return el.style.transform === 'translateX(45px)';
}

function isOff(comp) {
  const el = comp.refs.circle;
  return el.style.transform === 'translateX(0px)';
}

function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById('main'));
}

function renderComponent(props={}) {
  unmount();
  return ReactDOM.render(<Switch {...props} />, document.getElementById('main'));
}

function flip(comp) {
  simulateEvent('mousedown', comp.refs.circle);
  simulateEvent('mouseup', comp.refs.circle);
}
