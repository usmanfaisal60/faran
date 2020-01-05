import React from 'react';
import BluePrint from './Helpers/BluePrint';
import ClassesList from './Helpers/ClassesList';
import { Modal, Spinner } from 'react-bootstrap';
import Aux from './HOC/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';


class Classes extends React.Component {

    state = {
        showModal: false,
        uploading: false,

        name: '',
        section: '',
        error: '',
        loader: false
    }

    componentDidMount() {
        const {
            getAllClasses,
        } = this.props;

        this.setState({ loader: true });
        getAllClasses(
            () => {
                this.setState({ loader: false });
            },
            () => {
                this.setState({ loader: false });
            });
    }

    render() {
        const {
            addClass,
            classes
        } = this.props;

        return (
            <BluePrint sideBar>
                <div className='w-100 h-100 shadow-md d-flex flex-column overflow-hidden'>
                    <div id='topBar' className='flex-1 border-bottom bg-dark d-flex row h-100 justify-content-around'>
                        <div className='col-9 d-flex row align-items-center h-100 justify-content-between'>
                            <h4 className='font-weight-lighter text-white'>All Classes</h4>
                            <button onClick={() => this.setState({ showModal: true })} className='btn-light border rounded h-50 w-25'>
                                Add new class
                            </button>
                        </div>
                    </div>
                    <div className='flex-6 d-flex flex-column  overflow-auto justify-content-center align-items-center'>
                        {!this.state.loader ?
                            <ClassesList data={classes} />
                            :
                            <Spinner variant='danger' animation='border' />
                        }
                    </div>

                </div>
                <Modal
                    show={this.state.showModal}
                    centered
                    onHide={() => {
                        if (!this.state.uploading) this.setState({ showModal: false });
                    }}
                    size='lg'>
                    <Modal.Header closeButton>
                        <Modal.Title className='font-weight-lighter'>
                            Add new class form
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.uploading ?
                            <div className='w-100 d-flex flex-column align-items-center'>
                                <Spinner animation='border' variant='warning' />
                            </div>
                            :
                            <Aux>
                                <div className='w-100 p-2 d-flex row justify-content-center align-items-center'>
                                    <div className='flex-1 d-flex'>
                                        <h5 className='pl-3 font-weight-lighter'>Class name</h5>
                                    </div>
                                    <div className='flex-3'>
                                        <input
                                            onChange={(e) => this.setState({ name: e.target.value })}
                                            className='p-2 border rounded w-100' />
                                    </div>
                                </div>
                                <div className='w-100 p-2 d-flex row justify-content-center align-items-center'>
                                    <div className='flex-1'>
                                        <div className='pl-3 font-weight-lighter'>Section (if applicable)</div>
                                    </div>
                                    <div className='flex-3'>
                                        <input
                                            onChange={(e) => this.setState({ section: e.target.value })}
                                            className='p-2 border rounded w-100' />
                                    </div>
                                </div>
                            </Aux>
                        }
                        {this.state.error ?
                            <div className='w-100 d-flex flex-column align-items-center'>
                                An error occurred while connecting to server
                            </div>
                            :
                            null
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={() => {
                                const {
                                    name,
                                    section,
                                } = this.state;
                                this.setState({ uploading: true });
                                addClass(
                                    name,
                                    section,
                                    () => {
                                        this.setState({ uploading: false, showModal: false });
                                    },
                                    () => {
                                        this.setState({ uploading: false, error: true });
                                    });
                            }}
                            disabled={this.state.uploading}
                            className='btn-success w-25 p-2 border rounded'>
                            Save
                        </button>
                        <button
                            onClick={() => this.setState({ showModal: false })}
                            disabled={this.state.uploading}
                            className='btn-danger w-25 p-2 border rounded'>
                            Cancel
                        </button>
                    </Modal.Footer>
                </Modal>
            </BluePrint>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.classes
    }
}

export default connect(mapStateToProps, actions)(Classes);