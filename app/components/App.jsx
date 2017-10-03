import React from 'react';
import uuid from 'uuid';
import {compose} from 'redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Notes from './Notes';
import Lanes from './Lanes';

import connect from '../libs/connect';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';

const App = ({LaneActions, lanes}) => {
  const addLane = () => {
    LaneActions.create({
      id: uuid.v4(),
      name: 'New lane'
    });
  };

  return (
    <div>
      <button className="add-lane" onClick={addLane}>+</button>
      <Lanes lanes={lanes} />
    </div>
  );
};

export default compose(
	DragDropContext(HTML5Backend),
	connect(
		({lanes}) => ({lanes}), 
		{LaneActions}
	)
)(App)

/*class App extends React.Component {

	activateNoteEdit = (id) => {
		this.props.NoteActions.update({id, editing: true});
	}

	addNote = () => {
		this.props.NoteActions.create({
			id: uuid.v4(),
			task: 'New Task'
		});
	}

	deleteNote = (id, e) => {
		e.stopPropagation();
		this.props.NoteActions.delete(id);
	}

	editNote = (id, task) => {
		this.props.NoteActions.update({id, task, editing: false});
	}

	render() {
		const {notes} = this.props;
		return (
			<div>
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

export default connect(({notes}) => ({
	notes
}), {
	NoteActions
})(App)*/