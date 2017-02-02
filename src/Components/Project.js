import React, { Component } from 'react'

export default class Project extends Component {
  render() {
    return (
      <div className="project" data-content={ this.props.title }>
        <a href={ this.props.link } target="_blank">
          {
            this.props.media === 'image'
            ? <img className="project-image" src={ this.props.src } />
            : (
                <video autoPlay loop className="project-video">
                  <source src={ this.props.src } type="video/webm" />
                </video>
              )
          }
        </a>
      </div>
    )
  }
}
