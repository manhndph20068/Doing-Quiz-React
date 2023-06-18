import { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const Questions = () => {
  const [selectedOption, setSelectedOption] = useState({});

  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      drescription: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          drescription: "",
          isCorrect: false,
        },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    console.log("check", type, id);
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        drescription: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            drescription: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionClone = _.cloneDeep(questions);
      questionClone = questions.filter((item) => item.id !== id);
      setQuestions(questionClone);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionClone = _.cloneDeep(questions);
    console.log("check", type, questionId, answerId);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        drescription: "",
        isCorrect: false,
      };
      let index = questionClone.findIndex((item) => item.id === questionId);
      console.log("index", index);
      questionClone[index].answers.push(newAnswer);
      setQuestions(questionClone);
    }
    if (type === "REMOVE") {
      let index = questionClone.findIndex((item) => item.id === questionId);
      questionClone[index].answers = questionClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(questionClone);
    }
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const handleOnchange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionClone = _.cloneDeep(questions);
      let index = questionClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionClone[index].drescription = value;
        setQuestions(questionClone);
      }
    }
  };

  const handleOnchangeFileQustion = (questionId, event) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (
      (index > -1, event.target && event.target.files && event.target.files[0])
    ) {
      questionClone[index].imageFile = event.target.files[0];
      questionClone[index].imageName = event.target.files[0].name;
      setQuestions(questionClone);
    }
  };

  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionClone[index].answers = questionClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.drescription = value;
            }
          }
          return answer;
        }
      );

      setQuestions(questionClone);
    }
  };

  const handleSubmitQuestionForQuiz = () => {
    console.log("questions", questions);
  };

  return (
    <div className="questions-container">
      <div className="title">Manage Question</div>
      <hr />
      <div className="add-new-questions">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz: </label>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div className="mt-3 mb-2">Add Question</div>
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="q-main mb-4">
                <div className="question-content">
                  <div className="form-floating drescription">
                    <input
                      type="type"
                      className="form-control"
                      value={question.drescription}
                      placeholder="des"
                      onChange={(e) =>
                        handleOnchange("QUESTION", question.id, e.target.value)
                      }
                    />
                    <label>Question {index + 1}'s Drescription</label>
                  </div>
                  <div className="group-upload">
                    <label htmlFor={`${question.id}`}>
                      <RiImageAddFill className="label-upload" />
                    </label>
                    <input
                      type="file"
                      id={`${question.id}`}
                      onChange={(e) =>
                        handleOnchangeFileQustion(question.id, e)
                      }
                      hidden
                    />
                    <span>
                      {question.imageName
                        ? question.imageName
                        : "0 file is uploaded"}
                    </span>
                  </div>
                  <div className="btn-add">
                    <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                      <AiFillPlusCircle className="icon-add" />
                    </span>
                    {questions.length > 1 && (
                      <span
                        onClick={() =>
                          handleAddRemoveQuestion("REMOVE", question.id)
                        }
                      >
                        <AiOutlineMinusCircle className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>
                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <input
                          className="form-check-input iscorrect"
                          type="checkbox"
                          value=""
                          checked={answer.isCorrect}
                          onChange={(e) =>
                            handleAnswerQuestion(
                              "CHECKBOX",
                              answer.id,
                              question.id,
                              e.target.checked
                            )
                          }
                        />
                        <div className="form-floating anwser-name">
                          <input
                            type="type"
                            className="form-control"
                            placeholder="des"
                            value={answer.drescription}
                            onChange={(e) =>
                              handleAnswerQuestion(
                                "INPUT",
                                answer.id,
                                question.id,
                                e.target.value
                              )
                            }
                          />
                          <label>answers {index + 1}</label>
                        </div>
                        <div className="btn-group">
                          <span>
                            <AiFillPlusCircle
                              onClick={() =>
                                handleAddRemoveAnswer("ADD", question.id)
                              }
                              className="icon-add"
                            />
                          </span>
                          {question.answers.length > 1 && (
                            <span>
                              <AiOutlineMinusCircle
                                onClick={() =>
                                  handleAddRemoveAnswer(
                                    "REMOVE",
                                    question.id,
                                    answer.id
                                  )
                                }
                                className="icon-remove"
                              />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        {questions && questions.length > 0 && (
          <div>
            <button
              onClick={() => handleSubmitQuestionForQuiz()}
              className="btn btn-warning"
            >
              Save Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Questions;
