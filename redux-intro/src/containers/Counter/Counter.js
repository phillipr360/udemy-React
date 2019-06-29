import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
  render () {
    return (
      <div>
        <CounterOutput value={this.props.ctr} total={this.props.total}/>
        <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
        <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
        <CounterControl label="Add 5" clicked={() => this.props.onAddValueCounter(5)}  />
        <CounterControl label="Subtract 5" clicked={() => this.props.onSubtractValueCounter(5)}  />
        <CounterControl label="Reset" clicked={this.props.onResetCounter}  />
        <CounterControl label="404" clicked={this.props.onTGCounter} />
        <hr/>
        <button onClick={() => this.props.onStoreResult(this.props.ctr, this.props.total)}>Store Result</button>
        <ul>
          {this.props.results.map((result, index) =>
            <li key={index} onClick={() => this.props.onDeleteResult(index)}>Counter: {result.counter} Total: {result.total}</li>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ctr: state.ctr.counter,
    total: state.ctr.total,
    results: state.res.results
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
    onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
    onAddValueCounter: (value) => dispatch({type: actionTypes.ADD_VALUE, value: value}),
    onSubtractValueCounter: (value) => dispatch({type: actionTypes.SUBTRACT_VALUE, value: value}),
    onStoreResult: (ctr, total) => dispatch({
      type: actionTypes.STORE_RESULT, 
      result: {
        counter: ctr,
        total: total
      }
    }),
    onDeleteResult: (index) => dispatch({type: actionTypes.DELETE_RESULT, index: index}),
    onResetCounter: () => dispatch({type: actionTypes.RESET}),
    onTGCounter: () => dispatch({type: '404'}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);