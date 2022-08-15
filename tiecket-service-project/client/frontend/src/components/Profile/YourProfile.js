import styles from './YourProfile.module.css'

import { validator } from '../../services/validator';

import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ProfileContext } from "../../contexts/ProfileContext";
import * as profileService from '../../services/profile_service';
import { useNavigate } from 'react-router-dom'

export const YourProfile = () => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);
    const {yourprofile, setYourProfile} = useContext(ProfileContext);


    const [editableProfile, setEditableProfile] = useState(true)

    const onEditHandler = () => {
        setEditableProfile(false)
    }

    const [values, setValues] = useState({
        first_name: `${yourprofile.first_name}`,
        last_name: `${yourprofile.last_name}`,
        phone: `${yourprofile.phone}`,
        photo_url: `${yourprofile.photo_url}`,
        user: `${auth.id}`,
    })

    const changeHandler = (ev) => {
        setValues(state => ({
            ...state,
            [ev.target.id]: ev.target.value
        }))
    };

    const onSubmitHandler = (ev) => {
        ev.preventDefault();

        const {...profileData} = values;
        profileService.updateProfile(profileData)
        setYourProfile(profileData)
        setEditableProfile(false)
        navigate('/')
    }

    const validateInputs = (ev) => {
        let validated = validator(ev)
        if (validated) {
          setErrors(state => ({
            ...state,
            [ev.target.id]: validated,
          }))
        }
        else {
          setErrors(state => ({
            ...state,
            [ev.target.id]: validated,
          }))
        }
      } 

    return (
        <>
            {editableProfile
                ?
                <div className={styles.YourProfileView}>
                    <h1>Your Profile</h1>
                    <article>
                        <div>
                            <img src={yourprofile.photo_url} alt='profilePicture'/>
                            <p></p>
                        </div>
                        <div>
                            <h2><p>First Name:</p><span>{yourprofile.first_name}</span></h2>
                            <h2><p>Last Name:</p><span>{yourprofile.last_name}</span></h2>
                            <h2><p>Phone:</p><span>{yourprofile.phone}</span></h2>
                            <h2><p>Email:</p><span>{auth.email}</span></h2>
                            <button onClick={onEditHandler}>Edit</button>
                        </div>
                    </article>
                </div>
                :
                <section className={styles.ProfileEditForm}>
                    <form onSubmit={onSubmitHandler}>
                        <h2>Profile Update Form</h2>
                        <div>
                            <label htmlFor="first_name"  value={values.first_name} >First Name:</label>
                            <input 
                                id='first_name' 
                                type="text"  
                                onChange={changeHandler} 
                                defaultValue={yourprofile.first_name}
                                onBlur={validateInputs}
                            />
                            {errors.first_name && <p>{errors.first_name}</p>}
                        </div>
                        <div>
                            <label htmlFor="last_name"  value={values.last_name} >Last Name:</label>
                            <input 
                                id='last_name' 
                                type="text"  
                                onChange={changeHandler} 
                                defaultValue={yourprofile.last_name}
                                onBlur={validateInputs}
                            />
                            {errors.last_name && <p>{errors.last_name}</p>}
                        </div>
                        <div>
                            <label htmlFor="phone"  value={values.phone} >Phone:</label>
                            <input 
                                id='phone' 
                                type="text"  
                                onChange={changeHandler} 
                                defaultValue={yourprofile.phone}
                                onBlur={validateInputs}
                            />
                            {errors.phone && <p>{errors.phone}</p>}
                        </div>
                        <div>
                            <label htmlFor="photo_url"  value={values.photo_url} >Photo URL:</label>
                            <input 
                                id='photo_url' 
                                type="text"  
                                onChange={changeHandler} 
                                defaultValue={yourprofile.photo_url}
                                onBlur={validateInputs}
                            />
                            {errors.photo_url && <p>{errors.photo_url}</p>}
                        </div>
                        <div>
                            <label htmlFor="user" value={values.user} >User ID:</label>
                            <input id='user' type="text"  readOnly defaultValue={auth.id}/>
                        </div> 
                        <div>
                            <button type="submit" name='update'>Save Changes</button>
                        </div>
                    </form>
                </section>
            }
        </>
    );
}