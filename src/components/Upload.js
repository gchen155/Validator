import React, { useState, useEffect } from 'react';
import './Upload.css';
import { listTodos } from '../graphql/queries';
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation } from '../graphql/mutations';
import { API, Storage } from 'aws-amplify';

const initialFormState = { name: '', description: '' }

function Upload() {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchTodos();
  }

  async function fetchTodos() {
    const apiData = await API.graphql({ query: listTodos });
    const todosFromAPI = apiData.data.listTodos.items;
    await Promise.all(todosFromAPI.map(async todo => {
      if (todo.image) {
        const image = await Storage.get(todo.image);
        todo.image = image;
      }
      return todo;
    }))
    setTodos(apiData.data.listTodos.items);
  }

  async function createTodo() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createTodoMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setTodos([ ...todos, formData ]);
    setFormData(initialFormState);
  }

  async function deleteTodo({ id }) {
    const newTodosArray = todos.filter(todo => todo.id !== id);
    setTodos(newTodosArray);
    await API.graphql({ query: deleteTodoMutation, variables: { input: { id } }});
  }

  return (
    <div className="App">
      <h1>Validator App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="File name"
        value={formData.name}
      />
      <input
        type="date"
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="File date"
        value={formData.description}
      />
      <input
        type="file"
        onChange={onChange}
      />
      <button class="file-upload-btn" onClick={createTodo}>Upload file</button>
      <div style={{marginBottom: 30}}>
      {
        todos.map(todo => (
          <div key={todo.id || todo.name}>
            <h2>{todo.name}</h2>
            <p>{todo.description}</p>
            <button onClick={() => deleteTodo(todo)}>Delete todo</button>
              {/* <script>
                document.getElementById("link").setAttribute("href",todo.csv);
              </script>
              <a id="link">Uploaded file</a> */
              todo.csv
              }
          </div>
        ))
      }
      </div>
      
    </div>
  );
}

export default Upload;