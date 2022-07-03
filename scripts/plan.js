/**
 * Global Variables
 */
let mainCourse = null,
    secondaryCourses = [],
    courses = {},
    coursesByName = {},
    chosenPlans = {},
    totalPrice = 0,
    prev = null;
//////////////////////////////////////////////////////
const   
    mainBody = document.querySelector("#mainBody"),
    tab = document.querySelector("#tab.display"),
    courseTab = document.querySelectorAll('#courseActive'),
    planTab = document.querySelectorAll('#planActive'),
    paymentTab = document.querySelectorAll('#paymentActive'),
//////////////////////////////////////////////////////
    coursePage = document.querySelector('#tab[data-tab="1"]'),
    planPage = document.querySelector('#tab[data-tab="2"]'),
    paymentPage = document.querySelector('#tab[data-tab="3"]'),
//////////////////////////////////////////////////////
    mainOptions = coursePage.querySelectorAll("input[type=radio]"),
    secondaryOptions = coursePage.querySelectorAll("input[type=checkbox]"),
//////////////////////////////////////////////////////
    nextBtn = document.querySelector('#next'),
    prevBtn = document.querySelector('#previous'),
////////////////////////////////////////////////////
    plans = document.querySelector('#plans'),
    planCard = document.querySelector('#planCard'),
    nextCourse = document.querySelector('.nextCol button'),
    prevCourse = document.querySelector('.previousCol button'),
////////////////////////////////////////////////////
    loader = document.querySelector('#loader');
////////////////////////////////////////////////////


/**
 * Handles Selection Process
 */
const handleCoursesSelection = () => {

    window.addEventListener('load', ()=>{

        mainOptions.forEach((option , index) => {
            option.addEventListener("change",mainCourseSelection)
        });

        secondaryOptions.forEach((option , index) => {
            option.addEventListener("change",secondaryCoursesSelection)
        });

    })

    /**
     * Handles Change Event for Radioes
     * @param {object} event 
     */
    const mainCourseSelection = (event)=>{
        prev = prev ? prev : event.target;
        let target = event.target;
        let parent = target.parentNode;

        if (target !== prev) {

            prev.parentNode.style.border = "2px solid #BBBBBB";
            prev = target;

            parent.style.border = "2px solid #FF5500";
            mainCourse = target.value;

        }else{
            prev.parentNode.style.border = "2px solid #FF5500";
            mainCourse = prev.value;
        }
        
        if(!(isEmpty(courses)))
            reset();

        toggleSecondaryCourses(mainCourse);
        activeNextButton();
    }
    
    /**
     * Handles Change Event for checkboxes
     * @param {object} event 
     */
    const secondaryCoursesSelection = (event)=>{

        let target = event.target;
        let parent = target.parentNode;
        if(target.checked == true){
            parent.style.border = "2px solid #FF5500";
            secondaryCourses.push(target.value);
        }else{
            parent.style.border = "2px solid #BBBBBB";
            secondaryCourses.pop(target.value);
        }

        if(!(isEmpty(courses)))
            reset();

        activeNextButton();
    }
    
}
////////////////////*Used Functions*///////////////////////
/**
 * Active Next Button When the user finish selection
 */
const activeNextButton = () => {
    if(mainCourse != null || secondaryCourses.length != 0){
        nextBtn.disabled = false;
    }else{
        nextBtn.disabled = true;
    }   
}

/**
 * Disable and Enable Secondary Courses
 */
const toggleSecondaryCourses = (course) => {
    if(course == "VIP" || course == "Offers" || course == "Physiotherapy"){
        secondaryOptions.forEach((checkbox , index) => {
            
            let parent = checkbox.parentNode;
            checkbox.checked = false;
            parent.style.border = "2px solid #BBBBBB";
            secondaryCourses.pop(checkbox.value);

            checkbox.disabled = true;
            let img = checkbox.parentNode.querySelector('img')
            img.style.filter = "grayscale(100%)";

        })

    }else{
        secondaryOptions.forEach((checkbox , index) => {
            checkbox.disabled = false;
            let img = checkbox.parentNode.querySelector('img')
            img.style.filter = "grayscale(0%)";
        })
    }
}

