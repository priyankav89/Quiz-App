//add Event Listner to specify when the button is clicked navigate to the quiz page
var startBtn = document.querySelector("bttn");
document.getElementById("bttn").onclick = function () {
    location.href = "./assets/quiz.html";
};