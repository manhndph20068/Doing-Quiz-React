import { useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import { useEffect } from "react";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";

const TableQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [dataUpdate, setDataUpdate] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    console.log(res);
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  const handleDeleteQuiz = (item) => {
    console.log(item);
    setDataDelete(item);
    setShowModalDeleteQuiz(true);
  };

  const handleUpdateQuiz = (item) => {
    console.log(item);
    setDataUpdate(item);
    setShowModalUpdateQuiz(true);
  };

  return (
    <>
      <div className="title mt-3">List Quiz</div>
      <table className="table table-hover table-bordered my-2">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleUpdateQuiz(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger mx-3"
                      onClick={() => handleDeleteQuiz(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalDeleteQuiz
        setShow={setShowModalDeleteQuiz}
        show={showModalDeleteQuiz}
        fetchQuiz={fetchQuiz}
        dataDelete={dataDelete}
      />
      <ModalUpdateQuiz
        setShow={setShowModalUpdateQuiz}
        show={showModalUpdateQuiz}
        fetchQuiz={fetchQuiz}
        dataUpdate={dataUpdate}
      />
    </>
  );
};
export default TableQuiz;