/**
 * Reset
 */
const reset = () => {
    plans.innerHTML = "";
    cost.innerText = 0;
    courses = {};
    coursesByName = {};
    chosenPlans = {};
    totalPrice = 0;
    loader.classList.add('show'); 
    planCard.classList.add('hide');

}
///////////////////////////////////////////////////////////


/**
 * Handles Next And Previous Buttons Actions
 */
const buttonsActions = () => {

    prevBtn.disabled = true;
    nextBtn.disabled = true;

    window.addEventListener('load', ()=>{

        nextBtn.addEventListener("click", nBEventHandler);
        prevBtn.addEventListener("click", pBEventHandler)

    });
    

    const nBEventHandler = (e) => {
        let tab = document.querySelector("#tab.display");

        if(tab.dataset.tab == "1"){
            let error = false;

            let data = {
                mainCourse: mainCourse,
                secondaryCourses: secondaryCourses
            }
            
            if(isEmpty(courses)){
                nextBtn.disabled = true;
                /*
                getData(data, "/api/plans").then(plans => {
                    courses = plans;
                    preparePlan().then( ()=>{
                        setTimeout(() => { endLoading(); }, 2000);
                    });
                }).catch( err => {
                    error = true;
                    alert(err);
                })
                */
                getData2().then( () => {
                    preparePlan().then( ()=>{
                        setTimeout(() => { endLoading(); }, 2000);
                    });
                })

                
            }

            if(!error){
                tab = swapPages(tab, "2");
                prevBtn.disabled = false;
            }else{
                error = false
            }
            
        }else if(tab.dataset.tab == "2"){

            nextBtn.value = "Submit";
            tab = swapPages(tab, "3");

        }else if(tab.dataset.tab == "3"){

            let data = chosenPlans;
            sendData(data, "/api/chosenplans").then(()=>{
                success();
            }).catch( err => {
                alert(err);
            })
            

        }

        if(tab.dataset.tab != "3"){
            handleBarParts(tab);
        }
        
    }

    const pBEventHandler = (e) => {
        let tab = document.querySelector("#tab.display");

        if(tab.dataset.tab == "2"){
            nextBtn.disabled = false;
            prevBtn.disabled = true;
            tab = swapPages(tab, "1");
        }else if(tab.dataset.tab == "3"){
            nextBtn.value = "Next";
            tab = swapPages(tab, "2");
        }
        handleBarParts(tab);

    }

}
////////////////////*Used Functions*///////////////////////
/**
 * Test Functions
 * @returns 
 */
 function getData2(){
    return new Promise((resolve, reject)=>{
        courses = {
            Fitness: [
                {name:"#Fitness_1", duration: 1, dayNo: 3, price: 50},
                {name:"#Fitness_2", duration: 1, dayNo: 4, price: 60},
                {name:"#Fitness_3", duration: 1, dayNo: 5, price: 70},
                {name:"#Fitness_4", duration: 3, dayNo: 3, price: 80},
                {name:"#Fitness_5", duration: 3, dayNo: 4, price: 90},
                {name:"#Fitness_6", duration: 3, dayNo: 5, price: 100},
                {name:"#Fitness_7", duration: 6, dayNo: 3, price: 110},
                {name:"#Fitness_8", duration: 6, dayNo: 4, price: 120},
                {name:"#Fitness_9", duration: 6, dayNo: 5, price: 130},
                {name:"#Fitness_10", duration: 12, dayNo: 3, price: 140},
                {name:"#Fitness_11", duration: 12, dayNo: 4, price: 150},
                {name:"#Fitness_12", duration: 12, dayNo: 5, price: 160},
            ],
            Bodybuilding: [
                {name:"#Bodybuilding_1", duration: 1, dayNo: 3, price: 50},
                {name:"#Bodybuilding_2", duration: 1, dayNo: 4, price: 60},
                {name:"#Bodybuilding_3", duration: 1, dayNo: 5, price: 70},
                {name:"#Bodybuilding_4", duration: 3, dayNo: 3, price: 80},
                {name:"#Bodybuilding_5", duration: 3, dayNo: 4, price: 90},
                {name:"#Bodybuilding_6", duration: 3, dayNo: 5, price: 100},
                {name:"#Bodybuilding_7", duration: 6, dayNo: 3, price: 110},
                {name:"#Bodybuilding_8", duration: 6, dayNo: 4, price: 120},
                {name:"#Bodybuilding_9", duration: 6, dayNo: 5, price: 130},
                {name:"#Bodybuilding_10", duration: 12, dayNo: 3, price: 140},
                {name:"#Bodybuilding_11", duration: 12, dayNo: 4, price: 150},
                {name:"#Bodybuilding_12", duration: 12, dayNo: 5, price: 160},
            ],
            VIP: [
                {name:"#VIP_1", duration: 1, dayNo: 3, price: 50},
                {name:"#VIP_2", duration: 1, dayNo: 4, price: 60},
                {name:"#VIP_3", duration: 1, dayNo: 5, price: 70},
                {name:"#VIP_4", duration: 3, dayNo: 3, price: 80},
                {name:"#VIP_5", duration: 3, dayNo: 4, price: 90},
                {name:"#VIP_6", duration: 3, dayNo: 5, price: 100},
                {name:"#VIP_7", duration: 6, dayNo: 3, price: 110},
                {name:"#VIP_8", duration: 6, dayNo: 4, price: 120},
                {name:"#VIP_9", duration: 6, dayNo: 5, price: 130},
                {name:"#VIP_10", duration: 12, dayNo: 3, price: 140},
                {name:"#VIP_11", duration: 12, dayNo: 4, price: 150},
                {name:"#VIP_12", duration: 12, dayNo: 5, price: 160},
            ]
        }
        setTimeout(() => { resolve(); }, 0000);
    })
}

