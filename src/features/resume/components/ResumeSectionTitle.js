import React, { Component } from 'react'

export default class ResumeSectionTitle extends Component {
  render() {
    return (
      <div className="resume-section-title">
        <h2>{ this.props.text }</h2>
      </div>
    )
  }
}
