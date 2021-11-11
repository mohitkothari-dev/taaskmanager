/* Represents every individual card */
import React, {useState} from 'react'
import { Clock, Trash } from 'react-feather'
import './Card.css'
import CardInfo from './CardInfo/CardInfo'
import { SketchPicker, sketchPicker } from 'react-color'

function Card(props) {

    const [showModal,setShowModal] = useState(false);

    const [background,setBackground] = useState("#ffffff"); 
    const [setColor,setShowColor] = useState(false);

    const [fontColor, setFontColor] = useState("#000000");
    const [setFont, setShowFont] = useState(false);

    const switchColor = () => {
        setShowColor((prevSetColor) => !prevSetColor );
    }

    const switchFontColor = () => {
        setShowFont((prevSetFont) => !prevSetFont);
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
        style={{backgroundColor: background, color: fontColor}}
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
                <div className="card__bottom__div">
                    <div className="card__bottom__color">
                        <button 
                        onClick={switchColor}
                        style={ {backgroundColor: background,
                            color : fontColor,
                            height: "30px",
                            fontSize: "16px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            borderRadius: "30px",
                            cursor: "pointer"} }>Background</button>
                        {
                            setColor && (
                            <SketchPicker 
                            color={background}
                            onChangeComplete={ (background) => {setBackground(background.hex)}}
                            ></SketchPicker>
                        )}
                    </div>
                    <div className="card__bottom__color">
                        <button 
                        onClick={switchFontColor}
                        style={ {backgroundColor: background,
                            color : fontColor, 
                            height: "30px",
                            fontSize: "16px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            borderRadius: "30px",
                            cursor: "pointer"} }>Font</button>
                        {
                            setFont && (
                            <SketchPicker 
                            color={fontColor}
                            onChangeComplete={ (fontColor) => {setFontColor(fontColor.hex)}}
                            ></SketchPicker>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Card
