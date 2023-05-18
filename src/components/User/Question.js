import _ from "lodash";

const Question = (props) => {
  const { data, index, handleCheckbox } = props;

  const handleHanleCheckbox = (e, aId, qId) => {
    handleCheckbox(aId, qId);
  };

  if (_.isEmpty(data)) {
    return <>none</>;
  }
  return (
    <>
      <div className="q-image">
        {data.image && (
          <img src={`data:image/jpeg;base64,${data.image}`} alt="" />
        )}
      </div>
      <div className="question">
        Question {index + 1}: {data.questionDescription}
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length &&
          data.answers.map((a, index) => {
            return (
              <div className="a-child" key={`${index}-answer`}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    checked={a.isSelected}
                    onChange={(e) =>
                      handleHanleCheckbox(e, a.id, data.questionId)
                    }
                  />
                  <label className="form-check-label">{a.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
