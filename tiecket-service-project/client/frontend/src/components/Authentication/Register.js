import styles from './Authentication.module.css'

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from '../../services/auth_service'

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [photourl, setPhotourl] = useState('');
    const navigate = useNavigate();

    const registerHandler = (ev) => {
        ev.preventDefault()
        const profile = {
            "first_name": firstname,
            "last_name": lastname,
            "phone": phone,
            "photo_url": photourl,
        }
        const registerData = {
          'email': username,
          "password": password,
          profile,
        }
        
        authService.register(registerData)
          .then(result => {
            // userLogin(result);
            navigate('/');
          })
          .catch(() => {navigate('/register');
        })
    };

    const usernameChangeHandler = (ev) => {
        setUsername(ev.target.value)
    };

    const passwordChangeHandler = (ev) => {
        setPassword(ev.target.value)
    };

    const firstNameChangeHandler = (ev) => {
        setFirstname(ev.target.value)
    };

    const lastNameChangeHandler = (ev) => {
        setLastname(ev.target.value)
    };

    const phoneChangeHandler = (ev) => {
        setPhone(ev.target.value)
    };

    const photoUrlChangeHandler = (ev) => {
        setPhotourl(ev.target.value)
    };

    return (
        <section className={styles.Authentication}>
          <form onSubmit={registerHandler}>
          <h2>Register Form</h2>
          <div>
            <label htmlFor="username" >Email:</label>
            <input id='username' type="text" onChange={usernameChangeHandler} value={username} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input id='password' type="text" onChange={passwordChangeHandler} value={password} />
          </div>
          <div>
            <label htmlFor="firstname">First Name:</label>
            <input id='firstname' type="text" onChange={firstNameChangeHandler} value={firstname} />
          </div>
          <div>
            <label htmlFor="lastname">Last Name:</label>
            <input id='lastname' type="text" onChange={lastNameChangeHandler} value={lastname} />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input id='phone' type="text" onChange={phoneChangeHandler} value={phone} />
          </div>
          <div>
            <label htmlFor="photourl">Photo URL:</label>
            <input id='photourl' type="text" onChange={photoUrlChangeHandler} value={photourl} />
          </div>
          <button type="submit" >Register</button>
        </form>
      </section>
    )
}