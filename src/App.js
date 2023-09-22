import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function App() {
  const [formValues, setFormValues] = useState({email:"", password:"", favClass:"1"})
  const [validationStates, setValidationStates] = useState({
    emailState:   true,
    passwordState: true,  
    firstTimePass: false,
  });
  const formatConfirm = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  const clickSubmit = () => {
    const emailValidation = formatConfirm.test(formValues.email);
    setValidationStates({...validationStates,
      emailState:   emailValidation,
    });

    if (emailValidation && validationStates.passwordState){
      alert(JSON.stringify(formValues));
    } else {  
      alert("Please check your data");
    }

  };

  const handleEmailChange = ((e) => {
    setFormValues({...formValues, email: e.target.value})
  });
 
  const handlePasswordChange = ((e) => {
    const newPassword = e.target.value;
    const isPasswordValid = newPassword.length > 8 && /[0-9]/.test(newPassword) && /[a-zA-Z]/.test(newPassword)
    setFormValues({...formValues, password: newPassword})
    //password must have at least 9 chars,numbers and letters


    setValidationStates({...validationStates, passwordState: isPasswordValid, firstTimePass: true})
  });
 
  const handleSelectChange = ((e) => {
    setFormValues({...formValues, favClass: e.target.value})
  });

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>
     
      <Form>
      <Form.Group className="mb-6" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={formValues.email}/>
        { !validationStates.emailState && <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>}
      </Form.Group>
 
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={formValues.password} isValid={validationStates.firstTimePass && validationStates.passwordState} isInvalid={validationStates.firstTimePass && !validationStates.passwordState}/>
        { !validationStates.passwordState && <Form.Text className="text-muted">Your password should be have numbers and letters and should be at least 9 char long</Form.Text>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Favorite Class</Form.Label>
        <Form.Select onChange={handleSelectChange}>
          <option value="1">ISIS3710</option>
          <option value="2">Programación con tecnologias web</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" onClick={clickSubmit}>
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default App;