import React from 'react';
import BluePrint from './Helpers/BluePrint';
import { withRouter } from 'react-router-dom';



class Home extends React.Component {
    componentDidMount() {
        if (!sessionStorage.getItem('auth_token')) this.props.history.replace('/login');
    }

    render() {
        return (
            <BluePrint sideBar>
                <div>
                    Home
                </div>
            </BluePrint>
        )
    }
}

export default withRouter(Home);