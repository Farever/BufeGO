import { useEffect, useState } from "react";
import axios from 'axios';

export default function Settings() {
    const [userId, setUserId] = useState(null);
    const [name, setName] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const [addressLine, setAddressLine] = useState('');
    const [school, setSchool] = useState('');
    const [schools, setSchools] = useState([]);

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            setIsLoading(true);
            try {
                let resp = await fetch("http://localhost:8000/sessdata", {
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
                setErrors(prevErrors => ({...prevErrors, session: error.message }));
            } finally {
                setIsLoading(false);
            }
        }

        const fetchUserData = async (userID) => {
            setIsLoading(true);
            try {
                let resp = await axios.get(`http://localhost:8000/felhasznaloadatok?userId=${userID}`);

                if (!resp) {
                    throw new Error(`HTTP error! status: ${resp.status}`);
                }

                let data = resp.data;

                let addressResp = await axios.get(`http://localhost:8000/cimadatok?Id=${data.valasz[0].address_id}`);
                console.log("User data:", data.valasz);
                // Módosítás: a tömb első elemét használjuk
                const userData = data.valasz[0];
                const addressData = addressResp.data.valasz[0];
                setName(userData?.name || '');
                setZipCode(addressData.zip_code);
                setCity(addressData.city);
                setAddressLine(addressData.address);
                setSchool(userData?.school_id || '');

            } catch (error) {
                setErrors(prevErrors => ({...prevErrors, userData: error.message }));
            } finally {
                setIsLoading(false);
            }
        }

        const fetchSchools = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("http://localhost:8000/iskolak");
                if (!response) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setSchools(response.data.valasz || []);
            } catch (error) {
                setErrors(prevErrors => ({...prevErrors, schools: error.message }));
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Adatok mentése:', {
                name,
                zipCode,
                city,
                addressLine,
                school,
            });
        }
        {/*TODO : adatok elmentése adatbázisba*/}
    };

    const handleDeactivateAccount = () => {
        console.log('Fiók inaktiválása...');
        {/*TODO : Fiók inaktiválása*/}
    };

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

                        <button type="submit" className="btn btn-primary">
                            Mentés
                        </button>
                    </form>

                    <button
                        onClick={handleDeactivateAccount}
                        className="btn btn-danger mt-3"
                    >
                        Fiók inaktiválása
                    </button>
                </>
            )}
        </div>
    );
}