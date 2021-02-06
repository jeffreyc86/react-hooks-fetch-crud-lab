import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([])

  useEffect(()=> {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then((questions) => {
      setQuestions(questions)
    })
  }, [])


  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(() => {
      const newQuestions = questions.filter(q => {return q.id != id})
      setQuestions(newQuestions)
    })
  }

  function changeCorrectIndex(id, correctI){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"correctIndex": correctI})
    })
    .then(r => r.json())
    .then(updatedQ => {
      const newArray = questions.map(q => {
        if (q.id === id) {
          return updatedQ
        } else {return q}
      })
      setQuestions(newArray)
    })
  }

  const questionItems = questions.map(q => {
    return <QuestionItem key={q.id} question={q} handleDelete={handleDelete} changeCorrectIndex={changeCorrectIndex}/>
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
