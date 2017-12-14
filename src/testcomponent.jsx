import React from 'react';

export default function testComponent(props) {
    const { headline, count , showCount} = props;
    return (
        <div>
            <h1>{headline}</h1>
            {showCount ? <p>{count}</p> : null}
            <h2>What1</h2>            
        </div>         
    );
}