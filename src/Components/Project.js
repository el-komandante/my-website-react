import React, { Component } from 'react'

export default class Project extends Component {
  render() {
    return (
      <div className="project">
        <a href={ this.props.link } target="_blank">
          <figure>
              <div className="project-image" data-content={ this.props.title }>
                <img className="project" src={ this.props.image } />
              </div>
          </figure>
        </a>
      </div>
    )
  }
}
