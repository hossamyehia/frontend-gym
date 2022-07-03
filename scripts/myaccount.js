/**
 * Global Variables
 */
const buttons = document.querySelectorAll('.data[data-page=info] > input');


const updateData = () => {

    let infoPage = document.querySelector('.data[data-page=info]');
    let editButtons = document.querySelectorAll('.data[data-page=info] img');
    
    window.addEventListener('load',function(){

        editButtons.forEach((button , index) => {
            button.addEventListener("click",buttonClicked)
        })

        buttons[0].addEventListener('click', submitForm);

        buttons[1].addEventListener('click', cancel);

    });

    const buttonClicked = (e) => {
        let target = e.target;

        prepareInputs(target);
        
        if(!(buttons[0].classList.contains('show')) && !(buttons[1].classList.contains('show'))){
            toggleButtons();
        }
        
       
    }


    const submitForm = (e) => {
        let inputs = infoPage.querySelectorAll("input:not([type=submit]):not([type=button])");
        let id = document.querySelector('#id > p')

        let data = {
            id: id.value
        };

        inputs.forEach( input => {
            data[input.name] = input.value;
        })

        sendData(data);
        
    }

    const cancel = (e) => {
        let inputs = infoPage.querySelectorAll("input:not([type=submit]):not([type=button])");
        let hiddenTags = infoPage.querySelectorAll('.hide');

        inputs.forEach( input => {
            input.remove();
        });

        hiddenTags.forEach( tag => {
            tag.classList.toggle('hide');
        })

        toggleButtons();

    }

}
////////////////////*Used Functions*///////////////////////
/**
 * Show Form Inputs
 * @param {Object} target 
 */
const prepareInputs = (target) => {
    let parent = target.parentNode;
    let grandParent = parent.parentNode;


    let h2 = parent.querySelector('h2');
    let p = grandParent.querySelector('p');
    let name = grandParent.id;

    let input = document.createElement('input');

    let type = "text";
    let dl;

    if(name === "birthday")
        type = "date";
    else if(name === "weight" || name === "height" ){
        type = "number";
        if(name === "weight")
            input.setAttribute("min","40");
        else
            input.setAttribute("min","80");

    }   
    else if(name === "password")
        type = "password";
    else if(name === "gender"){
        type = null;

        dl = document.createElement('datalist');
        dl.id = "genders";
        
        let option1 = document.createElement('option');
        option1.value = "Male";
        let option2 = document.createElement('option');
        option2.value = "Female";

        dl.appendChild(option1);
        dl.appendChild(option2);
    }

    p.classList.toggle('hide');
    target.classList.toggle('hide');
    
    
    if(type){
        input.setAttribute("type",type);
        input.setAttribute("name",name);
    }else{
        input.setAttribute("list","genders");
        input.appendChild(dl);
    }
    
    input.setAttribute("placeholder",h2.textContent);
    input.required = true;

    let tag = grandParent.querySelector(`input[type=text][name=${name}]`);

    if(tag){
        grandParent.removeChild(tag);
    }else{
        grandParent.appendChild(input);
    }

}

/**
 * Show Form Buttons
 */
const toggleButtons = () => {
    buttons[0].classList.toggle('show');
    buttons[1].classList.toggle('show');
}

/**
 * Send User Updated Data
 * @param {Object} data 
 */
const sendData = (data) => {
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", '/myaccount', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && !xhr.status) {
            console.log('Err');
        } else if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('Done');
        }
    }
}
///////////////////////////////////////////////////////////

/**
 * Swap Bettween Account Pages
 */
const swapPages = ()=>{
    let titles = document.querySelectorAll("#list h2");

    window.addEventListener('load',function(){

        titles.forEach((title , index) => {
            title.addEventListener("click",showPage)
        })

    });

    const showPage = (e)=>{
        let target = e.target;

        let wantedPage = document.querySelector(`.data[data-page=${target.id}]`);
        let prevPage = document.querySelector('.data.display');

        let prevTitle = document.querySelector('#list h2.selected');
        
        if(wantedPage != prevPage){
            prevTitle.classList.remove('selected');
            target.classList.add('selected');

            prevPage.classList.remove('display');
            wantedPage.classList.add('display');
        }

    }
}


/**
 * Main Function
 * @param  {...any} Funcs 
 */
 const Main = (...Funcs) =>{
    Funcs.forEach(Func=>{
        Func();
    })
}

Main(swapPages, updateData);