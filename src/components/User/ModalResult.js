import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalResult(props) {
  const { show, setShow, dataModalResult } = props;

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Your result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {" "}
            Tatal question: <b>{dataModalResult.countTotal}</b>
          </div>
          <div>
            {" "}
            Tatal correct answers: <b>{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Show Answers
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalResult;
