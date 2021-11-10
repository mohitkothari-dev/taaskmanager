import { useEffect, useState } from 'react';
import './App.css';
import Add from './myComponents/Board/Add/Add';
import Board from './myComponents/Board/Board';
import Canvas from './myComponents/Canvas/Canvas';

function App() {
  
  const boardsArray=[
    {
        id: Date.now() + Math.random()*2,
        title: "To Do", //Title of the board
        cards:[
            {
                id: Date.now() + Math.random(),
                title:"This is card 1",
                description:"This is card description where you can describe yourself.",
                date:""
            },
            {
                id: Date.now() + Math.random(),
                title:"This is card 2",
                description:"This is card description where you can describe yourself.",
                date:""
            }
        ]
    }
]

  const [boards,setBoards] = useState(JSON.parse(localStorage.getItem('taskscheduler')) || /*boardsArray*/[]);

  const addCard = (title,bid) => {
    const card = {
      id: Date.now() + Math.random(),
      title,
      description:"",
      date: ""
    };

    const index = boards.findIndex((item) => item.id === bid);

    if(index<0) return; //no card available

    const tempBoards = [...boards];     //copy of the existing boards
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
  };

  const removeCard = (cid,bid) => {
    const boardIndex = boards.findIndex((item) => item.id === bid);

    if(boardIndex<0) return; //no board available

    const cardIndex = boards[boardIndex].cards.findIndex((item) => item.id === cid);

    if(cardIndex<0) return; //no card available

    const tempBoards = [...boards];     //copy of the existing boards
    tempBoards[boardIndex].cards.splice(cardIndex,1);
    setBoards(tempBoards);
  }

  /* const addP5Canvas = () => {} */

  const addBoard = (title) => {
    setBoards([...boards,{
      id: Date.now() + Math.random(),
      title,
      cards: [],
    },
  ]);
  };

  const removeBoard = bid => {
    const tempBoards = boards.filter(item=>item.id!==bid);
    setBoards(tempBoards);
  }

  //Card Drag-n-Drop functionality
  const [targetCard, setTargetCard] = useState({
    cid: "",
    bid: "",
  });

  const handleDragEnter = (cid,bid) => {
    setTargetCard({
      cid,
      bid,
    });
  };

  const handleDragEnd = (cid,bid) => {
    let s_bIndex, s_cIndex,t_bIndex,t_cIndex; //source and card indexes
    s_bIndex = boards.findIndex(item=>item.id===bid)
    if(s_bIndex<0) return;
    
    s_cIndex = boards[s_bIndex].cards?.findIndex(item=>item.id===cid)
    if(s_cIndex<0) return;

    t_bIndex = boards.findIndex(item=>item.id===targetCard.bid)
    if(t_bIndex<0) return;
    
    t_cIndex = boards[t_bIndex].cards?.findIndex(item=>item.id===targetCard.cid)
    if(t_cIndex<0) return;

    const tempSwapBoards = [...boards];
    const tempSwapCard = tempSwapBoards[s_bIndex].cards[s_cIndex];
    
    tempSwapBoards[s_bIndex].cards.splice(s_cIndex,1);  //Detach the card from the source
    tempSwapBoards[t_bIndex].cards.splice(t_cIndex,0,tempSwapCard); //don't remove but append instead
    setBoards(tempSwapBoards);
  };

  //OPEN OR CLOSE CANVAS
  const [isCanvas,setIsCanvas] = useState(true);

  //Card Updation
  const updateCard = (cid,bid,card) => {
    const boardIndex = boards.findIndex((item) => item.id === bid);
    if(boardIndex<0) return;

    const cardIndex = boards[boardIndex].cards.findIndex((item) => item.id === cid);
    if(cardIndex<0) return; 

    const tempUpdate = [...boards];
    tempUpdate[boardIndex].cards[cardIndex]=card;
    setBoards(tempUpdate);
  }

  //Local Storage
  useEffect(()=> {
    localStorage.setItem('taskscheduler',JSON.stringify(boards));
  },[boards]); 

  const switchView = () => {
    setIsCanvas((prevIscanvas) => !prevIscanvas);
  }

  const [clicked,setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      window.location.assign('https://collaborative-drawing-demo.herokuapp.com/');
    }
  }) 

  return (
    <div className="app">
      <div className="app__navbar">
        <h4>Task Scheduler + Drawing app</h4>
        <button onClick={switchView} className="app__navbar__button">
          { isCanvas ? 'Open Sketch' : 'Open Task Scheduler'}
        </button>
        <button className="app__navbar__button__colab" onClick={()=> setClicked(true)}>Collab</button>
      </div>
      {isCanvas ?
      <div className="app__outer">
        <div className="app__boards">
          {
            /* data collection */
            boards.map((item)=><Board
            key={item.id} board={item}  //sending the entire board
            removeBoard={removeBoard}
            /* App to Board, Board to Card */
            addCard={addCard}
            removeCard={removeCard}
            handleDragEnd={handleDragEnd}
            handleDragEnter={handleDragEnter}
            updateCard={updateCard}
            ></Board>
          )}
          <Add
          displayClass="app__boards__newBoard" 
          text="ADD BOARD" 
          placeholder="Enter board Title"
          onSubmit={value=>addBoard(value)}
          ></Add>
        </div>
      </div>
    : 
    <Canvas></Canvas>
    }
    </div>
  );
}

export default App;
