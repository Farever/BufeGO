import { useNavigate } from 'react-router-dom'
import { AdminBufeContext, AuthContext } from '../Contexts';
import { useEffect, useContext } from 'react';

export default function Logout() {

    const navigate = useNavigate();
    const {setUser } = useContext(AuthContext);
    const {setBufe } = useContext(AdminBufeContext);

    setUser({});
    setBufe(null);

    useEffect(() => {
        sessionStorage.removeItem("userData");
        sessionStorage.removeItem("adminBufe");
        navigate("/");
    })

    return (
        <>
            Kijelentkezés...
        </>
    )
}