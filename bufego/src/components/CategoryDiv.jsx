import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import UserProductCard from "./UserProductCard";

export default function CategoryDiv({ catId, catNev, termekek, buttonActions }) {
    return (
        <div className="border border-warning rounded p-3 my-4 bg-white shadow-sm" id={catNev}>
            <h2 className="text-center my-3 fw-bold" style={{ color: "#e69138", textDecoration: "underline" }}>{catNev}</h2>
            <div className="d-flex flex-wrap justify-content-center gap-4">
                {termekek.filter((p) => p.category_id == catId && p.is_avaliable == "1").map((p) => {
                    return (
                        <UserProductCard
                            nev={p.name}
                            ar={p.price}
                            img={p.image}
                            key={p.id}
                            isAvaliable={p.is_avaliable}
                            action={() => { buttonActions(p.id) }}
                        />
                    )
                })}
            </div>
        </div >
    )
}