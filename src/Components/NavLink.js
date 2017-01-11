import React, { Component } from 'react'

export default class NavLink extends Component {
  handleClick() {
    this.props.onClick(this.props.number, this.props.section)
  }
  render() {
    const { text, styles } = this.props
    return (
      <div style={ {...styles} } className="nav-link">
        <a onClick={ this.handleClick.bind(this) } href={ "javascript:void(0)" }>{ text }</a>
      </div>

    )
  }
}
