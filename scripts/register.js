/** 
 * it handles the privacy of the user`s password
 */
 const passwordPrivacy = () => {
    let privacy_1 = document.querySelector("#privacy1");
    let privacy_2 = document.querySelector("#privacy2");

    /** 
     * toggle password`s privacy
     *      
     * @params {object} e the event object
     * @return none
     * 
     */
    let togglePrivacy_1 = (e) => {
        let classList = e.target.classList;
        let password = e.target.parentNode.querySelector("#password1");
        
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
            privacy_1.classList.add("privacy");
            privacy_1.classList.add("private");
        }

    }

    /**
     * toggle password`s privacy
     *      
     * @params {object} e the event object
     * @return none
     * 
     */
    let togglePrivacy_2 = (e) => {
        let classList = e.target.classList;
        let password = e.target.parentNode.querySelector("#password2");
        
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
            privacy_2.classList.add("privacy");
            privacy_2.classList.add("private");
        }

    }

    privacy_1.addEventListener("click",togglePrivacy_1);
    privacy_2.addEventListener("click",togglePrivacy_2);

}

passwordPrivacy();

/** 
 * it handles the password confirmation
 */
const passwordConfirm = ()=> {
    let password = document.querySelector("#password1");
    let confirmPassword = document.querySelector("#password2");
    let email = document.querySelector("#email");
    let form = document.forms["register"];

    /** 
     * validate email
     *      
     * @params {object} e the event object
     * @return none
     * 
     */
     const validateEmail = (e) => {
         
        let validate = String(email.value)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

        if(!validate){
            email.style.border = "2px solid red";
            email.style.borderRadius = "5px";
            if(e.type == "submit"){
                email.focus();
            }
            e.preventDefault();
        }
        else{
            email.style.border = "1px solid #777777b2";
        }
            
    };

    /** 
     * confirm password
     *      
     * @params {object} e the event object
     * @return none
     * 
     */
    let confirm = (e) => {
        
        if(password.value != confirmPassword.value)
        {
            confirmPassword.style.border = "2px solid red";
            confirmPassword.style.borderRadius = "5px";
            if(e.type == "submit"){
                confirmPassword.focus();
            }
            e.preventDefault();
        }
        else{
            confirmPassword.style.border = "1px solid #777777b2";
        }
    }

    /** 
     * validate password
     *      
     * @params {object} e the event object
     * @return none
     * 
     */
     let validatePassword = (e) => {
        
        if(password.value == "")
        {
            password.style.border = "2px solid red";
            password.style.borderRadius = "5px";
            password.focus();
            e.preventDefault();
        }else if(password.value.length < 8){
            password.style.border = "2px solid red";
            password.style.borderRadius = "5px";
            password.focus();
            e.preventDefault();
        }
        else if(password.value.length > 20){
            password.style.border = "2px solid red";
            password.style.borderRadius = "5px";
            password.focus();
            e.preventDefault();
        }
        else{
            confirmPassword.style.border = "1px solid #777777b2";
        }
    }


    /** 
     * validate form
     *      
     * @params {object} e the event object
     * @return none
     * 
     */
     let validateForm = (e) => {
        confirm(e);
        validateEmail(e);
        validatePassword(e);
    }

    form.addEventListener("submit",validateForm);
    password.addEventListener("input",confirm);
    confirmPassword.addEventListener("input",confirm);
    email.addEventListener("input",validateEmail);

}

passwordConfirm();