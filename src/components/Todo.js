import {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';

const Todo = () => {

    // getting data from local storage
    const getMyToDoData = () => {
        let myData = localStorage.getItem("notes");

        if(myData) {
            return JSON.parse(myData);
        }
        else {
            return [];
        }
    }

    const [data, setData] = useState("");
    const [items, setItems] = useState(getMyToDoData());




    // add new item into Todo list function...
    const addItem = () => {
        
        data !== "" ? setItems([...items, data]) : alert("kindly fill the data!");            
        setData("");
        
    }

    // delete item from todo list function... 
    const remove = (elem) => {      
        const myData = document.getElementById(elem);
        const updatedData = items.filter(elem => {
            
           return elem !== myData.value;
        
        })
        setItems(updatedData);
    }

    // remove all todo list tasks function...
    const removeAll = () => {
        setItems([]);
    }

    // edit data from todo item function...
    const editItem = (elem) => {
        const editBoxText = document.getElementById(elem).value;
        const updatedData = items.filter(elem => elem !== editBoxText);
        setItems(updatedData);
        setData(editBoxText);
    }

    // setting data in the local storage
    useEffect(() => {

        localStorage.setItem("notes", JSON.stringify(items));

    },[items])

    return (
        <>
            <div className="todoParentContainer" >
                <div className="todoChildContainer" >  
                    <label>ToDo App</label> 
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" onChange={event => setData(event.target.value)} value={data} id='itemText'  placeholder="Add Item"/>
                        <button className="btn btn-outline-secondary btnStyle" onClick={() => addItem()} type="button" ><FontAwesomeIcon icon={faPlus} id='plusIcon'/></button>
                    </div>
                    <br/>
                    <div id="listItems">
                        {items && items.map((elem,index) => {
                            return <div className="input-group mb-3" key={index}>
                                <input type="text" id={elem} className="form-control" value={elem}  readOnly/>
                                <button className="btn btn-outline-secondary btnStyle" onClick={() => editItem(elem)} type="button"><FontAwesomeIcon icon={faEdit} id='editIcon'/></button>
                                <button className="btn btn-outline-secondary btnStyle" onClick={() => remove(elem)} type="button" ><FontAwesomeIcon icon={faTrash} id='faTrash'/></button>
                            </div>
                        })}
                    </div>
                    <br/>
                    <button type='button' onClick={() => removeAll()} className="btn btn-outline-danger form-control">Remove All</button>
                </div>
            </div>

        </>
    )
}

export default Todo;