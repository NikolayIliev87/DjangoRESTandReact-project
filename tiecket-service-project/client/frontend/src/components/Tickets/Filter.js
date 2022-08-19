import styles from './Tickets.module.css'

import { useState } from 'react'

export const Filter = (props) => {
    const [currentFilter, setCurrentFilter] = useState('All')

    const onFilterSelectHandler = (filterID) => {
        props.onFilter(filterID)
        setCurrentFilter(filterID)
    }

    return (
        <>
        <div className={styles.Filters}>
        <h3>Categories:</h3>
            {props.categoryList.map(category => {
            return (
                <button className={currentFilter===category.id?"active":"inactive"} key={category.id} onClick={() => onFilterSelectHandler(category.id)} >
                {category.name}
                
                </button>
            );
            })}
            <button 
                className={currentFilter==='All'?"active":"inactive"}
                onClick={() => onFilterSelectHandler('All')}
            >
            All
            </button>
       </div>
        </>
    );
}