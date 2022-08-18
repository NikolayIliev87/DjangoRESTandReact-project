import { useState } from 'react';
import styles from './ProfileList.module.css'

export const PaginationProfiles = (props) => {

    const pageNumbers = [];
    const [currentPage, setCurrentPage] = useState(1)

    const onPageClickHandler = (e,number) => {
        props.paginate(number)
        setCurrentPage(number)
    }

    for (let i = 1; i <= Math.ceil(props.totalProfiles / props.profilesPerPage ); i++) {
        pageNumbers.push(i)
    }

    return (
        <div>
            <ul className={styles.ProfilesPagination}>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button type="button" onClick={(e) => onPageClickHandler(e, number)}>{number}</button>
                    </li>
                ))}
            </ul>
            <p>Current Page:{currentPage} of {pageNumbers.length===0?"1":pageNumbers.length}</p>
        </div>
    );
}