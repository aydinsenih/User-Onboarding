import Form from './Form';
import Users from './Users';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import schema from "./validation/formSchema";
import * as yup from 'yup';

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  role: "",
  tos: false
}
const initialFormErrors = {
  name: "",
  email: "",
  password: "",
  role: "",
  tos: "",
};
const initialUsers = [];
const initialDisabled = true;

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(initialDisabled);

  const postUser = (user) => {
    
    axios
    .post("https://reqres.in/api/users", user)
    .then((res) => {
      setUsers([res.data, ...users]);
      setFormValues(initialFormValues);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const inputChange = (name, value) => {
    
    yup
    .reach(schema, name)
    .validate(value)
    .then(()=>{
      setFormErrors({...initialFormErrors, [name]: "",});
    })
    .catch((err)=>{
      setFormErrors({...formErrors, [name]:err.errors[0],})
    })
    setFormValues({...formValues, [name]:value,})
  }

  const formSubmit = () => {
    if (disabled) return;
    const newFriend = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      role: formValues.role.trim(),
      tos: formValues["tos"]
    };
    postUser(newFriend);
  }

  useEffect(()=>{
    schema.isValid(formValues).then(valid => {
      setDisabled(!valid);
    })
  },[formValues])

  

  return (
    <div className="container">
      <Form 
      change={inputChange}
      submit={formSubmit}
      values={formValues}
      errors={formErrors}
      disabled={disabled}/>
      {users.map(user => {
        return <Users details={user} key={user.id}/>
      })}
    </div>
  );
}

export default App;
