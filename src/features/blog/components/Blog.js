import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Homepage from './Homepage'

export default class Blog extends Component {
    render() {
        return (
            <div className="blog">
                <Switch>
                    <Route exact path={this.props.match.path} component={Homepage} />
                </Switch>
            </div>
        )
    }
}