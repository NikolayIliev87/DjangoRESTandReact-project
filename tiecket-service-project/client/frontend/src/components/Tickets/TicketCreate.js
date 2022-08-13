import styles from './Tickets.module.css'

import { useState } from "react";

export const TicketCreate = (props) => {
    const user = JSON.parse(localStorage.getItem('auth'))['id']
    const [values, setValues] = useState({
        title: '',
        description: '',
        user: user,
        category: '',
        ticket_id: '',    
    })

    const changeHandler = (ev) => {
        setValues(state => ({
            ...state,
            [ev.target.id]: ev.target.value
        }))
    };

    const [categoryDefauls, setcategoryDefauls] = useState(props.category)
    const onCategoryChangeHandler = (ev) => {
        setValues (state => ({
            ...state,
            [ev.target.id]: ev.target.value
        }))
        setcategoryDefauls(categoryDefauls => ev.target.value)
    }

    const onSubmitHandler = (ev) => {
        ev.preventDefault();

        const {...ticketData} = values;
        props.onCreateClick(ticketData)
    }

    return (
        <form className={styles.TicketNew} onSubmit={onSubmitHandler}>
            <h1>Create New Ticket</h1>
            <section>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input id='title' type="text"  onChange={changeHandler} value={values.title}/>
                </div>
                {/* <div>
                    <label htmlFor="category">Category:</label>
                    <input id='category' type="text" readOnly value={values.category}/>
                </div> */}
                <div>
                    <label htmlFor="category">Category:</label>
                    <select id='category' value={categoryDefauls} onChange={onCategoryChangeHandler}>
                        {props.allCategories.map(category => 
                            <option value={category.id} key={category.id}>
                                {category.name}
                            </option>
                        )}
                    </select>
                </div> 
                <div>
                    <label htmlFor="description">Decription:</label>
                    <input id='description' type="text" onChange={changeHandler} value={values.description}/>
                </div> 
                <div>
                    <button type="submit" >Create</button>
                    <button onClick={props.onCloseClick}>Close</button>
                </div>
            </section>
        </form>
    );
}