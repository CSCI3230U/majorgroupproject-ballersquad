// Home page for app
import { useRef, useState, useContext } from "react";
import { makeStyles, } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { UserContext } from "../userContext";

export const Register = ({open, onClose}) =>{   
    const userRef = useRef('');
    const passRef = useRef('');
    const confirmPassRef = useRef('');
    const emailRef = useRef('');
    const {userInfo, setUserInfo} = useContext(UserContext);
    const [error, setError] = useState("");
    
    // Regex reference: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const formSubmit = () => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(userRef.current.value !== "" && passRef.current.value !== "" && emailRef.current.value !== ""){
            if(passRef.current.value === confirmPassRef.current.value){
                if(re.test(emailRef.current.value)){
                fetch(`http://localhost:3000/getUsers?username=${userRef.current.value}`)
                .then((res) => res.json())
                .then((res) => {
                    console.log(res.length);
                    if(res.length !== 0){
                        setError("There is already a user with this username.");
                    }else{
                        fetch(`http://localhost:3000/registerUser`,{
                        method: 'post',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                            body:JSON.stringify({userName: userRef.current.value, email: emailRef.current.value, passwd: passRef.current.value})
                    }).then((res) => res.json())
                    .then(res =>{
                        console.log(res.userName);
                        const data = {userName: res.userName, isLoggedIn: true};
                        setUserInfo(data);
                        setError("");
                        onClose();
                    });
                    }
                });
            }else{
                setError("Your email does not have the right format");
            }
            }else{
                setError("Your passwords do not match");
            }
        }else {
            setError("You have to input a username, password and email");
        }
    }

    const closeForm = () => {
        setError("");
        onClose();
    }

    const useStyles = makeStyles(theme => ({
        input: {
            color: "white",

        },
        floatingLabelFocusStyle:{ 
            color: "white",
            "&.Mui-focused": {
                color: "white"
            }

        },focusedLabel:{},
        inputBackground: {
            label: "white"
        },
        customizedButton: {
          position: 'absolute',
          left: '85%',
          top: '5%',
          color: 'red'
        },
        submitButton: {
            position: 'absolute',
            left: '5%',
            bottom: '4%',
            backgroundColor: '#7e57c2',
            color: 'black',
            "&:hover":{
                backgroundColor: '#583c87'
            }
          }
      }));
      const classes = useStyles();

    return (
        <div>
        <Dialog 
        aria-labelledby="form-dialog-title" 
        open={open} 
        disableBackdropClick>
            <div className={` justify-center bg-simple-gray-41 text-white`}>
            {/* Reference for the svg: https://www.tailwindtoolbox.com/components/modal */}
            <div class="absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
                <svg onClick={closeForm} class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
            </div>
            <DialogTitle id="form-dialog-title center">Registration Form</DialogTitle>
            <DialogContent>
            <TextField
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                inputRef={emailRef}
                InputLabelProps={{
                    classes:{ 
                        root: classes.floatingLabelFocusStyle,
                        focused: classes.focusedLabel
                    }
                }}
                InputProps={{
                    className: classes.input
                }}
                fullWidth
            />
            <TextField
                margin="dense"
                id="user"
                label="Username"
                inputRef={userRef}
                InputLabelProps={{
                    classes:{ 
                        root: classes.floatingLabelFocusStyle,
                        focused: classes.focusedLabel
                    }
                }}
                InputProps={{
                    className: classes.input
                }}
                fullWidth
            />
            <TextField
                margin="dense"
                id="pass"
                label="Password"
                type="password"
                inputRef={passRef}
                InputLabelProps={{
                    classes:{ 
                        root: classes.floatingLabelFocusStyle,
                        focused: classes.focusedLabel
                    }
                }}
                InputProps={{
                    className: classes.input
                }}
                fullWidth
            />
            <TextField
                margin="dense"
                id="confirmpass"
                label="Confirm Password"
                type="password"
                inputRef={confirmPassRef}
                InputLabelProps={{
                    classes:{ 
                        root: classes.floatingLabelFocusStyle,
                        focused: classes.focusedLabel
                    }
                }}
                InputProps={{
                    className: classes.input
                }}
                fullWidth
            />
            <div className={`text-red-500`}>{error}</div>
            </DialogContent>
            <DialogActions>
            <button onClick={formSubmit} className={`bg-purple-500 inset-x-0 bottom-0 rounded p-2 w-full h-12 text-lg hover:bg-purple-600 transition duration-300`} type="submit">
                Register
            </button>
            </DialogActions>
            </div>
    </Dialog>
    </div>
    );
};
