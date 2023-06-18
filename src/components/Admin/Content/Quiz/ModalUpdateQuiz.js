import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ModalUpdateQuiz.scss";
import _ from "lodash";
import { putUpdateQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";

const ModalUpdateQuiz = (props) => {
  const { show, setShow, dataUpdate, fetchQuiz } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const handleClose = () => {
    setName("");
    setDescription("");
    setImage("");
    setType("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitUpdate = async () => {
    if (!name) {
      toast.error("Name is required");
      return;
    }
    if (!description) {
      toast.error("Description is required");
      return;
    }
    if (!image) {
      toast.error("Image is required");
      return;
    }
    if (!type) {
      toast.error("Type is required");
      return;
    }

    let res = await putUpdateQuiz(
      dataUpdate.id,
      description,
      name,
      type,
      image
    );

    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      fetchQuiz();
    } else {
      toast.error(res.EM);
    }
  };

  useEffect(() => {
    console.log("dataUpdate", dataUpdate);
    if (!_.isEmpty(dataUpdate)) {
      setName(dataUpdate.name);
      setDescription(dataUpdate.description);
      setType(dataUpdate.difficulty);
      setImage("");
      setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
    }
  }, [dataUpdate]);

  return (
    <div className="update-container">
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Update Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Name</label>
              <input
                type="text"
                class="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Description</label>
              <input
                type="text"
                class="form-control"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div>
              <label>Type</label>
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>
            <div className="preview">
              <label className="select-img" htmlFor="previewImage">
                Select image
              </label>
              <input
                id="previewImage"
                hidden
                type="file"
                class="form-control"
                onChange={(e) => handleUploadImage(e)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span className="empty-img">Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpdate()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalUpdateQuiz;
