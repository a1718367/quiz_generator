var startbtn = document.querySelector("#start");
var timedisp = document.querySelector("#display");
var button = document.querySelector(".choice");
var home = document.querySelector("#home");
var ask = document.querySelector("#ask");
var end = document.querySelector("#end");
var feedback = document.querySelector("#feedback");
var mark = document.querySelector("#score");
var playerInput = document.querySelector("#user");


var a = document.getElementById("btn0");
var b = document.getElementById("btn1");
var c = document.getElementById("btn2");
var d = document.getElementById("btn3");
var save = document.getElementById("save");
var del = document.getElementById("remove");

//Q & A & choise array

var q = [
    {question: "Inside which HTML element do we put the JavaScript?",
    choise: ["<script>","<js>","<scripting>","<javascript>"],
    ans:"<script>"},
    {question: "What is an Array?",
    choise: ["Tag","Object","Number","Style"],
    ans: "Object"},
    {question: "Where do you put styling for html?",
    choise: ["<footer>","<body>","<header>","<head>"],
    ans: "<head>"},
    {question: "What is the world’s most popular front-end component library?",
    choise: ["Strapboot","Bootstrap","Shoestrap","Strapshoes"],
    ans: "Bootstrap"},
    {question: "How do you call a function?",
    choise: ["call myfunction()","myfunction() call","call.myfunction()","myfunction()"],
    ans: "myfunction()"}
    ]

var i = 0
var score = 0
//var num1 = 80;
populate(i);

//button call function - onclick i++; populate Q&A according to index; assign index no to each choise
a.addEventListener("click",function(){pick = 0;chkans(pick,i);i+=1;populate(i)});
b.addEventListener("click",function(){pick = 1;chkans(pick,i);i+=1;populate(i)});
c.addEventListener("click",function(){pick = 2;chkans(pick,i);i+=1;populate(i)});
d.addEventListener("click",function(){pick = 3;chkans(pick,i);i+=1;populate(i)});
save.addEventListener("click",function(){highscore()});
del.addEventListener("click",function(){localStorage.clear("highscore");delrank()});
       
//evaluate response - compare choise index with preset ans index; return result in feedback
function chkans(pick,i){
if(i<q.length){
var pickans = q[i].choise[pick];
if(pickans == q[i].ans){score +=1 ;feedback.textContent = "Correct"; feedback.style.backgroundColor = "blue"}
else{num1 -= 5;feedback.textContent = "Wrong";feedback.style.backgroundColor = "red"}
}else{return}}

//populate question & options based on q array index; call finish func at the end of q index
function populate(j){
    if(j<q.length){
    document.getElementById("question").textContent = q[j].question;
    document.getElementById("ans0").textContent = q[j].choise[0];
    document.getElementById("ans1").textContent = q[j].choise[1];
    document.getElementById("ans2").textContent = q[j].choise[2];
    document.getElementById("ans3").textContent = q[j].choise[3];
}else{
    
    finish();
    
}
}
//Timer v2 - start timer onclick of startbtn; call start func; end test if finish answering all or timer reaches 0
startbtn.addEventListener("click", function(){
    startbtn.disabled = true;
    var x = setInterval(()=>{
    
    if(i<q.length && num1 > 0){
        num1--;
        timedisp.textContent = num1;
    }else{
        clearInterval(x);
        timedisp.textContent = 0;
        finish();
    }
},1000);
start();
})


//start quiz - reset i,score,num1; call populate func to display 1st Q&A; hide home,end,hscore
function start(){
    i = 0
    score = 0
    num1 = 30;
    populate(i);
    home.style.display = 'none';
    end.style.display = 'none';
    hscore.style.display = 'none';
    ask.style.display = 'block';
    feedback.innerHTML = "";
    
}


//Quiz end - hide q; display score; set focus on user input; diabled all button to force input
function finish(){
    ask.style.display = 'none';
    end.style.display = 'block';
    playerInput.focus();
    save.disabled = true;
    mark.textContent = score;

        
}
//store score to local storage - set rank [] if no 'highscore' stored on local storage
var rank =JSON.parse(localStorage.getItem("highscore")) || [];
function highscore(){
    
    const lastscore = {
        pname:  playerInput.value.trim(),
        pscore: score,
    };

    rank.push(lastscore);
    console.log(rank);
    rank.sort((a,b)=> b.pscore - a.pscore);
    rank.splice(5);
    localStorage.setItem("highscore",JSON.stringify(rank));
    startbtn.disabled = false;
    end.style.display = 'none';
    hscore.style.display = 'block';
    topscore();
}
//disable save button if text input == ""
function validate(){
    if(playerInput.value === ""){
        save.disabled = true;
    }else{
        save.disabled=false;
    }
}
//populate top 5 scorers
function topscore(){
    document.getElementById("topscore").innerHTML = "";
    for(l=0;l<rank.length;l++){
    var li = document.createElement("li");
    li.innerHTML = rank[l].pname + " scored " + rank[l].pscore;
    document.getElementById("topscore").appendChild(li);
    }
    
}
//remove score ranking from local storage + reset 'topscore' innerhtml
function delrank(){
    rank = [];
    document.getElementById("topscore").innerHTML = "";

}
//Timer

// startbtn.addEventListener("click", function(){
//     startbtn.disabled = true;
//     var x = setInterval(() => {
//         num1 --;
//         timedisp.innerHTML = num1;
//         if(num1 === 0){
//             clearInterval(x);
//             timedisp.innerHTML == 0;
//             //startbtn.disabled = false;
//             //num1 = 60;
//             finish();
//         }       
//     }, 1000);    
// start();
// })

//score 
// function correct(){
//     score += 1
// }

//time penalty
// function deduct(){
//     num1 -= 5;
// }