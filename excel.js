let selectedFile;

document.getElementById('input').addEventListener("change",(event) => {
    selectedFile = event.target.files[0];
})


document.getElementById('button').addEventListener("click",() => {
    if(selectedFile){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event)=>{
            // console.log(event.target.result);
            let data = event.target.result;
            let workbook = XLSX.read(data,{type:"binary"});
            console.log(workbook);
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                console.log(rowObject);
                document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4);
                const quotes = rowObject;
                  document.getElementById("subject").innerHTML=document.getElementById("subjectname").value;
                  document.getElementById("time").innerHTML=document.getElementById("totaltime").value;
                  document.getElementById("mark").innerHTML=document.getElementById("maxmarks").value;
                  document.getElementById("testnum").innerHTML=document.getElementById("UTnumber").value;
                  document.getElementById("mcqmark").innerHTML=document.getElementById("marksmcq").value;
                  document.getElementById("saqmark").innerHTML=document.getElementById("markssaq").value;
                  document.getElementById("laqmark").innerHTML=document.getElementById("markslaq").value;

                 var mcqnum=document.getElementById("numbermcq").value;
                 var saqnum=document.getElementById("numbersaq").value;
                 var laqnum=document.getElementById("numberlaq").value;
                // console.log(mcqnum);
                // console.log(saqnum);
                // console.log(laqnum);


                //Short answer questions
                    var max = rowObject.length;
                    var random = [];
                    let s="";
                    let count=1;
                    for(let i = 0;i<saqnum; i++){
                        var temp = Math.floor(Math.random()*max);
                        if(random.indexOf(temp) == -1 && rowObject[temp].type === "shortanswer"){
                            random.push(temp);
                           s=s+`<p> ${count}. ${rowObject[temp].question}</p>`;
                           count++;
                        }
                        else
                         i--;
                    }
                    document.getElementById("saq").innerHTML=s;




                    //long answer
                    let countlong=1;
                    let str="";
                    for(let i = 0;i<laqnum; i++){
                        var temp = Math.floor(Math.random()*max);
                        if(random.indexOf(temp) == -1 && rowObject[temp].type === "longanswer"){
                            random.push(temp);
                           str=str+`<p> ${countlong}. ${rowObject[temp].question}</p>`;
                           countlong++;
                        }
                        else
                         i--;
                    }
                    document.getElementById("laq").innerHTML=str;


                    //Multiple Choice Question
                    let countmcq=1;
                    let strmcq="";
                    for(let i = 0;i<mcqnum; i++){
                        var temp = Math.floor(Math.random()*max);
                        if(random.indexOf(temp) == -1 && rowObject[temp].type === "multiplechoice"){
                            random.push(temp);
                           strmcq=strmcq+`<p> ${countmcq}. ${rowObject[temp].question}</p>`;
                           strmcq=strmcq+`<p> a) ${rowObject[temp].option1}</p>`;
                           strmcq=strmcq+`<p> b) ${rowObject[temp].option2}</p>`;
                           strmcq=strmcq+`<p> c) ${rowObject[temp].option3}</p>`;
                           strmcq=strmcq+`<p> d) ${rowObject[temp].option4}</p>`;

                           countmcq++;
                        }
                        else
                         i--;
                    }
                    document.getElementById("mcq").innerHTML=strmcq;



let wes = document.getElementsByClassName("weField");

let strwe="";

for (let e of wes) {
    strwe=strwe + `<li> ${e.value} </li>`;
}

document.getElementById("weT").innerHTML = strwe;
            });
            console.log(jsondata);
        }


        document.getElementById("form-template").style.display="none";
document.getElementById("ppr-template").style.display = "block";
    }else{
        alert('No file is selected');
    }
});



function addNewWEField() {

    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control")
    newNode.classList.add("weField")
    newNode.classList.add("mt-2")
    newNode.setAttribute("rows",2)
    newNode.setAttribute("placeholder","Enter here")

    let weOb = document.getElementById("we");
    let weAddButtonOb = document.getElementById("weAddButton")

    weOb.insertBefore(newNode , weAddButtonOb);
}

function mailField() {
    window.open('mailto:waniswapnil3@gmail.com');
}


