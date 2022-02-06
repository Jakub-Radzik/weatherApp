import React from 'react';
import {version} from '../../../package.json';

function Version(){

    const styles = {
        position: 'fixed',
        bottom: 0,
        right: 0,
        height: '30px',
        width: '20px',
        padding: '0 50px',
        fontSize: '20px',
        color: 'white',
        backgroundColor: '#3b33c8',
        borderRadius: '20px 0 0 0',
        zIndex: '900'
    }

    return (
        <div className={"version"} style={styles}>
            {version}
        </div>
    )
}

export default Version;