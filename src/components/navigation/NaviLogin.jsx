
import React from 'react'; 
import ButtonLogin from './ButtonLogin.jsx';
import ButtonLogined from './ButtonLogined.jsx';
import ButtonLogout from './ButtonLogout.jsx';
import ButtonOther from './ButtonOther.jsx';



export default ({isLogin, onLogin, onLogout, currentUser}) => {

    return (
        <ul className="nav navbar-nav navbar-right">
            {
                isLogin ? <ButtonLogined currentUser={currentUser} /> : null
            }

            {

                isLogin
                    ? <ButtonLogout onLogout={onLogout.bind(null)} />
                    : <ButtonLogin onLogin={onLogin.bind(null)} />
            }
            <ButtonOther />
        </ul>
    );

} 