import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import {compose} from 'redux';
import ItemTypes from '../constants/itemTypes';

const Note = ({
  connectDragSource, connectDropTarget, onMove, editing,
  isDragging, isOver, id, children, ...props
}) => {
	const dragSource = editing ? a => a : connectDragSource;
  return compose(connectDropTarget, dragSource)(
  <div style={{ opacity: isDragging || isOver ? 0 : 1}} {...props}>
  {children}
  </div>
  );
};

const noteSource = {
  beginDrag(props) {
    return {id: props.id
    };
  }
};

const noteTarget = {
	hover(targetProps, monitor) {
		const targetId = targetProps.id;
		const sourceProps = monitor.getItem();
		const sourceId = sourceProps.id;

		if (sourceId !== targetId) {
			targetProps.onMove({sourceId, targetId});
		}
	}
}

export default compose(
	DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	})),
	DropTarget(ItemTypes.NOTE, noteTarget, (connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	}))
)(Note)