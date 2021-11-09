import React from 'react'
import { Calendar, List, Type } from 'react-feather'
import { useState,useEffect } from 'react/cjs/react.development'
import Modal from '../../../Modal/Modal'
import Add from '../../Add/Add'
import './CardInfo.css'

function CardInfo(props) {
    const [values,setValues] = useState({...props.card});

    useEffect(() => {
        props.updateCard(props.card.id,props.boardId,values)
    }, [values])
    return (
        <Modal onClose={()=>props.onClose()}>
        <div className="cardinfo">
            <div className="cardinfo__box">
                <div className="cardinfo__box__title">
                    <Type></Type>
                    Title
                </div>
                <Add 
                text={values.title} 
                default={values.title} 
                placeholder={"Enter title"}
                onSubmit={(value)=>setValues({...values,title:value})}//Fetching the input field's value
                >
                </Add>
            </div>

            <div className="cardinfo__box">
                <div className="cardinfo__box__title">
                    <List></List>
                    Description
                </div>
                <Add 
                text={values.description} 
                default={values.description} 
                placeholder={"Enter description"}
                onSubmit={(value)=>setValues({...values,description:value})}
                ></Add>
            </div>

            <div className="cardinfo__box">
                <div className="cardinfo__box__title">
                    <Calendar></Calendar>
                    Date
                </div>
                <input type="date" 
                defaultValue={values.date ? new Date(values.date).toISOString().substr(0,10): ""}
                onChange={(e)=>setValues({...values,date:e.target.value})}
                />
            </div>
        </div>
        </Modal>
    )
}

export default CardInfo
