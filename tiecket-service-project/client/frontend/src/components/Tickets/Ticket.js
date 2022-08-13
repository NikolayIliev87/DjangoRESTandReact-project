export const Ticket = (props) => {

    return (
        <>
            <h2>{props.title}</h2>
            <p>{props.status ? 'Comleted' : 'Incompleted'}</p>
            <button onClick={() => props.onDetailsClick(props.id)}>Details</button>
        </>
    );
}