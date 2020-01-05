import React from 'react';
import BluePrint from './Helpers/BluePrint';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {

    state = {
        email: '',
        password: '',
        loading: null,
        error: false
    }

    onLoginClick = () => {
        console.log(this.props);
        this.setState({ loading: true });
        this.props.attemptLogin(
            this.state.email,
            this.state.password,
            () => {
                this.setState({ loading: false });
                this.props.history.replace('/');

            },
            () => {
                this.setState({ loading: false, error: true })
            }
        );
    }

    render() {
        return (
            <BluePrint>
                <div className='w-100 h-100 d-flex flex-column align-items-center pt-5'>
                    <div className='w-50 p-4 shadow-md'>
                        <div className='w-100 d-flex row p-4 align-items-center'>
                            <div className='flex-1 pl-5'>
                                <h5 className='font-weight-lighter'>Email</h5>
                            </div>
                            <div className='flex-3'>
                                <input
                                    onChange={e => this.setState({ email: e.target.value })}
                                    className='border p-2 w-100 rounded' />
                            </div>
                        </div>
                        <div className='w-100 d-flex row p-4 align-items-center'>
                            <div className='flex-1 pl-5'>
                                <h5 className='font-weight-lighter'>Password</h5>
                            </div>
                            <div className='flex-3'>
                                <input
                                    onChange={e => this.setState({ password: e.target.value })}
                                    type='password'
                                    className='border p-2 w-100 rounded' />
                            </div>
                        </div>
                        <div className='w-100 d-flex flex-column p-4 align-items-center'>
                            <button
                                onClick={this.onLoginClick}
                                disabled={this.state.loading}
                                className='btn-success border-0 w-75 p-2 rounded'>
                                {this.state.loading ?
                                    <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    :
                                    'Login'
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </BluePrint>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state.login
    }
}

export default withRouter(connect(mapStateToProps, actions)(Login));