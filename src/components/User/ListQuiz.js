import { useEffect } from "react";
import { getQuizByUser } from "../../services/apiService";
import { useState } from "react";
import "./ListQuiz.scss";

const ListQuiz = () => {
  const [arrQuiz, setArrQuiz] = useState([]);

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    let res = await getQuizByUser();
    console.log("check res: ", res);
    if (res && res.EC === 0) {
      setArrQuiz(res.DT);
    }
  };

  return (
    <>
      <div className="list-quiz container">
        {arrQuiz &&
          arrQuiz.length > 0 &&
          arrQuiz.map((item, index) => {
            return (
              <div
                key={`${index}-quiz`}
                className="card"
                style={{ width: "18rem" }}
              >
                <img src={`data:image/jpeg;base64,${item.image}`} alt="" />
                <div className="card-body">
                  <h5 className="card-title">{index + 1}</h5>
                  <p className="card-text">{item.description}</p>
                  <button className="btn btn-primary">Start</button>
                </div>
              </div>
            );
          })}
        {arrQuiz && arrQuiz.length === 0 && <div>You dont have any Quizz</div>}
      </div>
    </>
  );
};
export default ListQuiz;
