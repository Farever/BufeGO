import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Contexts';


export default function Settings() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [addressID, setAddressId] = useState(null);
    const [name, setName] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const [addressLine, setAddressLine] = useState('');
    const [school, setSchool] = useState('');
    const [schools, setSchools] = useState([]);

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [deactivationSuccess, setDeactivationSuccess] = useState(false);
    const { userData, setUser } = useContext(AuthContext);

    const Kijelentkezes = async () => {
        try {
            let resp = await fetch('http://localhost:8000//kijelentkezes', { credentials: "include" });
            if (resp.ok) {
                sessionStorage.removeItem("userData");
                sessionStorage.removeItem("adminBufe");
                setUser({});
                setBufe(null);
                window.location.href = "/#/";
            }
        } catch (error) {
            console.error("Hiba az iskolák lekérésekor:", error);
        }
    }

    useEffect(() => {
        const getSession = async () => {
            setIsLoading(true);
            try {
                let resp = await fetch("http://localhost:8000//sessdata", {
                    credentials: "include"
                });
                if (!resp.ok) {
                    throw new Error(`HTTP error! status: ${resp.status}`);
                }
                let data = await resp.json();

                if (data.valasz && data.valasz.user_id) {
                    setUserId(data.valasz.user_id);
                } else {
                    throw new Error("Sikertelen munkamenet adat lekérés");
                }
            } catch (error) {
                setErrors(prevErrors => ({ ...prevErrors, session: error.message }));
            } finally {
                setIsLoading(false);
            }
        }

        const fetchUserData = async (userID) => {
            setIsLoading(true);
            try {
                let resp = await axios.get(`http://localhost:8000//felhasznaloadatok?userId=${userID}`);

                if (!resp) {
                    throw new Error(`HTTP error! status: ${resp.status}`);
                }

                let data = resp.data;

                setAddressId(data.valasz[0].address_id);
                let addressResp = await axios.get(`http://localhost:8000//cimadatok?Id=${data.valasz[0].address_id}`);
                const userData = data.valasz[0];
                const addressData = addressResp.data.valasz[0];
                setName(userData?.name || '');
                setZipCode(addressData.zip_code);
                setCity(addressData.city);
                setAddressLine(addressData.address);
                setSchool(userData?.school_id || '');

            } catch (error) {
                setErrors(prevErrors => ({ ...prevErrors, userData: error.message }));
            } finally {
                setIsLoading(false);
            }
        }

        const fetchSchools = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("http://localhost:8000//iskolak");
                if (!response) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setSchools(response.data.valasz || []);
            } catch (error) {
                setErrors(prevErrors => ({ ...prevErrors, schools: error.message }));
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchUserData(userId);
        } else {
            console.log('userId még nincs beállítva!');
        }

        getSession();
        fetchSchools();

    }, [userId]);

    const validateForm = () => {
        let newErrors = {};

        if (!name) {
            newErrors.name = 'A név megadása kötelező.';
        }

        if (!zipCode) {
            newErrors.zipCode = 'Az irányítószám megadása kötelező.';
        }

        if (!city) {
            newErrors.city = 'A város megadása kötelező.';
        }

        if (!addressLine) {
            newErrors.addressLine = 'A cím megadása kötelező.';
        }

        if (!school) {
            newErrors.school = 'Az iskola kiválasztása kötelező.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage(''); // Töröljük a korábbi sikeres üzenetet
        setErrors({}); // Töröljük a korábbi hibákat

        if (validateForm()) {
            setIsLoading(true); // Betöltésjelző bekapcsolása

            try {
                // Cím módosítása
                const addressRes = await axios.post('http://localhost:8000//cimmodositas', {
                    "Id": addressID,
                    "zip": zipCode,
                    "city": city,
                    "address": addressLine
                });

                // Felhasználói adatok módosítása
                const userDataRes = await axios.post('http://localhost:8000//felhasznaloadatmodositas', {
                    "userId": userId,
                    "name": name,
                    "school": school
                });

                // Mindkét kérés sikeres volt?
                if (addressRes.status === 200 && userDataRes.status === 200) {
                    setSuccessMessage('Adatok sikeresen mentve!'); // Sikeres üzenet beállítása
                    setUser({
                        "user_id" : userData.user_id,
                        "is_admin" : userData.is_admin,
                        "school_id" : school
                    })
                } else {
                    throw new Error('Hiba történt a mentés során.');
                }
            } catch (error) {
                setErrors(prevErrors => ({ ...prevErrors, submit: error.message }));
            } finally {
                setIsLoading(false);
                setTimeout(
                    () => {
                        navigate(-1);
                    },500
                )

            }
        }
    };

    const handleDeactivateAccount = async () => {
        setIsLoading(true);
        setErrors({});
        try {
            let resp = await axios.get(`http://localhost:8000//felhasznaloinaktivalas?userId=${userId}`);

            if (resp.status === 200) {
                setDeactivationSuccess(true);
                Kijelentkezes();
            } else {
                throw new Error("Hiba történt a fiók inaktiválása során.");
            }
        } catch (error) {
            setErrors(prevErrors => ({ ...prevErrors, deactivation: error.message }));
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancle = () => {
        navigate(-1);
    }

    return (
        <div className="container">
            <h1>Felhasználói beállítások</h1>
            {isLoading ? (
                <p>Betöltés...</p>
            ) : (
                <>
                    {errors && Object.keys(errors).length > 0 && (
                        <div className="alert alert-danger">
                            {Object.entries(errors).map(([key, value]) => (
                                <p key={key}>{value}</p>
                            ))}
                        </div>
                    )}

                    {successMessage && (
                        <div className="alert alert-success">
                            {successMessage}
                        </div>
                    )}

                    {deactivationSuccess && (
                        <div className="alert alert-info">
                            A fiók sikeresen inaktiválva lett.
                        </div>
                    )}


                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Név:</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={name || ''}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <div className="text-danger">{errors.name}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="zipCode" className="form-label">Irányítószám:</label>
                            <input
                                type="text"
                                id="zipCode"
                                className="form-control"
                                value={zipCode || ''}
                                onChange={(e) => setZipCode(e.target.value)}
                            />
                            {errors.zipCode && <div className="text-danger">{errors.zipCode}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">Város:</label>
                            <input
                                type="text"
                                id="city"
                                className="form-control"
                                value={city || ''}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            {errors.city && <div className="text-danger">{errors.city}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="addressLine" className="form-label">Cím:</label>
                            <input
                                type="text"
                                id="addressLine"
                                className="form-control"
                                value={addressLine || ''}
                                onChange={(e) => setAddressLine(e.target.value)}
                            />
                            {errors.addressLine && (
                                <div className="text-danger">{errors.addressLine}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="school" className="form-label">Iskola:</label>
                            <select
                                id="school"
                                className="form-select"
                                value={school || ''}
                                onChange={(e) => setSchool(e.target.value)}
                            >
                                <option value="">Válassz iskolát...</option>
                                {schools.map((schoolOption) => (
                                    <option key={schoolOption.id} value={schoolOption.id}>
                                        {schoolOption.name}
                                    </option>
                                ))}
                            </select>
                            {errors.school && <div className="text-danger">{errors.school}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary mx-3">
                            Mentés
                        </button>

                        <button type="button" className="btn btn-warning mx-3" onClick={handleCancle}>
                            Mégse
                        </button>
                    </form>

                    <button
                        onClick={handleDeactivateAccount}
                        className="btn btn-danger m-3"
                    >
                        Fiók inaktiválása
                    </button>
                </>
            )}
        </div>
    );
}