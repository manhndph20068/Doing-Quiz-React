import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQuizData, postSubmitQuiz } from "../../services/apiService";
import _, { result } from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import { useState } from "react";
import ModalResult from "./ModalResult";

const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();

  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setShowModalResult] = useState(false);
  const [dataModalResult, setdataModalResult] = useState({});

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index - 1 < 0) {
      return;
    }
    setIndex(index - 1);
  };

  const handleCheckbox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }

    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  const fetchQuestion = async () => {
    let res = await getQuizData(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });

          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      setDataQuiz(data);
    }
  };

  const handleFinishQuiz = async () => {
    //   {
    //     "quizId": 1,
    //     "answers": [
    //         {
    //             "questionId": 1,
    //             "userAnswerId": [3]
    //         },
    //         {
    //             "questionId": 2,
    //             "userAnswerId": [6]
    //         }
    //     ]
    // }
    let payLoad = {
      quizId: +quizId,
      answers: [],
    };
    console.log("check data before submit ", dataQuiz);
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((item) => {
        console.log("check item", item);
        let answer = {
          questionId: +item.questionId,
          userAnswerId: [],
        };
        item.answers.forEach((answerItem) => {
          if (answerItem.isSelected) {
            answer.userAnswerId.push(answerItem.id);
          }
        });
        payLoad.answers.push(answer);
      });
      console.log("check payload", payLoad);
      let res = await postSubmitQuiz(payLoad);
      console.log("check res", res);

      if (res && res.EC === 0) {
        setdataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setShowModalResult(true);
      } else {
        alert("sth wrong");
      }
    }
  };

  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr></hr>
        <div className="q-body">
          <img alt="" />
        </div>
        <div className="q-content">
          <Question
            handleCheckbox={handleCheckbox}
            index={index}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>
            prev
          </button>
          <button className="btn btn-primary" onClick={() => handleNext()}>
            next
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleFinishQuiz()}
          >
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">Count down</div>
      <ModalResult
        show={isShowModalResult}
        setShow={setShowModalResult}
        dataModalResult={dataModalResult}
      />
    </div>
  );
};
export default DetailQuiz;
