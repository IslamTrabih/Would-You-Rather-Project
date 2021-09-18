import React from 'react'
import error_404 from '../../utils/imgs/404 -error.png'

function Error_404() {
    return (
        <div >
            <img src={error_404} alt='404_Error' title='Page Not Found' style={{width: '100%'}} />
        </div>
    )
}

export default Error_404
