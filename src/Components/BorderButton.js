import React, { Component } from 'react'

export default class BorderButton extends Component {
  handleClick() {
    this.props.onClick(this.props.number, this.props.el)
  }
  render() {
    const { style, link, text } = this.props
    return (
      <div style={ style } className="border-button-container">
        <a href={ link } onClick={ this.handleClick.bind(this) } className="border-button">{ text }</a>
      </div>
    )
  }
}
