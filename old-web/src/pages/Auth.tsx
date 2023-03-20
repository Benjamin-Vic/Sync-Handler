import { useState } from 'react';
import './Auth.css';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e: any) => {
        e.preventDefault();
        console.log('send login request');
    };

    return (
        <div className='Auth'>
            <div className='card'>
                <span className='title'>Sync-Handler</span>
                <form onSubmit={login}>
                    <input type='email' name='email' placeholder='Email' required={true} value={email} onChange={e => setEmail(e.target.value)} />
                    <input type='password' name='password' placeholder='Password' required={true} value={password} onChange={e => setPassword(e.target.value)} />
                    <input className='submit' type='submit' value='Sign In' />
                </form>
            </div>
        </div>
    );
};

export default Auth;
