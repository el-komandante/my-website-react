import React, { Component } from 'react'

export default class Project extends Component {
  render() {
    return (
      <div className="project project-container">
        <a href={ this.props.link } target="_blank">
          <figure>
              <div className="project-image" data-content={ this.props.title }>
                {
                  this.props.media === 'image'
                  ? <img className="project" src={ this.props.src } />
                  : (
                      <video autoPlay loop className="project-video">
                        <source src={ this.props.src } type="video/webm" />
                      </video>
                    )
                }
              </div>
          </figure>
        </a>
      </div>
    )
  }
}
