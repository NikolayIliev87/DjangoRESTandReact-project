import styles from './Tickets.module.css'

import { validator } from '../../services/validator';

import { useState } from "react";

export const TicketCreate = (props) => {
    const [errors, setErrors] = useState({});
    const user = JSON.parse(localStorage.getItem('auth'))['id']
    // const [categoryDefauls, setcategoryDefauls] = useState(props.allCategories[0].id)
    const [values, setValues] = useState({
        title: '',
        description: '',
        user: user,
        category: `${props.allCategories[0].id}`,
        ticket_id: '',    
    })

    const changeHandler = (ev) => {
        setValues(state => ({
            ...state,
            [ev.target.id]: ev.target.value
        }))
    };

    const onCategoryChangeHandler = (ev) => {
        setValues (state => ({
            ...state,
            [ev.target.id]: ev.target.value
        }))
        // setcategoryDefauls(categoryDefauls => ev.target.value)
    }

    const onSubmitHandler = (ev) => {
        ev.preventDefault();

        const {...ticketData} = values;
        props.onCreateClick(ticketData)
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
        <form className={styles.TicketNew} onSubmit={onSubmitHandler}>
            <h1>Create New Ticket</h1>
            <section>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input 
                        id='title' 
                        type="text"  
                        onChange={changeHandler} 
                        value={values.title}
                        onBlur={validateInputs} 
                    />
                    {errors.title && <p>{errors.title}</p>}
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <select id='category' value={values.category} onChange={onCategoryChangeHandler}>
                        {props.allCategories.map(category => 
                            <option value={category.id} key={category.id}>
                                {category.name}
                            </option>
                        )}
                    </select>
                </div> 
                <div>
                    <label htmlFor="description">Decription:</label>
                    <input 
                        id='description' 
                        type="text" 
                        onChange={changeHandler} 
                        value={values.description}
                        onBlur={validateInputs} 
                    />
                    {errors.description && <p>{errors.description}</p>}
                </div> 
                <div>
                    <button type="submit" >Create</button>
                    <button onClick={props.onCloseClick}>Close</button>
                </div>
            </section>
        </form>
    );
}