import React from 'react'
import ReactDOM from 'react-dom'
import Switch from '../lib/Switch'

class App extends React.Component {
  constructor() {
    super()
    this.state = { locked: true, externalValue: true }
  }

  render() {
    return (
      <div>
        <h2> On By default </h2>
        <Switch value={true} />

        <h2> Off By default </h2>
        <Switch value={false} />

        <h2> Custom Colors </h2>
        <Switch circleStyles={{ onColor: 'blue', offColor: 'red' }} />

        <h2> Custom Diameter </h2>
        <Switch circleStyles={{ diameter: 55 }} />
        <br />
        <Switch circleStyles={{ diameter: 20 }} />

        <h2> Custom Switch Width </h2>
        <Switch switchStyles={{ width: 50 }} />
        <br />
        <Switch switchStyles={{ width: 200 }} />

        <h2> Labels </h2>
        <Switch labels={{ on: 'On', off: 'Off' }} />

        <h2> Locking the Switch </h2>
        <button onClick={() => this.setState({ locked: false })}>
          Unlock Switch
        </button>
        <button onClick={() => this.setState({ locked: true })}>
          Lock Switch
        </button>
        <br />
        <br />

        <Switch locked={this.state.locked} />
        <br />

        <h2> External Controls </h2>
        <button
          onClick={() =>
            this.setState({ externalValue: !this.state.externalValue })
          }
        >
          Toggle Switches
        </button>
        <br />
        <br />

        <Switch
          locked
          value={this.state.externalValue}
          onChange={value => {
            this.setState({ externalValue: value })
          }}
        />
        <br />
        <Switch
          locked
          value={!this.state.externalValue}
          onChange={value => {
            this.setState({ externalValue: !value })
          }}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
