import React from 'react';
import Aux from '../HOC/Auxiliary';
import SideMenu from './SideMenu';

const BluePrint = props => {
    return (
        <Aux>
            <div className='w-100 h-12 shadow-md d-flex flex-column align-items-center border-bottom'>
                <div className='col-10 d-flex row align-items-center h-100'>
                    <img
                        className='h-75 mr-4'
                        alt='Faran'
                        src='./logo.png' />
                    <h3 className='font-weight-lighter'>
                        Welcome to Faran Kids Campus online portal
                    </h3>
                </div>
            </div>
            <div className='h-88 d-flex row w-100 p-0 m-0'>
                {
                    props.sideBar ?
                        <Aux>
                            <div className='col-2 h-100 p-0 m-0 bg-secondary'>
                                <SideMenu />
                            </div>
                            <div className='col-10 h-100 p-0 m-0 bg-light'>
                                {props.children}
                            </div>
                        </Aux>
                        :
                        <Aux>
                            {props.children}
                        </Aux>

                }
            </div>
        </Aux>
    )
}

export default BluePrint;