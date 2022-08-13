import styles from './Navigation.module.css'

import { useContext } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from "../../contexts/AuthContext";

export const Navigation = () => {
    const {auth} = useContext(AuthContext)


    return (
        <nav className={styles.Navigation}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
                {auth.id
                    ?
                    <ul>
                        <li><Link to="/profileslist">Profiles List</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/ticketlist">Your Tickets</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>

                    :
                    <ul>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                }
        </nav>
    )
}