import styles from './Tickets.module.css'

import { useState, useContext, useEffect } from "react";
import { TicketsContext } from '../../contexts/TicketsContext';
import { Comment } from "../Comments/Comment";
import { CommentCreate } from "../Comments/CommentCreate";
import * as ticketService from '../../services/tickets_services'

export const TicketDetails = (props) => {
    const {tickets, setTickets} = useContext(TicketsContext)
    const [values, setValues] = useState({
        id: `${props.id}`,
        title: `${props.title}`,
        description: `${props.description}`,
        user: `${props.user}`,
        category: `${props.category}`,    
        ticket_id: `${props.ticket_id}`,
        status: `${props.status}`,
    })

    const changeHandler = (ev) => {
        setValues(state => ({
            ...state,
            [ev.target.id]: ev.target.value
        }))
    };

    const [switchStatus, setSwitchStatus] = useState(props.status)

    const onSwitchHandler = (ev) => {
        setValues (state => ({
            ...state,
            [ev.target.id]: !switchStatus
        }))
        setSwitchStatus(switchStatus => !switchStatus)
    }

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

        if(ev.nativeEvent.submitter.name === 'update') {
            props.onUpdateClick(ticketData)
        }
        else if(ev.nativeEvent.submitter.name === 'delete') {
            props.onDeleteClick(values.id)
        }
    }

    const [comments, setComments] = useState([])

    const [is_comments, setIsComments] = useState(false)

    const [newComment, setNewComment] = useState(null);

    useEffect(() => {
        const current_ticket = tickets.filter(x => x.id === props.id)
        const ticket_unpack = [...current_ticket]
        const ticket_comments = ticket_unpack[0]['comment_set']
        if (ticket_comments.length > 0) {
            setComments(ticket_comments)
        }
      },[tickets, comments.length, props.id]);

    const onCommentsShowClick = (ev) => {
        ev.preventDefault();
        if (comments) {
            setIsComments(true)
        }
    }

    const onCommentsHideClick = (ev) => {
        ev.preventDefault();
        setIsComments(false)
    }

    const onCreateHandler = (commentData) => {
        ticketService.createComments(commentData)
            .then(comment => 
                setComments(comment)
            )
            .then( () =>
                ticketService.getAllTickets()
                    .then(
                        tickets => setTickets(tickets),
                    )
            )
            .then(
                setNewComment(null),
                setIsComments(false),
            )
    };

    const newCommentHandler = (ev) => {
        ev.preventDefault()
        setNewComment(true)
    }

    return (
        <>
            <form className={styles.TicketDetails} onSubmit={onSubmitHandler}>
                <h1>Ticket Details</h1>
                <section>
                    <div>
                        <label htmlFor="title"  value={values.title} >Title:</label>
                        <input id='title' type="text"  onChange={changeHandler} defaultValue={props.title}/>
                    </div>
                    <div>
                        <label htmlFor="ticket_id" value={values.ticket_id} >Ticket Number:</label>
                        <input id='ticket_id' type="text"  readOnly defaultValue={props.ticket_id}/>
                    </div> 
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
                        <label htmlFor="description"  value={values.description} >Decription:</label>
                        <input id='description' type="text" onChange={changeHandler} defaultValue={props.description}/>
                    </div> 
                    <div>
                        <label htmlFor="status"  value={values.status} >Completion:</label>
                        <input id='status' type="checkbox" onChange={onSwitchHandler} checked={switchStatus}/>
                    </div>
                    <div>
                        <button type="submit" name='update'>Save</button>
                        <button type='submit' name='delete'>Delete</button>
                        <button onClick={props.onCloseClick}>Close</button>
                    </div>
                </section>
                    
                {is_comments 
                ?
                <div className={styles.TicketCommnets}>
                    <h2>Comments:</h2> 
                    <>
                        {comments.map(comment => 
                            <article key={comment.id}>
                                <Comment {...comment} />
                            </article>
                        )}
                    </>
                    <button onClick={onCommentsHideClick}>Hide Comments</button>
                </div>
                :
                <> 
                    {comments.length>0 
                    ?   <div className={styles.TicketCommnetsOverview}>
                            <h2>There are {comments.length} comment/s to be shown!</h2> 
                            <div>
                                <button onClick={onCommentsShowClick}>Show Comments</button>
                                <button onClick={newCommentHandler} >Add Comment</button>
                            </div>
                        </div>
                    :
                        <div className={styles.TicketCommnetsOverview}>
                            <h2>"No Comments to be shown"</h2> 
                            <button onClick={newCommentHandler} >Add Comment</button>
                        </div>
                    }
                </> 
                }
            </form>
            {newComment && <CommentCreate currentTicketID={props.id} onCreateClick={onCreateHandler} />}
        </>
    );
}