/**
 * Toggle Form Pages
 * @param {Object} tab 
 * @param {Number} number 
 * @returns New Page
 */
const swapPages = (tab, number) => {

    let newPage = document.querySelector(`#tab[data-tab="${number}"]`);
    tab.classList.remove('display');
    newPage.classList.add('display');

    return newPage;
}

/**
 * Send Data to Server
 * @param {Object} data 
 * @param {String} url 
 * @returns Done Msg
 */
const getData = (data, url)=> {
    return new Promise((resolve, reject)=>{

        let xhr = new XMLHttpRequest();
        let queries = prepareQueries(data);
        xhr.open("GET", url+queries);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
        xhr.responseType = 'json';
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && !xhr.status) {
                reject("please try again");
            } else if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.response);
            }
        }

    })
}
////////*Used Functions*////////
/**
 *
 * @param {} data
 * @returns Query string
 */
const prepareQueries = (data) => {
    let str = `?mainCourse=${data["mainCourse"]}`;
    if(data["secondaryCourses"].length != 0){
        let tmpStr = "&secondaryCourses=";
        data["secondaryCourses"].forEach( (course, index) => {
            tmpStr += course;
            if(index < (data["secondaryCourses"].length - 1))
                tmpStr += ",";
        })
        str += tmpStr;
    }

    return str;
}
////////////////////////////////

/**
 *
 *
 *
 */
const sendData = (data, url) => {
    return new Promise((resolve, reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('X-CSRFToken', document.cookie.split(" ")[0].split('=')[1]);
        let json = JSON.stringify(data)
        xhr.send(json);
        xhr.responseType = 'json';
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && !xhr.status) {
                reject("please try again");
            } else if (xhr.readyState === 4 && xhr.status === 200) {
                resolve();
            }else{
                reject("please try again");
            }
        }

    })
}

/**
 * Prepare Plans to be added to html
 * @returns Done Msg
 */
