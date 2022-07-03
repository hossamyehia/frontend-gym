/*
/**
 * Form Validation
 */
 const formValidation = () => {
    let form = document.forms["loginform"];
    

    /**
     * toggle password`s privacy
     *      
     * @params {object} e the event object
     * @return none
     * 
     */
    let validateForm = (e) => {
        let username = e.target["username"];
        let password = e.target["password"];

        if(username.value == ""){
            username.style.border = "2px solid red";
            username.style.borderRadius = "5px";
            e.preventDefault();
        }
        else{
            username.style.border = "1px solid #777777b2";
        }
        if(password.value == ""){
            password.style.border = "2px solid red";
            password.style.borderRadius = "5px";
            e.preventDefault();
        }
        else{
            password.style.border = "1px solid #777777b2";
        }

    }

/*
    form.addEventListener("submit",validateForm);
*/
}

formValidation();

/**
 * Handles the multi page form
 */
const formHandler = () => {
    let currentTab = 1;/*
    showTab(currentTab);

    /**
     * Display the current tab
     * @param {number} n the tab`s index
     *//*
    function showTab(n) {

        if (n == 0) {
            document.getElementById("prevBtn").disabled = true;
        } else {
            document.getElementById("prevBtn").style.display = "inline";
        }
        if (n == 4) {
            document.getElementById("nextBtn").innerHTML = "Submit";
        } else {
            document.getElementById("nextBtn").innerHTML = "Next";
        }
        // ... and run a function that displays the correct step indicator:
        fixStepIndicator(n)
    }
*/
    function nextPrev(n) {
        // This function will figure out which tab to display
        var x = document.getElementsByClassName("tab");
        // Exit the function if any field in the current tab is invalid:
        if (n == 1 && !validateForm()) return false;
        // Hide the current tab:
        x[currentTab].style.display = "none";
        // Increase or decrease the current tab by 1:
        currentTab = currentTab + n;
        // if you have reached the end of the form... :
        if (currentTab >= x.length) {
            //...the form gets submitted:
            document.getElementById("regForm").submit();
            return false;
        }
        // Otherwise, display the correct tab:
        showTab(currentTab);
    }

    function validateForm() {
        // This function deals with validation of the form fields
        var x, y, i, valid = true;
        x = document.getElementsByClassName("tab");
        y = x[currentTab].getElementsByTagName("input");
        // A loop that checks every input field in the current tab:
        for (i = 0; i < y.length; i++) {
            // If a field is empty...
            if (y[i].value == "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false:
            valid = false;
            }
        }
        // If the valid status is true, mark the step as finished and valid:
        if (valid) {
            document.getElementsByClassName("step")[currentTab].className += " finish";
        }
        return valid; // return the valid status
    }

    function fixStepIndicator(n) {
        // This function removes the "active" class of all steps...
        var i, x = document.getElementsByClassName("step");
        for (i = 0; i < x.length; i++) {
            x[i].className = x[i].className.replace(" active", "");
        }
        //... and adds the "active" class to the current step:
        x[n].className += " active";
    }

}

formHandler();

/**
 * Handles Selection Process
 */
const handleSelection = () => {
    
    const ratioes = document.querySelectorAll("input[type=radio]");
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    const tab = document.querySelector("#tab");
    const courseTab = document.querySelectorAll('#courseActive');
    const planTab = document.querySelectorAll('#planActive');

    let tabs = [];
    let secondaryCourses = [];
    let mainCourse = null;
    let prev = null;

    if(tab.dataset.tabno == "1"){
        courseTab.forEach((part)=>{
            part.classList.add("activeTab");
        })
    }else if(tab.dataset.tabno == "2"){
        planTab.forEach((part) => {
            part.classList.add("activeTab");
        })
    }


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
        toggleSecondaryCourses(mainCourse);
        activeNextButton();
    }
    
    ratioes.forEach((ratio , index) => {
        ratio.addEventListener("change",mainCourseSelection)
    })
    
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
        activeNextButton();
    }


    /**
     * Disable and Enable Secondary Courses
     */
    const toggleSecondaryCourses = (course) => {
        if(course == "VIP" || course == "Offers" || course == "Physiotherapy"){
            checkboxes.forEach((checkbox , index) => {
                
                let parent = checkbox.parentNode;
                checkbox.checked = false;
                parent.style.border = "2px solid #BBBBBB";
                secondaryCourses.pop(checkbox.value);

                checkbox.disabled = true;
                let img = checkbox.parentNode.querySelector('img')
                img.style.filter = "grayscale(100%)";

            })

        }else{
            checkboxes.forEach((checkbox , index) => {
                checkbox.disabled = false;
                let img = checkbox.parentNode.querySelector('img')
                img.style.filter = "grayscale(0%)";
                
            })
        }
    }

    checkboxes.forEach((checkbox , index) => {
        checkbox.addEventListener("change",secondaryCoursesSelection)
    })

    const prevBtn = document.querySelector('#previous');
    const nextBtn = document.querySelector('#next');

    prevBtn.disabled = true;
    nextBtn.disabled = true;

    /**
     * Active Next Button When the user finish selection
     */
    const activeNextButton = () => {
        if(mainCourse != null){
            nextBtn.disabled = false;
        }else{
            nextBtn.disabled = true;
        }   
    }

    const sendData = (event)=> {
        let data = {
            mainCourse: mainCourse,
            secondaryCourses: secondaryCourses,
        }
        let xhr = new XMLHttpRequest();
        xhr.open("POST", '/signup?tab=1', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        var payload = data;
        xhr.send(payload);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && !xhr.status) {
                tab.innerHTML += "<span class='failed'>FAILED!</span>" 
            } else if (xhr.readyState === 4 && xhr.status === 200) {
                
            }
        }
    }

    nextBtn.addEventListener("click",sendData);
    
}

handleSelection();



