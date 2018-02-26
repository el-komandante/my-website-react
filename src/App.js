import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Navbar from './features/nav'
import Resume from './features/resume';
import Blog from './features/blog'



export default class App extends Component {
    constructor() {
        super()
        this.state = {
            currentSection: 0,
            isModalOpen: false
        }
    }
    changeSection = (sectionId) => {
        this.setState({
            currentSection: sectionId
        })
    }
    render() {
        const { currentSection, isModalOpen } = this.state
        console.log(this.props)
        return (
            <BrowserRouter>
                <div>
                    <Navbar changeSection={ this.changeSection } currentSection={ currentSection } />
                    <Switch>
                        <Route exact path="/" render={ () => <Resume changeSection={ this.changeSection } currentSection={ currentSection } /> } />
                        <Route path="/blog/" component={ Blog } />
                    </Switch> 
                </div>
            </BrowserRouter>
        )
    }
}
