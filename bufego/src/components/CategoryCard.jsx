import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import "../styles/admin.css"

export default function CategoryCard({id, nev, reszletek})
{
    return(
        <>
            <Card className="order-card">
                <Card.Body className="card-body">
                    <h5 className="card-title">{nev}</h5>
                    <Button variant="primary" className="order-actions" onClick={reszletek}> Szerkeztés </Button>
                </Card.Body>
            </Card>
        </>
    )
}