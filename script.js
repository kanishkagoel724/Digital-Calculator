//========== ELEMENTS ==========
 const display=document.getElementById("display");
 const buttons=document.querySelectorAll(".buttons button");
 const sciButtons=document.querySelectorAll(".scientific-panel button");
 const sciPanel=document.getElementById("scientificPanel");
 const toggleBtn=document.getElementById("toggleScientific");

let expression="";

//========== SCIENTIFIC PANEL ==========
 toggleBtn.addEventListener("click",()=>{
     sciPanel.classList.toggle("show");
     if(sciPanel.classList.contains("show")){
         toggleBtn.innerHTML="⬆ Hide Scientific";
        }else{
         toggleBtn.innerHTML="✨ Scientific";
        }
    }
);

//========== DISPLAY ==========
 function updateDisplay(){
     display.value=expression||"";
    }


//========== BUTTON CLICKS ==========
 buttons.forEach(btn=>{
     btn.addEventListener("click",()=>{
     const value=btn.dataset.value;
         switch(value){
         case"AC":  
         expression="";
         updateDisplay();
         break; 
         case"⌫":
         expression=expression.slice(0,-1);
         updateDisplay();
         break;
         case"=":
         calculate();
         break;
         default:
         expression+=value;
         updateDisplay();
        }
    });
});

//========== SCIENTIFIC BUTTONS ==========
 sciButtons.forEach(btn=>{
     btn.addEventListener("click",()=>{
         const value=btn.dataset.value; 
                switch(value){
                case"π":
                expression+="π";
                break;
                case"e":
                expression+="e";
                break;
                case"²":
                expression+="²";
                break;
                default:
                expression+=value;
            }
        updateDisplay();
        });
});

//========== KEYBOARD ==========
 document.addEventListener("keydown",(e)=>{
 const key=e.key;
     if(/[0-9]/.test(key)){
     expression+=key;
    }
 else if(["+","-","*","/","%","(",")","."].includes(key)){
     expression+=key;
    }
 else if(key==="Backspace"){
     expression=expression.slice(0,-1);
    }
 else if(key==="Escape"){
     expression="";
    }
 else if(key==="Enter"){
     e.preventDefault();
     calculate();
     return;
    }
 updateDisplay();
});

//========== CALCULATE ==========
 function calculate(){
     try{
     let exp=expression;
     exp=exp.replace(/÷/g,"/");
     exp=exp.replace(/×/g,"*");
     exp=exp.replace(/−/g,"-");
     exp=exp.replace(/π/g,Math.PI);
     exp=exp.replace(/\be\b/g,Math.E);
     exp=exp.replace(/sin\(([^()]*)\)/g,(_,a)=>Math.sin(Number(a)));
     exp=exp.replace(/cos\(([^()]*)\)/g,(_,a)=>Math.cos(Number(a)));
     exp=exp.replace(/tan\(([^()]*)\)/g,(_,a)=>Math.tan(Number(a)));
     exp=exp.replace(/log\(([^()]*)\)/g,(_,a)=>Math.log10(Number(a)));
     exp=exp.replace(/ln\(([^()]*)\)/g,(_,a)=>Math.log(Number(a)));
     exp=exp.replace(/√\(([^()]*)\)/g,(_,a)=>Math.sqrt(Number(a)));
     exp=exp.replace(/(\d+)\²/g,(_,a)=>Math.pow(Number(a),2));
     exp=exp.replace(/(\d+)\^(\d+)/g,(_,a,b)=>Math.pow(Number(a),Number(b)));
     let result=eval(exp);
         if(result===Infinity||isNaN(result)){
         display.value="Error";
         expression="";
         return;
        }
     expression=result.toString();
     display.value=expression;

    }catch{
     display.value="Error";
     expression="";
    }
}