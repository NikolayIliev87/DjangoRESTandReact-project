import styles from '.././Tickets/Tickets.module.css'

import { useState } from "react";

export const CommentCreate = (props) => {
    const user = JSON.parse(localStorage.getItem('auth'))['id']
    const [values, setValues] = useState({
        description: '',
        user: user,
        ticket_id: props.currentTicketID,    
    })

    const changeHandler = (ev) => {
        setValues(state => ({
            ...state,
            [ev.target.id]: ev.target.value
        }))
    };

    const onSubmitHandler = (ev) => {
        ev.preventDefault();

        const {...commentData} = values;
        props.onCreateClick(commentData)
    }

    return (
        <form className={styles.TicketCommnetCreate} onSubmit={onSubmitHandler}>
            <h2>Add Comment</h2>
            <div>
                <label htmlFor="description">Decription:</label>
                <input id='description' type="text" onChange={changeHandler} value={values.description}/>
            </div>
            <div>
                <button type="submit" >Create</button>
            </div>
        </form>
    );
}