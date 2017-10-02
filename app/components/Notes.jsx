import React from 'react';

import Note from './Note';
import Editable from './editable'

export default ({
	notes, onDelete=() => {}, onEdit=() => {}, onNoteClick=() => {}
}) => (
	<ul className="notes">{notes.map(({id, editing, task}) =>
		<li key={id}>
			<Note className="note" onClick={onNoteClick.bind(null, id)}>
				<Editable
					className="editable"
					editing={editing}
					value={task}
					onEdit={onEdit.bind(null, id)} />
				<button className="delete" onClick={onDelete.bind(null, id)}>x</button>
			</Note>
		</li>
		)}
	</ul>
)