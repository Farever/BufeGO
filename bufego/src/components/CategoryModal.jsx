import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default function CategoryModal({ isOpen, type, onClose, categoryDetails, save, del, bufeId }) {
  const [ujNev, setUjNev] = useState("");
  const [ujHely, setUjHely] = useState("");

  useEffect(() => {
    setUjNev(categoryDetails?.categroy_name || "");
    setUjHely(categoryDetails?.category_placement || "");
  }, [categoryDetails]);

  if (!isOpen) return null;

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {type === "mod" ? `${categoryDetails?.categroy_name} részletei` : "Új kategória"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="flex flex-col gap-3">
          <Form.Group controlId="NevInput">
            <Form.Label>Kategória neve</Form.Label>
            <Form.Control
              type="text"
              value={ujNev}
              onChange={(e) => setUjNev(e.target.value)}
              placeholder="Add meg a kategória nevét"
            />
          </Form.Group>

          <Form.Group controlId="HelyInput">
            <Form.Label>Kategória helye</Form.Label>
            <Form.Control
              type="number"
              value={ujHely}
              onChange={(e) => setUjHely(e.target.value)}
              placeholder="Pl. 1"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="flex justify-between">
        <Button variant="secondary" onClick={onClose}>
          Mégse
        </Button>
        {type === "mod" && (
          <Button variant="danger" onClick={() => del(categoryDetails?.id)}>
            Törlés
          </Button>
        )}
        <Button
          variant="success"
          onClick={() => {
            const idOrBufe = type === "mod" ? categoryDetails.id : bufeId.id;
            save(idOrBufe, ujNev, ujHely);
            onClose();
          }}
        >
          Mentés
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
