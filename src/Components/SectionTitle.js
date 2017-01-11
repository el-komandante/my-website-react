import React, { Component } from 'react'

export default class SectionTitle extends Component {
  render() {
    return (
      <div className="section-title">
        <h2>{ this.props.text }</h2>
      </div>
    )
  }
}
