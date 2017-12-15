import React from 'react';
import { Button } from 'reactstrap'; 

import Sidebar from '../shared/Sidebar';

export default function HomePage(props) {
    const { decrementProgress, incrementProgress } = props;
    return (
        <div className="row">
            <div className="col-sm-12 col-md-8">
                <Button onClick={incrementProgress}>Increment</Button> &nbsp;
                <Button onClick={decrementProgress}>Decrement</Button>            
            </div>
            <Sidebar />
        </div>
    );
}