const preparePlan = () => {
    return new Promise((resolve, reject)=>{
        for( c in courses ){

            chosenPlans[c] = {
                name: null,
                duration: null,
                classes: null,
                price: 0
            };

            coursesByName[c] = groupByName(courses[c]);

            let durationName = `${c}_Duration`;
            let className = `${c}_Classes`;

            let plan = document.createElement('div');
            plan.setAttribute("id", c);

            let header = document.createElement('h1');
            header.innerText = c;
            plan.appendChild(header);

            let durationHeader = document.createElement("h3");
            durationHeader.innerText = "Duration";
            plan.appendChild(durationHeader);

            let durationOptions = document.createElement('div');
            durationOptions.setAttribute("class", "options");
            durationOptions.dataset.for = "Duration";

            let durations = groupBy(courses[c], "duration");

            for(let duration in durations){

                let option = document.createElement("div");

                let input = document.createElement("input");
                input.setAttribute("type", "radio");
                input.setAttribute("name", durationName);
                input.setAttribute("value", duration);
                input.addEventListener('change', durationSelection);
                option.appendChild(input);

                let label = document.createElement("label");
                label.setAttribute("for", duration);
                if(duration == 1)
                    label.innerText = `${duration} Month`;
                else if(duration >= 12)
                    label.innerText = `${duration/12} Year`;
                else if(duration >= 24)
                    label.innerText = `${duration/12} Years`;
                else
                    label.innerText = `${duration} Months`;
                option.appendChild(label);

                durationOptions.appendChild(option);
            }

            
            plan.appendChild(durationOptions);

            let classesHeader = document.createElement("h3");
            classesHeader.innerText = "Classes";
            plan.appendChild(classesHeader);
            
            let classesOptions = document.createElement('div');
            classesOptions.setAttribute("class", "options");
            classesOptions.dataset.for = "Classes";

            let days = groupBy(courses[c], "dayNo");

            for(let day in days){

                let option = document.createElement("div");
                days[day].forEach(cost => {
                    option.dataset[`name-${cost.duration}`] = cost.name;
                    option.dataset[`cost-${cost.duration}`] = cost.price;
                })

                let input = document.createElement("input");
                input.setAttribute("type", "radio");
                input.setAttribute("name", className);
                input.setAttribute("value", day);
                input.addEventListener('change', classesSelection);
                input.disabled = true;
                option.appendChild(input);

                let label = document.createElement("label");
                label.setAttribute("for", day);
                label.innerText = `${day} days`;
                option.appendChild(label);

                classesOptions.appendChild(option);
            }
            
            plan.appendChild(classesOptions);

            plans.appendChild(plan);
        }
        resolve();
    })
}
////////*Used Functions*////////
/**
 * 
 * @param {*} e 
 */
const durationSelection = (e) => {

    let courseName = e.target.getAttribute('name').split("_")[0];
    let durationValue = e.target.value;
    let planNode = e.target.parentNode.parentNode.parentNode;
    let price = 0;


    //If The User did not choose one before
    if(chosenPlans[courseName]["duration"] == null){
        activeClassesOptions(planNode);
    }else{
        if(chosenPlans[courseName]["classes"] != null){
            if(chosenPlans[courseName]["price"] != 0){
                totalPrice -= chosenPlans[courseName]["price"];
            }
            let planInfo = getPlanInfo(courseName, durationValue, chosenPlans[courseName]["classes"]);
            chosenPlans[courseName]["name"] = planInfo.name;
            chosenPlans[courseName]["price"] = planInfo.price;
            totalPrice += planInfo.price;
        }
        
    }


    chosenPlans[courseName]["duration"] = durationValue;

    toggleActiveNext();
    displayCost();
}
/**
 * 
 * @param {*} e 
 */
const classesSelection = (e) =>{
    let courseName = e.target.getAttribute('name').split("_")[0];
    let classValue = e.target.value;

    //If The User chose one before
    if(chosenPlans[courseName]["classes"] != null){
        totalPrice -= chosenPlans[courseName]["price"];
    }

    let planInfo = getPlanInfo(courseName, chosenPlans[courseName]["duration"], classValue);
    chosenPlans[courseName]["name"] = planInfo["name"];
    chosenPlans[courseName]["price"] = planInfo.price;
    totalPrice += planInfo.price;

    chosenPlans[courseName]["classes"] = classValue;

    toggleActiveNext();
    displayCost();
}
/**
 * 
 */
