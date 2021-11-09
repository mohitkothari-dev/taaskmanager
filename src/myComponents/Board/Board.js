import React from 'react'
import { Trash2 } from 'react-feather'
import Card from './Card/Card'

import './Board.css'
import Add from './Add/Add'

function Board(props) {
    return (
        <div className="board">
            <div className="board__top">
                <p className="board__top__title">{props.board?.title}<span>{` ${props.board?.cards?.length}`}</span></p>
                <Trash2 onClick={() => props.removeBoard(props.board?.id)}></Trash2>
            </div>
            <div className="board__cards">
                {//using the chaining operator so that it don't produce error for undefined values
                props.board?.cards?.map((item)=> (<Card key={item.id} card={item} 
                    removeCard={props.removeCard} /* received from props and passing it further*/
                    boardId={props.board?.id}
                    handleDragEnd={props.handleDragEnd} handleDragEnter={props.handleDragEnter}
                    updateCard={props.updateCard}
                    > 
                    </Card>
                ))}
                <Add 
                displayClass="board__cards__add" 
                placeholder="Enter Card Title"
                onSubmit={(value)=>props.addCard(value,props.board?.id)}
                ></Add>
            </div>
        </div>
    )
}

export default Board
