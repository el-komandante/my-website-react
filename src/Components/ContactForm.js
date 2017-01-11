import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'

export default class ContactForm extends Component {
  render() {
    const { isModalOpen } = this.props
    const startO = 0
    const endO = isModalOpen ? 1 : 0
    const startH = 0
    const endH = isModalOpen ? 60 : 0
    const startW = 0
    const endW = isModalOpen ? 60 : 0
    const modalParams = {stiffness: 250, damping: 20}
    return (
      <Motion defaultStyle={ {o: startO, h: startH, w: startW} } style={ {o: spring(endO, modalParams), h: spring(endH, modalParams), w: spring(endW, modalParams)} }>
        {style => {
          return (
            <div className="contact-form-container" style={ {opacity: style.o, height: `${style.h}%`, width: `${style.w}%`} }>
              <a href="javascript:void(0)" className="close-button" onClick={ this.props.toggleModal }><span className="fa fa-2x fa-times" /></a>
              <div className="contact-form">
                <p className="contact-header">Drop me a line!</p>
                <div className="contact-field">
                  <span className="fa fa-user contact-icon" />
                  <input className="contact-input" type="text" placeholder="Name" />
                </div>
                <div className="contact-field">
                  <span className="fa fa-envelope contact-icon" />
                  <input className="contact-input" type="text" placeholder="Email" />
                </div>
                <div className="contact-field-textarea">
                  <span className="fa fa-comment contact-icon-textarea" />
                  <textarea className="contact-input-textarea" maxlength="500" type="textarea" placeholder="Message..."/>
                </div>
              </div>
            </div>
          )
        }}
      </Motion>
    )
  }
}
