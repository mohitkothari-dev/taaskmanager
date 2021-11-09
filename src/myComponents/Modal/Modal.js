import React from 'react'
import './Modal.css'

function Modal(props) {
    return (
        <div className="modal" onClick={()=>props.onClose ? props.onClose() : ""} >
            <div className="modal__content" 
            onClick={(e)=>e.stopPropagation()}
            >
            {props.children}
            </div>
        </div>
    )
}

export default Modal
