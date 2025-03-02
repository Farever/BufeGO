import { Card } from "react-bootstrap";

export default function UserProductCard({nev, img, ar})
{

    return (
        <>
                <ul>
                    <li>{nev}</li>
                    <li>{img}</li>
                    <li>{ar}</li>
                </ul>
        </>
    )
}