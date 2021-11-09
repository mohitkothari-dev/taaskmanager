import React from 'react'
import { useState } from 'react';
import Sketch from "react-p5"
import './Canvas.css'

function Canvas() {
    let w = window.innerWidth/2;
    let h = window.innerHeight-55;
    let dia=25;
    let brush=false;
    //p5's setup function
    let setup = (p5, canvasParentRef) => {
      //Canvas of size 1000x800 
      p5.createCanvas(w, h).parent(canvasParentRef);
      //if we put this inside draw we won't be able to draw
      p5.background(255);
    };
  
    //p5's draw function
    let draw = (p5) => {
      if(brush===true){
        //adding the color
        p5.fill(214,117,152);
        p5.noStroke();
        p5.circle(p5.mouseX,p5.mouseY,dia);
        if(p5.key==='2'){
          dia=50;
        }
        if(p5.key==='3'){
          dia=75;
        }
        if(p5.key==='4'){
          dia=150;
          p5.erase();
        }
      }
    };
    
    function mousePressed(p5) {
      p5.background(255);
    }

    function keyTyped(p5) {
      //Toggle brush on and off
      if(p5.key==='1'){
        brush = !brush;
      }
    }

    //IMAGE
    const [defaultImg,setDefaultImg] = useState('https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg');

    const imageHandler = (e) => {
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.readyState === 2) { //2 means operation completed
          setDefaultImg(reader.result);
        }
      }
      reader.readAsDataURL(e.target.files[0]);
    }

    return (
        <div className="canvas">
            <Sketch setup={setup} draw={draw} keyTyped={keyTyped} mousePressed={mousePressed}/>
            <div className="canvas__btn">
              <h4>Draw on the left side</h4>
              <p>Press 1 to toggle Brush on and off</p>
              <p>Press 2 to increase Brush size</p>
              <p>Press 3 to increase the Brush size to maximum</p>
              <p>Press 4 to use Eraser</p>
              <p>Mouse left click to clear the entire canvas</p>
              <h4>& Upload your Image over here</h4>
              <br /> 
                <div className="canvas__img">
                  <img src={defaultImg} alt="image" id="img" className="img" />
                </div>
                <input type="file" name="image-upload" id="input" accept="image/*" onChange={imageHandler} />
            </div>
        </div>
    )
}

export default Canvas
