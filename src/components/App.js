
import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
const [questions, setQuestions] = useState([]);
const [page, setPage] = useState("List");
function fetchQuestions (){
fetch('http://localhost:4000/questions')
.then(res => res.json())
.then(data => setQuestions(data))
.catch((error) => console.log(error));
}
useEffect(() => {
fetchQuestions()
}, [])

const addQuestion = (newQuestion) => {
fetch('http://localhost:4000/questions', {
method: 'POST',
headers: { "Content-Type": "application/json" },
body: JSON.stringify(newQuestion)
})
.then(res => res.json())
.then(data => setQuestions([...questions, data]))
.catch(error => console.log(error))
}
function onDelete() {
  fetchQuestions()
  }

return (
<main>
<AdminNavBar onChangePage={setPage} />
{page === "Form" ? <QuestionForm addQuestion={addQuestion} /> : <QuestionList questions={questions} setQuestions= {setQuestions} onDelete ={onDelete}/>}
</main>
);
}

export default App;
