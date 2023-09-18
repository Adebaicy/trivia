const shuffle = (array) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
};


let correct_answer = [];
function letload() {
  fetch("https://opentdb.com/api_category.php")
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((output) => {
      var options = "";

      for (let i = 0; i < output["trivia_categories"].length; i++) {
        options += `<option value=${i + 9}>${
          output["trivia_categories"][i]["name"]
        }</option>`;
      }
      document.getElementById("category").innerHTML = options;
    });
}

function lfg() {
  const searchParams = new URLSearchParams(window.location.search);
  let vv = searchParams.get("qc");
  let qdiff = searchParams.get("diff");
  fetch(
    `https://opentdb.com/api.php?amount=10&category=${vv}&difficulty=${qdiff}&type=multiple`
  )
    .then((response) => {
      return response.json();
    })
    .then((output) => {
      var ques = "";
      var anss = "";
      var ansv = [];
      var answers = "";
      var at = "";

      for (let i = 0; i < output["results"].length; i++) {
        ques +=
          "<li>" +
          output["results"][i]["question"] +
          "</li> <p id =" +
          i +
          `></p>`;
          //console.log(output["results"][i]["correct_answer"]);
        correct_answer.push(output["results"][i]["correct_answer"]);
        ansv.push(shuffle([
          ...output["results"][i]["incorrect_answers"],
          output["results"][i]["correct_answer"],
        ]));

        anss = "";
      }

      document.getElementById("que").innerHTML = ques;

      for (let ii = 0; ii < 10; ii++) {
        at = ansv[ii];
        for (let a = 0; a < 4; a++) {
          anss += `<input type="radio" id="${at[a]}" name=${ii} value="${at[a]}">   <label for=${at[a]}>${at[a]}</label> `;
        }
        document.getElementById(ii).innerHTML = anss;
        anss = "";
      }
    });
}
let score = 0;
function results() {
  for (let ii = 0; ii < 10; ii++) {
    if (document.querySelector(`input[name='${ii}']:checked`) == null) {
      score = score;
    } else if (
      correct_answer[ii] ==
      document.querySelector(`input[name='${ii}']:checked`).value
    ) {
      score = score + 1;
    }
  }
  document.getElementById("out").innerHTML = `Score: ${score}
  <p>To retake the test, kindly use the link below to navigate to the home page</p>
  <a href="index.html"><p>Home</p></a>`;
}
