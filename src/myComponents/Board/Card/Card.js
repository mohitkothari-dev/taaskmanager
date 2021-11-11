/* Represents every individual card */
import React, {useState} from 'react'
import { Clock, Trash } from 'react-feather'
import './Card.css'
import CardInfo from './CardInfo/CardInfo'
import { SketchPicker, sketchPicker } from 'react-color'

function Card(props) {

    const [showModal,setShowModal] = useState(false);
    const [background,setBackground] = useState("#ffffff"); //this is working
    const [setColor,setShowColor] = useState(false);

    const switchColor = () => {
        setShowColor((prevSetColor) => !prevSetColor );
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
                <div className="card__bottom__color">
                    <button className="card__bottom__colorButton" 
                    onClick={switchColor}
                    style={ {backgroundColor: background, 
                        height: "30px",
                        fontSize: "16px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        borderRadius: "30px",
                        cursor: "pointer"} }>Color</button>
                    {
                        setColor && (
                        <SketchPicker 
                        color={background}
                        onChangeComplete={ (background) => {setBackground(background.hex)}}
                        ></SketchPicker>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

export default Card
