import React,{useEffect, useState} from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';

function App() {
  const [isCompleteScreen,setisCompleteScreen] = useState(false);
  const [allTodos,setTodos] = useState([]);
  const [newTitle,setNewTitle] = useState("");
  const [newDescription,setNewDescription] = useState("");
  const [completeTodos,SetCompleteTodos] = useState([]);

  const handlerAddTodo = () => {

    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }

    let updatedTodoArray = [...allTodos];
    updatedTodoArray.push(newTodoItem);
    setTodos(updatedTodoArray);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArray));
    setNewTitle('');
    setNewDescription('');
  };

  const handlerDelete = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handlerDeleteCompleted = (index) => {
    let reducedTodo = [...completeTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('completeTodos',JSON.stringify(reducedTodo));
    SetCompleteTodos(reducedTodo);
  }

  const handlerComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn = dd + mm + '-' + yyyy + 'at' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompletedArr = [...completeTodos];
    updatedCompletedArr.push(filteredItem);
    SetCompleteTodos(updatedCompletedArr);
    handlerDelete(index);
    localStorage.setItem('completeTodos', JSON.stringify(updatedCompletedArr))
  }

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompleted = JSON.parse(localStorage.getItem('completeTodos'));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompleted) {
      SetCompleteTodos(savedCompleted);
    }
  },[]);

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-items">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e) =>setNewTitle(e.target.value)}placeholder="Write The task Name" required />
          </div>
          <div className="todo-input-items">
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e) =>setNewDescription(e.target.value)} placeholder="Write the Description of Task" required/>
          </div>
          <div className="todo-input-items">
            <button type="button" onClick={handlerAddTodo} className="primaryBtn">Add Todo's</button>
          </div>
        </div>
        <div className="btn-area">
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() =>setisCompleteScreen(false)}>Todo's</button>
          <button  className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={() =>setisCompleteScreen(true)}>Completed</button>
        </div>
        <div className="todo-list">
        {isCompleteScreen === false && allTodos.map((item,index)=>{
          return(
            <div className="todo-list-item" key={index}>
          <div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
          <div>
            <AiOutlineDelete className='delete-icon' onClick={() =>handlerDelete(index)} title='Delete?'/>
            <BsCheckLg className='check-icon' onClick={() =>handlerComplete(index)} title='Completed?'/>
          </div>
          </div>
          )
        })}
        {isCompleteScreen === true && completeTodos.map((item,index)=>{
          return(
            <div className="todo-list-item" key={index}>
          <div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p><small>Completed On : {item.completedOn}</small></p>
          </div>
          <div>
            <AiOutlineDelete className='delete-icon' onClick={() =>handlerDeleteCompleted(index)} title='Delete?'/>
          </div>
          </div>
          )
        })}
          </div>
      </div>
    </div>
  );
};

export default App;
