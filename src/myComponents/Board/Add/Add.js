import React, {useState} from 'react'
import { X } from 'react-feather'
import './Add.css'

function Add(props) {
    const [add, setAdd] = useState(false);
    const [inputValue,setInputValue] = useState(props.default || "");

    return (
        <div className="add">
            {
                add ? (
            <form className={`add__addDetails ${props.addClass || ""}`} onSubmit={ (e) => {
              e.preventDefault();
              if(props.onSubmit) {
                props.onSubmit(inputValue);
              }
              setAdd(false);
              setInputValue("");
            }}>
                <input 
                type="text" 
                value={inputValue} 
                onChange={(e)=>setInputValue(e.target.value)}
                placeholder={props.placeholder || "Enter item"}  
                autoFocus/>
                
                <div className="add__addDetails__bottom">
                    <button type="submit">{props.buttonText || "Add"}</button>
                    <X onClick={ ()=> setAdd(false) }></X>
                </div>
            </form>
            ) : (
            <p className={`add__display ${props.displayClass || ""}`} onClick={ () => setAdd(true) }>{props.text || "Add Card"}</p>
            )}
        </div>
    )
}

export default Add
