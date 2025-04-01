import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import UserProductCard from "./UserProductCard";

export default function CategoryDiv({catId, catNev, termekek, buttonActions})
{
    return(
        <Row className="border border-warning rounded my-2" id={catNev}>
            <h1 style={{textDecoration: "underline"}}>{catNev}</h1>
            {termekek.filter((p) => p.category_id == catId && p.is_avaliable == "1").map((p) => {
                return(
                    <UserProductCard 
                        nev={p.name} 
                        ar={p.price}
                        img={p.image}
                        key={p.id}
                        isAvaliable={p.is_avaliable}
                        action={()=>{buttonActions(p.id)}}
                    />
                )
                })}
        </Row>
    )
}