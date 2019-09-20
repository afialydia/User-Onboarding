import React, {useState, useEffect} from "react";
import {render} from "react-dom";
import * as Yup from "yup";
import styled from "styled-components";
import {withFormik, Form, Field} from "formik";
import axios from "axios";

const Wrapper = styled.div`
max-width: 800px;
min-height: 40vh;
background:rgb(253,202,35);
color:rgb(208,136,10);
margin: 0 auto;
align-items:center;
border: 5px dashed;
border-radius:12px;
display: flex;
flex-direction: column;
`


const UserForm = ({
    values,
    errors,
    touched,
    status 
}) =>{

    const [users, setUsers] = useState([])
    useEffect(()=>{
        if (status) {
            setUsers(users => [...users, status])
        }
    }, [status])

    return(
    <Wrapper>
        <h1>Hello from Form.js</h1>
        <Form>
          <span>
          <Field type="text" name="name" placeholder="Name"/>
          { touched.name && errors.name && <p>{errors.name}</p> }
          </span>
          
          <span>
          <Field type="email" name="email" placeholder="Email"/>
          { touched.email && errors.email && <p>{errors.email}</p> }
          </span>

          <span>
          <Field type="password" name="password" placeholder="Password"/>
           { touched.password && errors.password && <p>{errors.password}</p> }
           </span>

          

          <Field component="select" name="DesiredRole">
              <option value="Pick One"> Pick One</option>
              <option value="UX Design"> UX Design</option>
              <option value="Front End Development">Front End Development</option>
              <option value="Back End Development">Back End Development</option>
          </Field>

            <label>Terms Of Service
            <Field type="checkbox" name="ToS" checked={values.ToS}/>
            </label>

          <button type="submit">Submit</button>

        </Form>
        {users.map(user=>( 
            <div key={user.id}>
                <span>Name: {user.name}</span>
                <span>Email: {user.email}</span>
                <span>Desired Role: {user.DesiredRole}</span>
            </div>
        ))}
    </Wrapper>
    )
    }

const FormikUserForm =  withFormik({
    mapPropsToValues({
        name, 
        email, 
        password, 
        ToS, 
        DesiredRole
    }){
        return{
        name: name || "",
        email: email ||'',
        password: password || "",
        ToS: ToS || false,
        DesiredRole: DesiredRole || "Pick One"
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter a name."),
        email: Yup.string().email("Looks like you're missing something. Please enter a valid email address.").required("Please enter a email address."),
        password: Yup.string().min(8).required("Please enter a password."),
    }),
    handleSubmit(values, {setStatus}){
        axios.post('https://reqres.in/api/users', values)
        .then(res =>{
            console.log("these are the values", values)
            setStatus(res.data);
        })
        .catch(err => console.log(err))
    }

})(UserForm);

render(<FormikUserForm />, document.getElementById("root"))

export default FormikUserForm;