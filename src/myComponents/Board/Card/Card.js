/* Represents every individual card */
import React from 'react'
import { Clock, Trash } from 'react-feather'
import { useState } from 'react/cjs/react.development'
import './Card.css'
import CardInfo from './CardInfo/CardInfo'

function Card(props) {

    const [showModal,setShowModal] = useState(false);
    const [background,setBackground] = useState("#ffffff"); //this is working

    const changeBg = () => {
        setBackground("#585abd");
    }

    return (
        <>
        {showModal && <CardInfo 
        onClose={()=>setShowModal(false)}
        card={props.card}
        updateCard={props.updateCard}
        boardId={props.boardId}
        >
        </CardInfo>}
        <div className="card" draggable
        onDragEnd={()=>props.handleDragEnd(props.card?.id,props.boardId)}
        onDragEnter={()=>props.handleDragEnter(props.card?.id,props.boardId)}
        onDoubleClick={()=>setShowModal(true)}
        style={{backgroundColor: background}}
        onClick={changeBg}
        >
            <div className="card__top">
                <h4>{props.card?.title}</h4>
                <Trash onClick={()=> props.removeCard(props.card?.id,props.boardId)}></Trash>
            </div>
            <div className="card__mid">
                <span>{props.card?.description}</span>
            </div>
            <div className="card__bottom">
                {props.card?.date && (
                <p><Clock></Clock> {props.card?.date}</p>
                )}
            </div>
        </div>
        </>
    )
}

export default Card
