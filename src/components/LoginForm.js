import { useState } from 'react';
import './LoginForm.css';
import { signInWithEmailAndPassWD, signInWithGoogle } from '../utils/firebase';
import { useNavigate } from "react-router-dom";

const Form = () => {   
    let navigate = useNavigate(); 
    const [inputs, setinputs] = useState({
        email: "",
        password: ""
    });
    
    const [warnemail, setwarnemail] = useState(false);
    const [warnpass, setwarnpass] = useState(false);
    const [danger, setdanger] = useState(true);
    
    const [eye, seteye] = useState(true);
    const [pass, setpass] = useState("password");
    
    
    const inputEvent = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === "email") {
            if (value.length > 0) {
                setdanger(true);
            }
        }
        setinputs((lastValue) => {
            return {
                ...lastValue,
                [name]: value
            }
        });
    };

    const validateEmail = (email) => {
        return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    
    const submitForm = (e) => {
        e.preventDefault();
        setwarnemail(false);
        setwarnpass(false);
        if (inputs.password === "") {
            setwarnpass(true);
        }
        if (inputs.email === "") {
            setwarnemail(true);
        } else if (!validateEmail(inputs.email)) {
            setwarnemail(true);
            setdanger(false);
        } else {
            signInWithEmailAndPassWD(inputs, navigate);
        }
    };

    const Eye = () => {
        if (pass === "password") {
            setpass("text");
            seteye(false);
        } else {
            setpass("password");
            seteye(true);
        }
    };

    return(
        <>
            <div className="container-login">
                <div className="card-login">
                    <div className="form-login">
                        <div className="left-side">
                            <img src="https://i.pinimg.com/originals/ec/44/43/ec444365208e7c8695734dec1ae6abb7.jpg" alt="Oranges on trees"/>
                        </div>
    
                        <div className="right-side">
                            {/* <div className="register">
                                <p>Not a member? <a href="#">Register Now</a></p>
                            </div> */}

                            <div className="logo-login">
                                <object data="Logo1.svg" width="240" height="125" text-align="center" aria-label="Logo"></object>
                            </div>

                            <form onSubmit={submitForm}>
    
                                <div className="input_text" >
                                    <input data-cy="email" className={` ${warnemail ? "warning" : "" }`} type="text" pattern="[^\s]+" placeholder="Enter Email" name="email" value={inputs.email} onChange={inputEvent} />
                                    <p data-cy="emailwarn"className={` ${danger ? "danger" : "" }`} ><i className="fa fa-warning"></i>Please enter a valid email address.</p>
                                </div>
                                <div className="input_text">
                                    <input data-cy="password" className={` ${warnpass ? "warning" : "" }`} type={pass} placeholder="Enter Password" name="password" value={inputs.password} onChange={inputEvent} />
                                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`}></i>
                                </div>
                                <div className="recovery">
                                    <p>Forget Password</p>
                                </div>
                                <div className="btn-login">
                                    <button data-cy="signinbutton" type="submit">Sign in</button>
                                </div>

                            </form>
                            <hr />
                            <div className="boxes-login">
                                <span onClick={() => signInWithGoogle(navigate)}><img src="https://imgur.com/XnY9cKl.png" alt="Google Logo" /></span>
                                {/* <span><img src="https://imgur.com/ODlSChL.png" /></span>
                                <span><img src="https://imgur.com/mPBRdQt.png" /></span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Form;