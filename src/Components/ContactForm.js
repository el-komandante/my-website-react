import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import TextInput from './TextInput'
import TextArea from './TextArea'
import axios from 'axios'

export default class ContactForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      message: '',
      answer: '',
      emailError: false,
      nameError: false,
      messageError: false,
      testError: false,
      isSent: false
    }
  }
  clear() {
    this.
    this.setState({
      emailError: false,
      nameError: false,
      messageError: false,
      testError: false,
      isSent: false
    })
  }
  handleRest() {
    const { isSent } = this.state
    if (!isSent) {
      this.props.toggleModal()
    }
  }
  handleChange(placeholder, value) {
    switch(placeholder) {
      case 'Name':
        this.setState({
          name: value
        })
        break
      case 'Email':
        this.setState({
          email: value
        })
        break
      case 'Message':
        this.setState({
          message: value
        })
        break
      case 'Human verification: What\'s 6 + 7?':
        this.setState({
          answer: value
        })
    }
  }
  sendForm() {
    const { name, message, email } = this.state
    const instance = axios.create({
      baseURL: 'http://192.168.0.108:8080',
      timeout: 1000
    })
    const data = {
      name,
      email,
      message
    }
    instance.post('/messages', data)
    .then(res => {
      console.log(res)
      this.setState({isSent: true}, () => {
        setTimeout(() => {
          this.setState({isSent: false})
        }, 500)
      })
    })
    .catch(err => {console.error(err)})
  }
  handleSubmit() {
    const emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const { name, email, message, answer } = this.state
    const emailError = !emailTest.test(email)
    const nameError = name.length <= 1
    const messageError = message.length <= 1
    const testError = !(+answer === 13)
    let errors = 0
    errors += emailError ? 1 : 0
    this.setState({
      emailError
    })
    errors += nameError ? 1 : 0
    this.setState({
      nameError
    })
    errors += messageError ? 1 : 0
    this.setState({
      messageError
    })
    errors += testError ? 1 : 0
    this.setState({
      testError
    })
    if (errors === 0) {
      this.sendForm()
    }
  }
  render() {
    const { emailError, nameError, messageError, testError, isSent } = this.state
    const { isModalOpen } = this.props
    const startY = -150
    const endY = isModalOpen ? 0 : -150
    const startO = 0
    const endO = isModalOpen ? 1 : 0
    // const startH = 0
    // const endH = isModalOpen ? 75 : 0
    // const startW = 0
    // const endW = isModalOpen ? 60 : 0
    const inputW = isModalOpen ? 100 : 0
    const sentO = isSent ? 1 : 0
    const sentW = isSent ? 100 : 0
    const modalParams = {stiffness: 180, damping: 18}
    const sentWParams = {stiffness: 240, damping: 26}
    const sentOParams = {stiffness: 275, damping: 28}
    return (
      <Motion defaultStyle={ {o: startO,/* h: startH, w: startW, */y: startY} } style={ {o: spring(endO, modalParams), /*h: spring(endH, modalParams), w: spring(endW, modalParams), */y: spring(endY, modalParams)} }>
        {style => {
          return (
            <div className="contact-form-container" style={ {opacity: style.o, height: `${style.h}%`, width: `${style.w}%`, transform: `translateY(${style.y}%)`} }>
              <a href="javascript:void(0)" className="close-button" onClick={ this.props.toggleModal }><span className="fa fa-2x fa-times" /></a>
              <div className="contact-form">
                <p className="contact-header">Drop me a line!</p>
                <TextInput error={ nameError } onChange={ this.handleChange.bind(this) } placeholder="Name" />
                <TextInput error={ emailError } onChange={ this.handleChange.bind(this) } placeholder="Email" />
                <TextArea error={ messageError } onChange={ this.handleChange.bind(this) } placeholder="Message" />
                <TextInput error= { testError } onChange={ this.handleChange.bind(this) } placeholder="Human verification: What's 6 + 7?" />
                <div className="submit-container">
                  <button onClick={ this.handleSubmit.bind(this) } className="submit-button">SUBMIT</button>
                </div>
              </div>
              <Motion onRest={ this.handleRest.bind(this) } defaultStyle={ {w: 0, o: startO} } style={ {w: spring(sentW, sentWParams), o: spring(sentO, sentOParams)} }>
                {style => <div style={ {width: `${style.w}%`, opacity: style.o} } className="message-sent"><h3>Message Sent!</h3></div>}
              </Motion>
            </div>
          )
        }}
      </Motion>
    )
  }
}
