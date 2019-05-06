import React from 'react';
import Person from './Person/Person';

const persons = (props) => props.persons.map((person, index) => {
	return <Person
	  key={person.id}
	  name={person.name}
	  age={person.age}
	  clickHandler={() => props.clicked(index)}
	  changed={(event) => props.changed(event, person.id)}
	>
	  Status: {person.status}
	</Person>
});

export default persons;