import React, { Component } from "react"
import { Flipper, Flipped } from "../../../src"
import "./index.css"

const color = "#ff4f66"

class RotateExample extends Component {
  state = { focused: undefined }

  render() {
    return (
      <div className="rotate">
        <Flipper flipKey={!!this.state.focused} applyTransformOrigin={false}>
          <Flipped flipId={color}>
            <div
              className={`rotate-square ${
                color === this.state.focused ? "rotate-square--focused" : ""
              }`}
              key={color}
              style={{ backgroundColor: color }}
              onClick={() =>
                this.setState({
                  focused: this.state.focused === color ? null : color
                })
              }
            />
          </Flipped>
        </Flipper>
      </div>
    )
  }
}

export default RotateExample
