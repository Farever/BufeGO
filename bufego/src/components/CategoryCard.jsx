import React from "react";
import { Button } from "react-bootstrap";

export default function CategoryCard({ id, nev, reszletek }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col justify-between gap-4 transition hover:shadow-lg">
      <h5 className="text-lg font-semibold">{nev}</h5>
      <Button variant="warning" onClick={reszletek} className="text-white">
        Szerkesztés
      </Button>
    </div>
  );
}
