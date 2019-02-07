import React, { Component } from 'react';
import {connect} from 'react-redux';

import {incrementAction, decrementAction} from './../redux/action';

const mapStateToProps = (state) => {
    console.log(state);
    return {
        counter: state.count
    }
}

const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch(incrementAction()),
    decrement: () => dispatch(decrementAction())
});

const Counters = (props) => (
    <div>
        <h2>
            {props.counter}
        </h2>
        <button onClick={() => props.increment()}>+</button>
        <button onClick={() => props.decrement()}>-</button>
    </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Counters);