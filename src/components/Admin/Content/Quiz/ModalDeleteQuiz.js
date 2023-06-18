import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";

const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDelete, fetchQuiz } = props;

  const handleClose = () => setShow(false);

  const submitDeleteQuiz = async () => {
    console.log(dataDelete.id);
    let res = await deleteQuiz(dataDelete.id);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      fetchQuiz();
    } else {
      toast.error(res.EM);
      handleClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete the {dataDelete.name} </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => submitDeleteQuiz()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
