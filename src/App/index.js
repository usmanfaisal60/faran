import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import reducers from './redux/reducers'
import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home';
import AddStudent from './Components/AddStudent';
import Classes from './Components/Classes';
import Teachers from './Components/Teachers';


const App = props => {
    return (
        <Provider store={createStore(reducers, applyMiddleware(thunk))}>
            <BrowserRouter>
                <Switch>
                    <Route path='/login' >
                        <Login />
                    </Route>
                    <Route path='/addStudent' >
                        <AddStudent />
                    </Route>
                    <Route path='/classes' >
                        <Classes />
                    </Route>
                    <Route path='/teachers' >
                        <Teachers />
                    </Route>
                    <Route path='/' >
                        <Home />
                    </Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default App;