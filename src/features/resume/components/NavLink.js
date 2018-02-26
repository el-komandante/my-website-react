import React, { Component } from 'react'

export default class Link extends Component {
  handleClick() {
    this.props.onClick(this.props.number, this.props.section)
  }
  render() {
    const { text, styles } = this.props
    return (
      <div style={ {...styles} } className="nav-link">
        <button onClick={ this.handleClick.bind(this) }>{ text }</button>
      </div>

    )
  }
}
