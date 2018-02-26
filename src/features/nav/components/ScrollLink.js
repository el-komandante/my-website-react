import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ScrollLink extends Component {
  handleClick = () => {
    this.props.onClick(this.props.number)
  }
  render() {
    const { text, style, to } = this.props
    if (to) {
    return (
        <Link to={ to } style={ {...style} } className="nav-link">
            <button onClick={ this.handleClick }>{ text }</button>
        </Link>
        )
    } else {
        return (
            <div className="nav-link" style={ {...style} }>
                <button onClick={ this.handleClick }>{ text }</button>
            </div>
        )
    }
  }
}