const toggleActiveNext = ()=>{
    let check = true;
    // IF the User didnt choose any plan yet
    if(!(isEmpty(chosenPlans))){
        for (const plan in chosenPlans) {
            if (chosenPlans[plan]["name"] == null) {
                check = false;
                break;
            }
        }
        if(check){
            nextBtn.disabled = false;
        }else{
            nextBtn.disabled = true;
        }
    }
}
/**
 * 
 * @param {Object} planNode 
 */
const activeClassesOptions = (planNode) => {
    let classesOptions = planNode.querySelectorAll("div[data-for=Classes] input");
    classesOptions.forEach( option =>{
        option.disabled = false;
    })
}
/**
 * 
 * @param {String} courseName 
 * @param {Number} duration 
 * @param {Number} classes 
 * @returns 
 */
const getPlanInfo = (courseName, duration, classes)=>{
    for(let plan in coursesByName[courseName]){
        if(coursesByName[courseName][plan]["duration"] == duration && coursesByName[courseName][plan]["classes"] == classes){
            let tmp = coursesByName[courseName][plan];
            tmp["name"] = plan;
            return tmp;
        }
    }
}
/**
 * 
 */
const displayCost = () => {
    let cost = document.querySelector('#cost');
    cost.innerText = totalPrice;
}

/**
 * Show the Success Msg When Finish
 */
const success = () => {
    let html = 
    `
    <div class="successMsg">
        <div>
            <header>Note</header>
            <p>You successfully signed up </p>
            <a href="/"><button>Back To Home</button></a>
        </div>
    </div>
    `
    mainBody.innerHTML = html;
}
////////////////////////////////

/**
 * Stop Loading Screen
 */
const endLoading = () => {
        
    loader.classList.add('hiding');
    setTimeout(() => { 
        loader.classList.remove('hiding');
        loader.classList.remove('show');
        
        planCard.classList.add('showing');
        setTimeout(() => { 
            planCard.classList.remove('hide');
        }, 1000);

    }, 1700);    
    
}
//////////////////////////////////////////////////////////


/**
 * Scroll Plan Cards
 */
const scrollCards = () => {
    
    const scrollValue = '600';

    window.addEventListener('load', ()=>{
        nextCourse.addEventListener('click',next);
        prevCourse.addEventListener('click',prev)
    })

    const next = (e) => {
        plans.scrollBy({
            left: scrollValue, 
            top:0,
            behavior:"smooth"
        });
    }

    const prev = (e) => {
        plans.scrollBy({
            left: -scrollValue, 
            top: 0,
            behavior: "smooth"
        });
    }
}



/**
 * 
 * @param {Object} tab 
 */
const handleBarParts = (tab) => {

    const activeTab = document.querySelectorAll('.activeTab');
    activeTab.forEach(part => {
        part.classList.remove("activeTab");
    })

    if(tab.dataset.tab == "1"){
        courseTab.forEach((part)=>{
            part.classList.add("activeTab");
        })
    }else if(tab.dataset.tab == "2"){
        planTab.forEach((part) => {
            part.classList.add("activeTab");
        })
    }else if(tab.dataset.tab == "3"){
        paymentTab.forEach((part) => {
            part.classList.add("activeTab");
        })
    }
    
}


/**
 * Main Function
 * @param  {...any} Funcs 
 */
const Main = (...Funcs) =>{
    handleBarParts(tab);
    Funcs.forEach(Func=>{
        Func();
    })
}

Main(handleCoursesSelection, scrollCards, buttonsActions);


/**
 * Assisting Functions
 */

/**
 * Check if the Object is Empty or not
 * @param {Object} obj 
 * @returns Boolean
 */
const isEmpty = (obj) => {
    return obj 
    && Object.keys(obj).length === 0
    && Object.getPrototypeOf(obj) === Object.prototype;
}

/**
 * Group Array of Object By Key Value
 * @param {Array} xs 
 * @param {String} key 
 * @returns New Grouped Array
 */
const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
};

/**
 * 
 * @param {ِArray} array 
 * @returns 
 */
const groupByName = (array) =>{
    return array.reduce((pr,cr,i)=>{
        pr[cr["name"]] = {
            duration: cr.duration,
            classes: cr.dayNo,
            price: cr.price
        };
        return pr;
    },{});
}

  


