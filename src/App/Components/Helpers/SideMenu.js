import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faRestroom, faChalkboardTeacher, faArchway } from '@fortawesome/free-solid-svg-icons';


const SideMenu = props => {
    return (
        <div className='w-100 h-100'>
            <PanelButton icon={faArchway} onClick={() => props.history.replace('/')}>
                Dashboard
            </PanelButton>
            <PanelButton icon={faUser} onClick={() => props.history.replace('addStudent')}>
                Add a student
            </PanelButton>
            <PanelButton icon={faChalkboardTeacher} onClick={() => props.history.replace('teachers')}>
                Teachers
            </PanelButton>            
            <PanelButton icon={faRestroom} onClick={() => props.history.replace('classes')}>
                Classes
            </PanelButton>
                        
        </div>
    )
}

export default withRouter(SideMenu);

const PanelButton = props => {
    return (
        <div onClick={props.onClick} className='btn-secondary border-0 w-100 p-0 cursor-pointer'>
            <div className='w-100 p-3 ml-1 d-flex row '>
                <div className='flex-1'><FontAwesomeIcon icon={props.icon} /></div>
                <div className='flex-5'>{props.children}</div>
            </div>
        </div>
    );
}