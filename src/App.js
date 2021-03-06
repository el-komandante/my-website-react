import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import smoothScroll from 'smoothscroll'
import profilePhoto from './images/me-photo.jpg'
import fifaApp from './video/fifa.webm'
import './App.css'
import './css/font-awesome.min.css'
import NavLink from './Components/NavLink'
import BorderButton from './Components/BorderButton'
import SectionTitle from './Components/SectionTitle'
import ResumeSection from './Components/ResumeSection'
import ResumeSectionTitle from './Components/ResumeSectionTitle'
import Project from './Components/Project'
import ContactForm from './Components/ContactForm'
import { resumeItems, technicalSkills } from './Resume/resume-content.js'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentSection: 0,
      isSmoothScrolling: false,
      scrollDirection: '',
      lastScrollPos: 0,
      isModalOpen: false
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this))
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    //Make sure Navbar fires on first click
    window.scrollBy(0, 2)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this))
    document.removeEventListener('keydown', this.handleKeyDown.bind(this))
  }
  handleClick(e) {
    const { isModalOpen } = this.state
    if (!this.contactForm.getContainerElement().contains(e.target) && isModalOpen) {
      this.toggleModal()
    }
  }
  handleKeyDown(e) {
    const { isModalOpen } = this.state
    if (e.keyCode === 27 && isModalOpen) {
      this.toggleModal()
    }
  }
  toggleModal() {
    const { isModalOpen, isSmoothScrolling } = this.state
    this.setState({
      isModalOpen: !isModalOpen,
      isSmoothScrolling: !isSmoothScrolling
    })
    document.body.style['overflow-y'] = !isModalOpen ? 'hidden' : 'scroll'
  }
  getDistanceFromTop(element) {
    let distance = 0
    while (element.offsetParent) {
      distance += element.offsetTop
      element = element.offsetParent
    }
    return distance
  }
  handleScroll(e) {
    e.preventDefault()
    if (this.state.lastScrollPos > window.scrollY) {
      this.setState({
        scrollDirection: 'up',
        lastScrollPos: window.scrollY
      })
    } else if (this.state.lastScrollPos < window.scrollY) {
      this.setState({
        scrollDirection: 'down',
        lastScrollPos: window.scrollY
      })
    }
    const { currentSection, isSmoothScrolling, scrollDirection } = this.state
    const sections = [
      {element: this.splash, id: 0},
      {element: this.about, id: 1},
      {element: this.resume, id: 2},
      {element: this.projects,id: 3}
    ]

    // let element = sections[currentSection].element
    let nextSection = sections[currentSection + 1] && sections[currentSection + 1]
    let prevSection = sections[currentSection - 1] && sections[currentSection - 1]
    if (nextSection && scrollDirection === 'down') {
      if (window.scrollY > this.getDistanceFromTop(nextSection.element) - 100 && !isSmoothScrolling) {
        this.changeSection(nextSection.id)
      }
    } else if (prevSection && scrollDirection === 'up') {
      if (window.scrollY < this.getDistanceFromTop(prevSection.element) + (prevSection.element.scrollHeight / 3) && !isSmoothScrolling) {
        this.changeSection(prevSection.id)
      }
    }
  }
  getEndX() {
    const { currentSection } = this.state
    return 10 + (currentSection * 100)
  }
  changeSection(sectionId, section) {
    this.setState({
      currentSection: sectionId
    })
    if (section) {
      const offset = window.innerWidth > 600 ? 75 : 60
      this.setState({
        isSmoothScrolling: true
      },
      smoothScroll(this.getDistanceFromTop(section) - offset, 500, () => {
        this.setState({
          isSmoothScrolling: false
        })
      }))
    }
  }
  render() {
    const { education, dictybase, lisa, smartbiz, fifa, aditazz, gifRoulette, goChat } = resumeItems
    const { languages, tools, interests, apis } = technicalSkills
    const startY = 150
    const endY = 0
    const startO = 0
    const endO = 1
    const startX = 9.3
    const endX = this.getEndX()
    // const startW = 0
    // const endW = 100
    const nameParams = {stiffness: 120, damping: 25}
    const buttonParams = {stiffness: 100, damping: 22.5}
    const socialParams = {stiffness: 80, damping: 20}
    const navParams = {stiffness: 280, damping: 28}
    return (
      <div className="App" onClick={ this.handleClick.bind(this) }>
        <nav>
          <Motion defaultStyle={ {x: startX} } style={ {x: spring(endX, navParams)} }>
            {style => <div className="nav-border" style={ {left: style.x} } />}
          </Motion>
          <div className="nav-border" style={ {right: 10.5} } />
          <NavLink styles={ {marginLeft: 12} } number={ 0 } section={ this.splash } onClick={ this.changeSection.bind(this) } text="Home" />
          <NavLink number={ 1 } section={ this.about } onClick={ this.changeSection.bind(this) } text="About" />
          <NavLink number={ 2 } section={ this.resume } onClick={ this.changeSection.bind(this) } text="Resume" />
          <NavLink number={ 3 } section={ this.projects } onClick={ this.changeSection.bind(this) } text="Projects" />
          { window.innerWidth > 600 && <NavLink styles={ {marginLeft: 'auto', marginRight: 12, zIndex: 200} } onClick={ this.toggleModal.bind(this) } text="Contact" /> }
        </nav>
        <div className="splash" ref={ el => { this.splash = el } }>
          <div className="container">
            <Motion defaultStyle={ {y: startY, o: startO} } style={ {y: spring(endY, nameParams), o: spring(endO, nameParams)} }>
              {style => <div className="name" style={ {transform: `translateY(${style.y}px)`, opacity: style.o} }><h1>RUDY DEBERRY</h1><p>Software Engineer</p></div>}
            </Motion>
            <Motion defaultStyle={ {y: startY, o: startO} } style={ {y: spring(endY, buttonParams), o: spring(endO, buttonParams)} }>
              {style => (
                <div className="buttons" style={ {transform: `translateY(${style.y}px)`, opacity: style.o} }>
                  <BorderButton link="#" text={ 'CONTACT' } onClick={ this.toggleModal.bind(this) }/>
                  <BorderButton number={ 2 } link="#" text={ 'RESUME' } onClick={ this.changeSection.bind(this) } el={ this.resume } />
                </div>
              )}
            </Motion>
            <Motion defaultStyle={ {y: startY, o: startO} } style={ {y: spring(startO, socialParams), o: spring(endO, socialParams)} }>
              {style => (
                <div className="social" style={ {transform: `translateY(${style.y}px)`, opacity: style.o} }>
                  <a href="https://www.linkedin.com/in/charles-rudy-deberry-iii-485baba4/" target="_blank">
                    <i className="fa fa-3x fa-linkedin-square" aria-hidden="true"></i>
                  </a>
                  <a href="https://www.github.com/el-komandante" target="_blank">
                    <i className="fa fa-3x fa-github" aria-hidden="true"></i>
                  </a>
                </div>
              )}
            </Motion>
          </div>
        </div>
        <div className="about" ref={ el => { this.about = el } }>
          <div className="container">
            <SectionTitle text="ABOUT" />
            <div className="about-text">
              <div className="profile-photo-container"><img className="profile-photo" alt="profile" src={ profilePhoto } /></div>
              <p>
                My name is Rudy and I’m a full-stack software engineer with experience developing production user interfaces for a variety of applications.
                I have backend and deployment experience as well – my preferred stack is a Go backend, React + Redux, and PostgreSQL with NGINX as a webserver
                and container orchestration using Kubernetes. I approach software engineering with three core values: creativity, functionality, and an overwhelming
                desire to keep learning. I love working as part of a team to create solutions to challenging problems.
              </p>
            </div>
          </div>
        </div>
        <div className="resume" ref={ el => { this.resume = el } }>
          <div className="container">
            <SectionTitle text="RESUME" />
            <ResumeSectionTitle text="EDUCATION" />
            <ResumeSection items={ education.items } leftTitle={ education.name } rightTitle={ education.title } years={ education.years } />
            <ResumeSectionTitle text="WORK EXPERIENCE" />
            <ResumeSection items={ smartbiz.items } leftTitle={ smartbiz.name } rightTitle={ smartbiz.title } years={ smartbiz.years } />
            <ResumeSection items={ aditazz.items } leftTitle={ aditazz.name } rightTitle={ aditazz.title } years={ aditazz.years } />
            <ResumeSection items={ dictybase.items} leftTitle={ dictybase.name } rightTitle={ dictybase.title } years={ dictybase.years } />
            <ResumeSection items={ lisa.items } leftTitle={ lisa.name } rightTitle={ lisa.title } years={ lisa.years } />
            <ResumeSectionTitle text="PROJECTS" />
            <ResumeSection items={ gifRoulette.items } leftTitle={ gifRoulette.name } rightTitle={ gifRoulette.title } years={ gifRoulette.years } />
            <ResumeSection items={ goChat.items } leftTitle={ goChat.name } rightTitle={ goChat.title } years={ goChat.years } />
            <ResumeSection items={ fifa.items } leftTitle={ fifa.name } rightTitle={ fifa.title } years={ fifa.years} />
            <ResumeSectionTitle text="TECHNICAL SKILLS" />
            <div className="technical-skills">
              <div className="skills">
                <b>Programming Languages: </b>{ languages }
              </div>
              <div className="skills">
                <b>Tools: </b>{ tools }
              </div>
              <div className="skills">
                <b>APIs: </b>{ apis }
              </div>
              <div className="skills">
                <b>Interests: </b>{ interests }
              </div>
            </div>
          </div>
        </div>
        <div className="projects" ref={ el => { this.projects = el } }>
          <div className="container" style={ {display: 'flex', flexWrap: 'wrap', justifyContent: 'center'} }>
            <div className="projects-container">
              <SectionTitle text="PROJECTS" />
              <Project title="FIFA Leaderboard" link="https://rudydeberry.com/fifa" src={ fifaApp } media="video"/>
            </div>
          </div>
        </div>
        <ContactForm ref={ el => { this.contactForm = el } } { ...this.state } toggleModal={ this.toggleModal.bind(this) } />
      </div>
    )
  }
}

export default App
