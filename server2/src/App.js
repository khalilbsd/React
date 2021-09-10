import React, { Component } from 'react'
import Video from './Video'
import Header from './Header'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<Router>
				<Header />
				<Switch>
					<Route path="/:url" component={Video} />
				</Switch>
			</Router>
		)
	}
}

export default App;