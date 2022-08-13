import * as request from './request_compilator'

const authserver = 'http://127.0.0.1:8000/api/auth'

export const login = async (logInData) => {
    const result = request.post(`${authserver}/login/`, logInData)

    return result
}

export const register = async (registerData) => {
    const result = request.post(`${authserver}/register/`, registerData)

    return result
}

export const logout = async() => {

    const result = request.get(`${authserver}/logout/`)

    return result
}

// export const getProfiles = async() => {

//     const result = request.get(`${authserver}/profile/`)
//     console.log(result)

//     return result
// }

// export const getProfileDetails = async(profileID) => {

//     const result = request.get(`${authserver}/profile/${profileID}`)

//     return result
// }