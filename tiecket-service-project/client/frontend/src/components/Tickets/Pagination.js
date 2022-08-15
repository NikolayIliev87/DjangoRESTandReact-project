import { useState } from 'react';
import styles from './Tickets.module.css'

export const Pagination = (props) => {

    const pageNumbers = [];
    const [currentPage, setCurrentPage] = useState(1)

    const onPageClickHandler = (number) => {
        props.paginate(number)
        setCurrentPage(number)
    }

    for (let i = 1; i <= Math.ceil(props.totalTickets / props.ticketsPerPage ); i++) {
        pageNumbers.push(i)
    }

    return (
        <div>
            <ul className={styles.TicketsPagination}>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button type="button" onClick={() => onPageClickHandler(number)}>{number}</button>
                    </li>
                ))}
            </ul>
            <p>Current Page:{currentPage} of {pageNumbers.length}</p>
        </div>
    );
}