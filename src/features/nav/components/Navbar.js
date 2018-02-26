import React, { Component } from 'react'
import { spring, Motion } from 'react-motion'
import { Link, withRouter } from 'react-router-dom'
import ScrollLink from './ScrollLink'

class Navbar extends Component {
    getEndX() {
        const { currentSection } = this.props
        return 10 + (currentSection * 100)
    }
    componentDidMount() {
        if (this.props.location.pathname.includes('/blog')) {
            this.props.changeSection(4)
        }
    }
    render() {
        const { changeSection, toggleModal, location } = this.props
        const isBlog = location.pathname.includes('/blog')
        const navParams = {stiffness: 280, damping: 28}
        const startX = 9.3
        const endX = this.getEndX()
        return (
                <nav className={ isBlog ? 'navbar--blog' : 'navbar' }>
                    <Motion defaultStyle={ {x: startX} } style={ {x: spring(endX, navParams)} }>
                        {style => <div className={ isBlog ? 'nav-border--blog' : 'nav-border' } style={ {left: style.x} } />}
                    </Motion>
                    <div className={ isBlog ? 'nav-border--blog' : 'nav-border' } style={ {right: 10.5} } />
                    <ScrollLink to={ isBlog ? '/' : null } style={ { marginLeft: 12 } } number={ 0 } section={ this.splash } onClick={ changeSection } text="Home" />
                    <ScrollLink to={ isBlog ? '/' : null } number={ 1 } onClick={ changeSection } text="About" />
                    <ScrollLink to={ isBlog ? '/' : null } number={ 2 } onClick={ changeSection } text="Resume" />
                    <ScrollLink to={ isBlog ? '/' : null } number={ 3 } onClick={ changeSection } text="Projects" />
                    <ScrollLink to="/blog" number={ 4 } onClick={ changeSection } text="Blog" />
                    { window.innerWidth > 600 && <ScrollLink to={ null } style={ {marginLeft: 'auto', marginRight: 12, zIndex: 200} } onClick={ toggleModal } text="Contact" /> }
                </nav>
        )
    }
}

export default withRouter(Navbar)