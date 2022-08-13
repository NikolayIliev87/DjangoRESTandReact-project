export const Profile = (props) => {
    return (
        <>
            <h2><span>User Name:</span><span>{props.full_name}</span></h2>
            <h2><span>User Phone:</span><span>{props.phone}</span></h2>
            <h2><span>UserID:</span><span>{props.user}</span></h2>
            <button onClick={() => props.onDeleteClick(props)}>Mark As Deleted</button>
        </>
    );
}