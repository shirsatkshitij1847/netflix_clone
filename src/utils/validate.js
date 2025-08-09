

const emailRegex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

export const checkValidateData=(email,pass)=>{

    if (emailRegex.test(email)) return "Email Id Is Not Valid !";

    if(passwordRegex.test(pass)) return "Password Is Not Valid !"
}

