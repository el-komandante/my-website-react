import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'

export default class TextInput extends Component {
  constructor() {
    super()
    this.state = {
      isFocused: false,
      value: ''
    }
  }
  handleFocus() {
    this.setState({
      isFocused: true
    })
  }
  handleBlur() {
    this.setState({
      isFocused: false
    })
  }
  handleLabelClick() {
    this.input.focus()
  }
  handleChange() {
    const { value } = this.input
    const { placeholder, onChange } = this.props
    onChange(placeholder, value)
  }
  render() {
    const { isFocused } = this.state
    const { placeholder, error } = this.props
    const length = this.input && this.input.value.length
    const startX = 0
    const endX = isFocused ? -20 : 0
    const labelStartY = 3
    const labelEndY = isFocused || length > 0 ? -30 : 3
    const barParams = {stiffness: 200, damping: 25}
    const startA = 1
    const endA = isFocused || length > 0 ? 0.5 : 1
    return (
      <div className="text-input">
        <Motion defaultStyle={ {x: startX} } style={ {x: spring(endX, barParams)} }>
          { style => <div className={ error ? 'input-left error' : 'input-left' } style={ {left: style.x} } /> }
        </Motion>
        <Motion defaultStyle={ {x: startX} } style={ {x: spring(endX, barParams)} }>
          { style => <div className={ error ? 'input-right error' : 'input-right' } style={ {right: style.x} } /> }
        </Motion>
        <Motion defaultStyle={ {y: labelStartY, a: startA} } style={ {y: spring(labelEndY, barParams), a: spring(endA, barParams)} }>
          { style => <label style={ {top: style.y, color: `rgba(0,0,0,${style.a})`} } onClick={ this.handleLabelClick.bind(this) }>{ placeholder }</label> }
        </Motion>
        <input
          ref={ el => { this.input = el } }
          type="text"
          onFocus={ this.handleFocus.bind(this) }
          onBlur={ this.handleBlur.bind(this) }
          onChange={ this.handleChange.bind(this) }
        />
      </div>
    )
  }
}
