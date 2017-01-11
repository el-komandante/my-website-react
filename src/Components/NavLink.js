import React, { Component } from 'react'

export default class NavLink extends Component {
  handleClick() {
    this.props.onClick(this.props.number, this.props.section)
  }
  render() {
    const { text } = this.props
    return (
      <div className="nav-link">
        <a onClick={ this.handleClick.bind(this) } href={ "javascript:void(0)" }>{ text }</a>
      </div>

    )
  }
}
