import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class itemObject {
  constructor(id, description) {
    this.id = id;
    this.description = description;
    this.checked = false;
  }
}


function App(props) {
  const [description, setDescription] = useState();
  const [items, setItems] = useState([]);
  const [id, setId] = useState(0)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const newItem = new itemObject(id, data.description);
    const refreshedItems = [...items, newItem];
    setDescription('');
    setItems(refreshedItems);
    setId(id+1);
  }
  
  const handleNewInputChange = (e) => {
    const { value } = e.target;
    setDescription(value);
  }

  const handleExistentInputChange = (e) => {
    const { id, value } = e.target;
    const newItems = items.map((item) => {
      if (item.id === parseInt(id)) {
        item.description = value
      }
      return item;
    });
    setItems(newItems);
  }

  const handleItemRemoval = (e) => {
    const { id } = e.target;
    let count = 0;
    for (let item of items) {
      if (item.id === parseInt(id)) {
        break;
      }
      count ++;
    }
    const newItems = [...items.slice(0, count), ...items.slice(count + 1)]
    setItems([...newItems]);
  }

  const handleItemCheck = (e, check) => {
    const { id } = e.target;
    let currentItems = items;
    for (let item of currentItems) {
      if (item.id === parseInt(id)) {
        item.checked = check;
        break;
      }
    }
    setItems([...currentItems]);
  }

  const handleCheckedItemsListRestoration = () => {
    var currentItems = items;
    for (let item of currentItems) {
      if (item.checked) {
        item.checked = false;
      }
    }
    setItems([...currentItems]);
  }

  const handleUncheckedItemRender = items.filter((item) => !item.checked)
    .map((item) => {
      return (
        <li key={item.id}>
          <input 
            type="checkbox"
            id={item.id}
            onClick={(e) => handleItemCheck(e, true)}
          />
          <input 
            type="text"
            value={item.description || ''}
            id={item.id}
            onChange={handleExistentInputChange}
          />
          <input
            type="submit"
            value="x"
            id={item.id}
            onClick={handleItemRemoval}
          />
      </li>
      )
    }).reverse();

  const handleCheckedItemRender = items.filter((item) => item.checked)
    .map((item) => {
      return (
        <li key={item.id}>
          <input 
            type="button"
            id={item.id}
            value="+"
            onClick={(e) => handleItemCheck(e, false)}
          />
          &nbsp;
          <input 
            type="button"
            id={item.id}
            value="x"
            onClick={handleItemRemoval}
          />
          &nbsp;<del>{item.description}</del>
        </li>
      );
    }).reverse();

  return (
    <div className="main">
      <div className="input">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="description"
            placeholder="Descrição"
            autoFocus
            value={description || ''}
            onChange={handleNewInputChange}
          />
          &nbsp;<input type="submit" value="+"/>
        </form>
        <br/>
      <input
        type="button"
        value="Restaurar Itens Marcados"
        onClick={handleCheckedItemsListRestoration}
      />
      <br/><br/>
      </div>
      <div className="products">
        <ul type="none">{handleUncheckedItemRender}</ul>
      </div>
      <div className="checkedItems">      
        ---Itens Marcados--- <br/>
        <ul type="none">{handleCheckedItemRender}</ul>
      </div>
    </div>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
