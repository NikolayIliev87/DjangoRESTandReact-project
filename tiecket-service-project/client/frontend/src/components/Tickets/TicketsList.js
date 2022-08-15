import styles from './Tickets.module.css'

import { useState, useContext, useEffect } from "react";

import { Ticket } from "./Ticket";
import { Pagination } from './Pagination';
import { TicketDetails } from "./TicketDetails";
import { TicketCreate } from "./TicketCreate";

import * as ticketService from '../../services/tickets_services'

import { TicketsContext } from "../../contexts/TicketsContext";
import { Filter } from './Filter';


export const TicketList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        ticketService.getAllCategories()
            .then(categories => {setCategories(categories)})
      },[]);

    const {tickets, setTickets} = useContext(TicketsContext);

    // pagination client side
    const [currentPage, setCurrentPage] = useState(1);
    const [ticketsPerPage] = useState(7);
    
    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

    const paginateHandler = (number) => {
        setCurrentPage(number)
    }
    //   end pagination

    const [selectedTicket, setSelectedTicket] = useState(null);

    const onTicketDetailsHandler = (ticketID) => {
        ticketService.getTicket(ticketID)
            .then(ticket => {setSelectedTicket(ticket)})
        // ticketService.getAllCategories()
        //     .then(categories => {setCategories(categories)})
    };

    const [newTicket, setNewTicket] = useState(null);

    const newTicketHandler = (ev) => {
        ev.preventDefault()
        setNewTicket(true)
        // ticketService.getAllCategories()
        //     .then(categories => {setCategories(categories)})
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

    const onFilterHandler = (filterID) => {
        if (filterID!=='All') {
            ticketService.getAllTicketsFiltered(filterID)
                    .then(
                        tickets => setTickets(tickets)
                    )
        }
        else {
            ticketService.getAllTickets()
                    .then(
                        tickets => setTickets(tickets)
                    )
        }
    }

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
                <button className={styles.CreateNewTicket} onClick={newTicketHandler}> CREATE NEW TICKET</button>
                    <Filter categoryList={categories} onFilter={onFilterHandler} />
                <div className={styles.TicketsArray}>
                {tickets.length>0
                ?
                // tickets replaced with currentTickets
                currentTickets.map(ticket => 
                    <article className={ticket.status?styles.CompletedTicket:''} key={ticket.id}>
                        <Ticket {...ticket} onDetailsClick={onTicketDetailsHandler} />
                    </article>
                )
                :
                <p>No Tickets to show!</p>
                }
                </div>
                <Pagination 
                    ticketsPerPage={ticketsPerPage} 
                    totalTickets={tickets.length}
                    paginate={paginateHandler}
                />
            </div>
        </div>
    );
}