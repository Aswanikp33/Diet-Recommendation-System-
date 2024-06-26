import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/'
import { doCreateUserWithEmailAndPassword } from '../firebase/auth'
import './login.css'
import diet from '../assets/img.svg'
const Register = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password)
        }
    }

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <div class="parent">

                <div class="child">

                    <div class="left">
                        <img src={diet} alt="" srcset="" />
                    </div>
                    <div class="right">
                        <form onSubmit={onSubmit}>
                            <input type="text" class="upload" placeholder="Username" required onChange={(e) => { setName(e.target.value) }} />
                            <input type="text" class="upload" placeholder="Email" required onChange={(e) => { setEmail(e.target.value) }} />
                            <input type="password" class="upload" placeholder="password" required onChange={(e) => { setPassword(e.target.value) }} />
                            <input type="password" class="upload" placeholder="confirm password" required />
                            <button class="upload" type="submit">
                                Signup 🔓
                            </button>
                            <h4>Already a customer? <a href="Login.html" class="signup">Log in</a></h4>

                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Register