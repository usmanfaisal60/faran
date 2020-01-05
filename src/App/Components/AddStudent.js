import React from 'react';
import BluePrint from './Helpers/BluePrint';
import Aux from './HOC/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import { Spinner, Modal } from 'react-bootstrap';
import Select from 'react-select';


class AddStudent extends React.Component {

    state = {
        loader: false,
        classId: '',
        options: null,
        showModal: false,
        emptyFieldsError: false,
        uploadError: false,
        name: '',
        father_name: '',
        mother_name: '',
        father_phone: '',
        mother_phone: '',
        address: ''
    }

    componentDidMount() {
        const {
            classes,
            getAllClasses
        } = this.props;

        if (classes) {
            const options = classes.map(el => ({ label: el.name + ' Section ' + el.section, value: el.id }));
            this.setState({ options });
        } else {
            this.setState({ loader: true });
            getAllClasses(
                () => {
                    this.setState({ loader: false });
                },
                () => {
                    this.setState({ loader: false });
                }
            );
        }
    }

    componentDidUpdate() {
        const {
            classes
        } = this.props;

        if (classes && !this.state.options) {
            const options = classes.map(el => ({ label: el.name + ' Section ' + el.section, value: el.id }));
            this.setState({ options });
        }
    }

    onSubmitHandler = () => {
        const {
            name,
            father_name,
            mother_name,
            father_phone,
            mother_phone,
            address,
            password
        } = this.state;

        if (name && father_name && father_phone && password) {
            console.log(this.state);
            this.setState({ showModal: true });
            this.props.addStudent(
                name,
                father_name,
                mother_name,
                father_phone,
                mother_phone,
                address,
                password,
                () => {
                    this.setState({ showModal: false });
                },
                () => {
                    this.setState({ uploadError: true });
                })
        } else this.setState({ emptyFieldsError: true });
    }

    render() {

        const {
            name,
            father_name,
            mother_name,
            father_phone,
            mother_phone,
            address,
            password
        } = this.state;

        return (
            <BluePrint sideBar>
                <div className='w-100 h-100 shadow-md d-flex flex-column overflow-hidden'>
                    <div id='topBar' className='flex-1 bg-dark border-bottom d-flex row h-100 justify-content-around'>
                        <div className='col-9 d-flex row text-white align-items-center h-100 justify-content-between'>
                            <h4 className='font-weight-lighter'>New student from</h4>
                            <button onClick={this.onSubmitHandler} className='btn-light border rounded h-50 w-25'>
                                Save
                            </button>
                        </div>
                    </div>
                    <div className='flex-6 d-flex flex-column  overflow-auto align-items-center'>
                        {this.state.loader ?
                            <div className=' h-100 d-flex flex-column align-items-center justify-content-center'>
                                <Spinner size='large' variant='success' animation='border' />
                            </div>
                            :
                            <Aux>
                                <div className='row p-5 align-self-start w-100'>
                                    <Select
                                        className='w-100 mb-3'
                                        placeholder='Select a class'
                                        onChange={(value) => this.setState({ classId: value.value })}
                                        options={this.state.options} />
                                    <input
                                        className='w-100 mb-3 rounded border p-2'
                                        onChange={(event) => this.setState({ name: event.target.value })}
                                        value={name}
                                        placeholder="Student's name *" />
                                    <input
                                        className='w-100 mb-3 rounded border p-2'
                                        onChange={(event) => this.setState({ father_name: event.target.value })}
                                        value={father_name}
                                        placeholder="Father's name *" />
                                    <input
                                        className='w-100 mb-3 rounded border p-2'
                                        onChange={(event) => this.setState({ mother_name: event.target.value })}
                                        value={mother_name}
                                        placeholder="Mother's name (Optional)" />
                                    <input
                                        className='w-100 mb-3 rounded border p-2'
                                        onChange={(event) => this.setState({ password: event.target.value })}
                                        value={password}
                                        placeholder="Password *" />
                                    <input
                                        className='w-100 mb-3 rounded border p-2'
                                        onChange={(event) => this.setState({ father_phone: event.target.value })}
                                        value={father_phone}
                                        placeholder="Father's phone number *" />
                                    <input
                                        className='w-100 mb-3 rounded border p-2'
                                        onChange={(event) => this.setState({ mother_phone: event.target.value })}
                                        value={mother_phone}
                                        placeholder="Mother's phone number (Optional)" />
                                    <input
                                        className='w-100 mb-3 rounded border p-2'
                                        onChange={(event) => this.setState({ address: event.target.value })}
                                        value={address}
                                        placeholder="Address (Optional)" />
                                </div>
                            </Aux>
                        }
                    </div>
                </div>
                {this.state.emptyFieldsError ?
                    <Modal
                        show={this.state.emptyFieldsError}
                        centered
                        backdrop='static'
                        onHide={() => {
                            if (!this.state.loader) this.setState({ emptyFieldsError: false });
                        }}
                        size='lg'>
                        <Modal.Header closeButton>
                            <h3 className='font-weight-lighter'>Incomplete data</h3>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='pl-5'>
                                Please fill out all the mandatory information in order to proceed to save the record
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className='row w-100 justify-content-end pr-5'>
                                <button
                                    className='btn-primary w-25 border-0 p-1 rounded'
                                    onClick={() => {
                                        if (!this.state.loader) this.setState({ emptyFieldsError: false });
                                    }}>
                                    Ok
                                </button>
                            </div>
                        </Modal.Footer>
                    </Modal>
                    :
                    null
                }

                {this.state.showModal ?
                    <Modal
                        show={this.state.showModal}
                        centered
                        onHide={() => {
                            if (!this.state.loader) this.setState({ showModal: false });
                        }}
                        backdrop='static'
                        size='lg'>
                        <Modal.Header>
                            <h3 className='font-weight-lighter'>Saving record. Please wait</h3>
                        </Modal.Header>
                        {this.state.uploadError ?
                            <Modal.Body>
                                <div className='pl-5'>
                                    record not saved.
                                </div>
                            </Modal.Body>
                            :
                            null
                        }
                        <Modal.Footer>
                            <div className='row w-100 justify-content-center pr-5'>
                                {this.state.uploadError ?
                                    <button
                                        className='btn-primary w-25 border-0 p-1 rounded'
                                        onClick={() => {
                                            if (!this.state.loader) this.setState({ showModal: false, uploadError: false });
                                        }}>
                                        Ok
                                    </button>
                                    :
                                    <Spinner animation='border' variant='warning' />
                                }
                            </div>
                        </Modal.Footer>
                    </Modal>
                    :
                    null
                }
            </BluePrint>
        );
    }
}


const mapStateToProps = state => {
    return {
        ...state.classes
    }
}

export default connect(mapStateToProps, actions)(AddStudent);