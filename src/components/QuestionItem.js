import React from "react";

function QuestionItem({ question, handleDelete, changeCorrectIndex }) {
  const { id, prompt, answers, correctIndex } = question;

  let options
  if (answers) {
    options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  }

  function handleClick() {
    handleDelete(id)
  }

  function handleChange(e) {
    changeCorrectIndex(id, parseInt(e.target.value))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
