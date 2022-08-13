import styles from './Tickets.module.css'

import { useState, useContext } from "react";

import { Ticket } from "./Ticket";
import { TicketDetails } from "./TicketDetails";
import { TicketCreate } from "./TicketCreate";

import * as ticketService from '../../services/tickets_services'

import { TicketsContext } from "../../contexts/TicketsContext";


export const TicketList = () => {
    const [categories, setCategories] = useState([]);

    const {tickets, setTickets} = useContext(TicketsContext)

    const [selectedTicket, setSelectedTicket] = useState(null);

    const onTicketDetailsHandler = (ticketID) => {
        ticketService.getTicket(ticketID)
            .then(ticket => {setSelectedTicket(ticket)})
        ticketService.getAllCategories()
            .then(categories => {setCategories(categories)})
    };

    const [newTicket, setNewTicket] = useState(null);

    const newTicketHandler = (ev) => {
        ev.preventDefault()
        setNewTicket(true)
        ticketService.getAllCategories()
            .then(categories => {setCategories(categories)})
    }

    const onCloseDetailsHandler = () => {
        setNewTicket(null)
        setSelectedTicket(null)
    };
    
    const onUpdateHandler = (ticketData) => {
        ticketService.updateTicket(ticketData)
            .then( () =>
                ticketService.getAllTickets()
                    .then(
                        tickets => setTickets(tickets),
                        ),
                onCloseDetailsHandler()
            )
    };

    const onDeleteHandler = (ticketID) => {
        ticketService.deleteTicket(ticketID)
            .then( () =>
                ticketService.getAllTickets()
                    .then(
                        tickets => setTickets(tickets),
                        ),
                onCloseDetailsHandler()
            )
    };

    const onCreateHandler = (ticketData) => {
        ticketService.createTicket(ticketData)
            .then( () =>
                ticketService.getAllTickets()
                    .then(
                        tickets => setTickets(tickets),
                        )
            )
            .then(
                onCloseDetailsHandler()
            )
    };

    return (
        <div>
            <>
                {selectedTicket && <TicketDetails {...selectedTicket} 
                                                    onUpdateClick={onUpdateHandler} 
                                                    onCloseClick={onCloseDetailsHandler} 
                                                    onDeleteClick={onDeleteHandler}
                                                    allCategories = {categories}
                />}
                {newTicket && <TicketCreate 
                    onCreateClick={onCreateHandler} 
                    onCloseClick={onCloseDetailsHandler}
                    allCategories = {categories} 
                />}
            </>
            <div className={styles.TicketsList}>
                <h1>Your Tickets List</h1>
                <button onClick={newTicketHandler}> CREATE NEW TICKET</button>
                {tickets.map(ticket => 
                    <article className={ticket.status?styles.CompletedTicket:''} key={ticket.id}>
                        <Ticket {...ticket} onDetailsClick={onTicketDetailsHandler} />
                    </article>
                )}
            </div>
        </div>
    );
}