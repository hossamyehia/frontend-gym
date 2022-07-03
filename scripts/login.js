/** 
 * it handles the privacy of the user`s password
 */
const passwordPrivacy = () => {
    let privacy = document.querySelector("#privacy");

    /*
     * toggle password`s privacy
     *      
     * @params {object} e the event object
     * @return none
     * 
     */
    let togglePrivacy = (e) => {
        let classList = e.target.classList;
        let password = e.target.parentNode.querySelector("#password");
        
        if(classList && classList.contains("private"))
        {
            classList.remove("private");
            classList.add("public");
            password.setAttribute("type","text");
        }
        else if(classList && classList.contains("public"))
        {
            classList.remove("public");
            classList.add("private");
            password.setAttribute("type","password");
        }
        else{
            privacy.classList.add("privacy");
            privacy.classList.add("private");
        }

    }

    privacy.addEventListener("click",togglePrivacy);

}

passwordPrivacy();

    
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


    form.addEventListener("submit",validateForm);

}

formValidation();

