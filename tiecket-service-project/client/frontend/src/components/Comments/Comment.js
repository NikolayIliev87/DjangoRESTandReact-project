export const Comment = (props) => {
    return (
        <>
            <h2>{props.user_email}:</h2>
            <h2>{props.description}</h2>
        </>
    );
}