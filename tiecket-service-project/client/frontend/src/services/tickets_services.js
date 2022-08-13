import * as request from './request_compilator'

const localserver = 'http://127.0.0.1:8000/api/tickets'

// export const getUser = () => {
//     const isUser = JSON.parse(sessionStorage.getItem('userData'))
//     // const isUser = true
//     return isUser
// }

export const getAllTickets = () => request.get(localserver)
    // const token_id = JSON.parse(sessionStorage.getItem('userData'))['token']
    // const response = await fetch(localserver, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Token ${token_id}`,
    //     },
    // })
    // const result = await response.json();

    // return result;


export const getTicket = (ticketID) => request.get(`${localserver}/${ticketID}`)
    // const token_id = JSON.parse(localStorage.getItem('auth'))['token']
    // request.get(`${localserver}/${ticketID}`)
    // const response = await fetch(`${localserver}/${ticketID}`, {
    //     headers: {
    //         'Authorization': `Token ${token_id}`,
    //     },
    // })
    // const result = await response.json();

    // return result;

export const updateTicket = (ticketData) => request.put(`${localserver}/${ticketData['id']}/`,ticketData)
    // const token_id = JSON.parse(sessionStorage.getItem('userData'))['token']
    // const response = await fetch(`${localserver}/${ticketData['id']}/`, {
    //     method: 'PUT',
    //     headers: {
    //         "Content-Type": "application/json",
    //         'Authorization': `Token ${token_id}`,
    //     },
    //     body: JSON.stringify(ticketData),
    // });

    // const result = await response.json();

    // return result;


export const deleteTicket = (ticketID) => request.del(`${localserver}/${ticketID}/`)
//     const token_id = JSON.parse(sessionStorage.getItem('userData'))['token']
//     fetch(`${localserver}/${ticketID}/`, {
//         method: 'DELETE',
//         headers: {
//             "Content-Type": "application/json",
//             'Authorization': `Token ${token_id}`,
//         },
//     });
// } 

export const createTicket = (ticketData) => request.post(`${localserver}/`,ticketData)
//     const token_id = JSON.parse(sessionStorage.getItem('userData'))['token']
//     const response = await fetch(`${localserver}/`, {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//             'Authorization': `Token ${token_id}` ,
//         },
//         body: JSON.stringify(ticketData),
//     });

//     const result = await response.json();

//     return result;
// }

// export const login = async (logInData) => {
//     const response = await fetch(`${authserver}/login/`, {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(logInData),
//     })

//     const result = await response.json();

//     const userData = {
//         email: result.email,
//         id: result.id,
//         token: result.token
//     };
//     sessionStorage.setItem('userData', JSON.stringify(userData))

//     return result

// }

// export const logout = async() => {

//     const response = await fetch(`${authserver}/logout/`, {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//             'Authorization': `Token ${1}` 
//         },
//     })

//     sessionStorage.removeItem('userData');
//     return response
// }

export const getAllComments = () => request.get(`${localserver}/comments/`)

export const createComments = (commentData) => request.post(`${localserver}/comments/`,commentData)

export const getAllCategories = () => request.get(`${localserver}/categories/`)