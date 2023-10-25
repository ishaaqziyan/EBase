import {useState} from 'react';
import { createAuthUserWithEmailAndPassword, CreateUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';

const deafultformFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
   const [formFields, setFormFields] = useState(deafultformFields);
   const {displayName, email, password, confirmPassword} = formFields;

   console.log(formFields);

   const resetFormFields = () => {
    setFormFields(deafultformFields);
   }

   const handleSubmit = async (event) => {
     event.preventDefault();

     if (password !== confirmPassword){
        alert("Your passwords don't match!");
        return;
     }
       try {
        const { user} = await createAuthUserWithEmailAndPassword (
            email, 
            password
        );

        await CreateUserDocumentFromAuth(user, {displayName});
        resetFormFields();

       } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            alert('Cannot create user, email already exists');
        }
        console.log('user creation encountered an error',error);
       }
        
   }; 

   const handleChange = (event) => {
      const {name, value} = event.target;

      setFormFields({...formFields, [name]: value});
   };

    return(
        <div>
            <h1>Sign Up With Email + Password</h1>
            <form onSubmit={handleSubmit}>
                
                <FormInput
                    label="Display Name"
                    type="text" 
                    required onChange={handleChange} 
                    name="displayName"  
                    value = {displayName}/>

                
                <FormInput
                    label="Email" 
                    type="email" 
                    required onChange={handleChange} 
                    name="email" 
                    value = {email} />

                <FormInput 
                    label ="Password"
                    type="password" 
                    required onChange={handleChange} 
                    name="password" 
                    value = {password}/>
                 
                <FormInput 
                   label = "Confirm Password"
                    type="password" 
                    required onChange={handleChange} 
                    name="confirmPassword" 
                    value = {confirmPassword}/>

                <button type ="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;