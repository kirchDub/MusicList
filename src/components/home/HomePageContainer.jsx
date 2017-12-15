import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { incrementProgress, decrementProgress } from '../../actions/progress';

import HomePage from './HomePage';

export function  HomePageContainer(props)  {
    const { decrementProgress, incrementProgress } = props;
    return (
        <HomePage
            incrementProgress={ incrementProgress }
            decrementProgress={ decrementProgress }
        />
    )
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        incrementProgress: incrementProgress,
        decrementProgress: decrementProgress,
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(HomePageContainer);