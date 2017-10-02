import React from 'react';
import uuid from 'uuid';

import Notes from './Notes';
import connect from '../libs/connect';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			notes : [
				{
					id: uuid.v4(),
					task: 'First Task'
				},
				{
					id: uuid.v4(),
					task: 'Second task'
				}
			]
		};
	}

	activateNoteEdit = (id) => {
		this.setState ({
			notes: this.state.notes.map(note => {
				if(note.id == id) {
					note.editing = true;
				}
				return note;
			})
		});
	}

	addNote = () => {
		this.setState({
			notes: this.state.notes.concat([{
				id: uuid.v4(),
				task: 'New Task'
			}])
		});
	}

	deleteNote = (id, e) => {
		e.stopPropagation();
		this.setState({
			notes: this.state.notes.filter(note => note.id != id)
		});
	}

	editNote = (id, task) => {
		this.setState({
			notes: this.state.notes.map(note => {
				if (note.id == id) {
					note.editing = false;
					note.task = task;
				}
				return note;
			})
		});
	}

	render() {
		const {notes} = this.state;

		return (
			<div>
				{this.props.test}
				<button className="add-note" onClick={this.addNote}>+</button>
				<Notes 
					notes={notes} 
					onNoteClick={this.activateNoteEdit}
					onDelete={this.deleteNote}
					onEdit={this.editNote} 
				/>
			</div>
		);
	}
}

export default connect(() => ({
	test: 'test'
}))(App)