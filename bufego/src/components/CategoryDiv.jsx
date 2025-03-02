import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import UserProductCard from "./UserProductCard";

export default function CategoryDiv({catId, catNev, termekek})
{
    return(
        <Row className="border border-warning rounded my-2">
            <h1 style={{textDecoration: "underline"}}>{catNev}</h1>
            {termekek.filter((p) => p.category_id == catId).map((p) => {
                {console.log(p.category_id)}
                <UserProductCard 
                    nev={p.name} 
                    ar={p.price}
                    img={p.image}
                    key={p.id}
                    />
                })}
        </Row>
    )
}