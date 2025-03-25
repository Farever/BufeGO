import { useEffect, useState } from "react";

export default function Settings() {
    const [userId, setUserId] = useState();
    // Állapotkezelés a beállításokhoz
    // Állapotkezelés a beállításokhoz
    const [name, setName] = useState('John Doe');
    const [zipCode, setZipCode] = useState('12345');
    const [city, setCity] = useState('Example City');
    const [addressLine, setAddressLine] = useState('123 Main St');
    const [school, setSchool] = useState('Example University');

    // Állapotkezelés a hibaüzenetekhez
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const getSession = async () => {
            let resp = await fetch("http://localhost:8000/sessdata", {
                credentials: "include"
            });
            let data = await resp.json();

            if (resp.ok) {
                setUserId(data.valasz.user_id);
            }
        }

        getSession();
    }, [])

    // Segédfüggvény a validációhoz
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
            newErrors.school = 'Az iskola megadása kötelező.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // true, ha nincs hiba
    };

    // Eseménykezelő a mentéshez
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Itt hívhatod meg az API-t az adatok mentéséhez
            console.log('Adatok mentése:', {
                name,
                zipCode,
                city,
                addressLine,
                school,
            });
            // Példa API hívásra:
            // saveUserSettings({ name, zipCode, city, addressLine, school })
            //   .then(() => {
            //     alert('Beállítások sikeresen mentve!');
            //   })
            //   .catch((error) => {
            //     console.error('Hiba a mentés során:', error);
            //     alert('Hiba a mentés során. Kérjük, próbálja újra.');
            //   });
        }
    };

    const handleDeactivateAccount = () => {
        // Itt hívhatod meg az API-t a fiók inaktiválásához
        console.log('Fiók inaktiválása...');
        // Példa API hívásra:
        // deactivateAccount()
        //   .then(() => {
        //     alert('Fiók sikeresen inaktiválva!');
        //     // Perform any necessary actions after successful deactivation
        //   })
        //   .catch((error) => {
        //     console.error('Hiba a fiók inaktiválása során:', error);
        //     alert('Hiba a fiók inaktiválása során. Kérjük, próbálja újra.');
        //   });
    };

    return (
        <div className="container">
            <h1>Felhasználói beállítások</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Név:</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
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
                        value={zipCode}
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
                        value={city}
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
                        value={addressLine}
                        onChange={(e) => setAddressLine(e.target.value)}
                    />
                    {errors.addressLine && (
                        <div className="text-danger">{errors.addressLine}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="school" className="form-label">Iskola:</label>
                    <input
                        type="text"
                        id="school"
                        className="form-control"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                    />
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
        </div>
    );
};
