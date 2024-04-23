import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../stylehome.css'
import { useAuth } from '../context'
import { doSignOut } from '../firebase/auth'
const Header = () => {
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    const { userLoggedIn } = useAuth()

    const onLogout = async (e) => {
        e.preventDefault()
        await doSignOut();
    }
    return (
        <nav>
            <div class="navleft">
                <h2>Diet Recommendation 🍛</h2>
            </div>
            <div class="navright">
                <ul>
                    <li>
                        <Link to={'/home'}>  <h5>Home</h5></Link>
                    </li>
                    {userLoggedIn && <li>
                        <Link to={'/cookfood'}>  <h5>Create A Meal</h5></Link>
                    </li>}

                    {userLoggedIn && <li onClick={onLogout}>
                        <h5>Logout</h5>
                    </li>}
                </ul>
            </div>
        </nav>
    )
}

export default Header