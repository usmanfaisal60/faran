import React from 'react';

const ClassesList = props => {

    const {
        data
    } = props;

    return (
        <div className='w-100 h-100 pt-4 pr-3 pl-3 text-center'>
            {data ?
                data.map(el => {
                    console.log(el);
                    return (
                        <button key={el.id} className='w-100 mt-3 btn-light text-left p-3 shadow-sm border rounded'>
                            <h3 className='font-weight-lighter'>{el.name}</h3>
                            <div className='pl-5'>
                                <div>
                                    Section : {el.section ? el.section : 'no sections defined'}
                                </div>
                            </div>
                        </button>
                    )
                })
                :
                <div>
                    No data found
                </div>
            }
            {data ? <div className='h-12'></div> : null}
        </div>
    )
}

export default ClassesList;