import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions';
import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {
  render () {
    return (
      <div>
        <AddPerson personAdded={() => this.props.onPersonAdded({
          id: Math.random(),
          name: 'Phil R',
          age: Math.floor( Math.random() * 40 )
        })} />
        {this.props.persons.map(person => (
           <Person 
              key={person.id}
              name={person.name} 
              age={person.age} 
              clicked={() => this.props.onPersonDeleted(person.id)}
           />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    persons: state.personReducer.persons
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onPersonAdded: (newPerson) => dispatch({type: actionTypes.ADD_PERSON, newPerson: newPerson}),
    onPersonDeleted: (id) => dispatch({type: actionTypes.DELETE_PERSON, id: id}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);