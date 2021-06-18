import { Button } from "react-bootstrap";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import { useState } from "react";

export default function VerifyImageModal ({image}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="secondary" onClick={handleShow}><FontAwesomeIcon icon={faSearchPlus}/></Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body><Image src={image} width={500} height={500} layout="responsive"/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}