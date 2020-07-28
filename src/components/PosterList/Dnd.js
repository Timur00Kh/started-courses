import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import deleteIcon from '../../icons/delete.svg'
import burgerIcon from '../../icons/burger.svg'

// fake data generator
const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid,
    margin: `0 0 ${grid}px 0`,
    cursor: 'default',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    width: '100%'
});

export default class Dnd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: getItems(10)
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.props.posters,
            result.source.index,
            result.destination.index
        );

        this.props.onPostersChange(items);
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        const posters = this.props.posters || [];
        const onPostersChange = this.props.onPostersChange;

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {posters.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <div className="row pl-0 align-items-center">
                                                <div className="col-auto pl-0">
                                                    <img style={{maxHeight: '150px', maxWidth: '200px'}} className="img-fluid" src={item.url} alt=""/>
                                                </div>
                                                <div className="col-auto ml-auto">
                                                    <img
                                                        style={{cursor: 'pointer'}}
                                                        onClick={() => {onPostersChange(posters.filter(e => e.id !== item.id))}}
                                                        src={deleteIcon}
                                                        alt="delete"
                                                    />
                                                </div>
                                                <div className="col-auto mx-2">

                                                    <img
                                                        style={{cursor: 'grab'}}
                                                        src={burgerIcon} alt="drag"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

