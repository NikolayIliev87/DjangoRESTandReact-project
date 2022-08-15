import styles from './Tickets.module.css'

export const Filter = (props) => {

    const onFilterSelectHandler = (filterID) => {
        props.onFilter(filterID)
    }

    return (
        <>
        <div className={styles.Filters}>
        <h3>Categories:</h3>
            {props.categoryList.map(category => {
            return (
                <button key={category.id} onClick={() => onFilterSelectHandler(category.id)} >
                {category.name}
                
                </button>
            );
            })}
            <button
            onClick={() => onFilterSelectHandler('All')}
            >
            All
            </button>
       </div>
        </>
    );
}