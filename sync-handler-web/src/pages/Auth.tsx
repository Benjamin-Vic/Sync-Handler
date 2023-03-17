import './Auth.css';

const Auth = () => {
    return (
        <div className='Auth'>
            <div className='card'>
                <div className='card-header'>
                    <h3>Sign In</h3>
                </div>
                <div className='card-body'>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' name='email' id='email' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' name='password' id='password' />
                        </div>
                        <div className='form-group'>
                            <input type='submit' value='Sign In' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Auth;
