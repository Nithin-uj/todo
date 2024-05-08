import React, { useState,useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Logo from './logo.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import Alert from './Alert';
import Alert from '@mui/material/Alert';

function Home() {

    const [isloggedin,setloggedin] = useState(false);
    const [email,setEmail] = useState("")

    useEffect(()=>{
        axios.get('http://localhost:8080/')
        .then(res => {
        //   console.log(res.data)
          if(res.data.Status === "Success"){
            //   console.log("logged in")
              setEmail(res.data.email)
               console.log(email);
               setloggedin(true);
          }
          else{
            // console.log("not logged in")
          }
        })
        .catch(err =>{
            console.log(err)
        })
      },[isloggedin]);
    
    axios.defaults.withCredentials = true;

    const [option,setOption] = useState(1);
    const [values,setValues] = useState({
        name : "",
        email : "",
        cpassword : "",
    })
    const [loginvalues,setloginValues] = useState({
        email : "",
        password : "",
    })

    const [valid,setValid] = useState({
        email : true,
        cpassword : true,
    })
    const [password,setPassword] = useState("")
    // const navigate = useNavigate();

    const [alertdata,setAlert] = useState({
        show : false,
        message : "",
        severity : "",
    })

    const [isemailvalid,setEmailvalid] = useState(true);

    const handelmail = (e)=>{
        const inputValue = e.target.value;
        setValues({...values,email:inputValue});
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValid({...valid,email:emailPattern.test(inputValue)});
    }

    const handelpassword = (e)=>{
        setPassword(e.target.value);
    }
    const handelname = (e)=>{
        setValues({...values,name:e.target.value});
    }
    const handelcpassword = (e)=>{
        setValues({...values,cpassword:e.target.value});
        if(password === e.target.value){
            setValid({...valid,cpassword:true});
        }
        else{
            setValid({...valid,cpassword:false});
        }
    }
    

    const handelsubmit = (e)=>{
        // console.log(values)
        e.preventDefault();
        axios.post("http://localhost:8080/signup",values)
        .then(res => {
            if(res.data.Status === "Success"){
                    setValues({
                        name : "",
                        email : "",
                        cpassword : "",
                    });
                    setPassword("");
                    setAlert({
                        show : true,
                        message : "Signup successful please login",
                        severity : "success",
                    })
                    // setAlert({...values,message:"Signup successful"})
                    setTimeout(()=>{
                        setOption(1);
                        setAlert({
                            show : false,
                            message : "",
                            severity : "none",
                        })
                    },3000)
                }
                else{
                  if(res.data.Message.code === "ER_DUP_ENTRY"){
                    setAlert({
                        show : true,
                        message : "Email already exist",
                        severity : "error",
                    })
                    setTimeout(()=>{
                        setAlert({
                            show : false,
                            message : "",
                            severity : "",
                        })
                    },3000)
                  }
                }
        })
        .catch(err => {
            // console.log(err);
            setAlert({
                show : true,
                message : "Server Error",
                severity : "warning",
            })
            setTimeout(()=>{
                setAlert({
                    show : false,
                    message : "",
                    severity : "",
                })
            },3000)
        }
        )
    }

    const handelloginemail = (e)=>{
        setloginValues({...loginvalues,email:e.target.value});
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailvalid(emailPattern.test(e.target.value))
    }
    const handelloginpass = (e)=>{
        setloginValues({...loginvalues,password:e.target.value});
    }
    const navigate = useNavigate();

    const handelloginsubmit = (e)=>{
        e.preventDefault();
        // console.log(loginvalues);
        axios.post("http://localhost:8080/login",loginvalues)
        .then(res => {
        //   console.log(res);
        if(res.data.Status === "Success"){
            // console.log("Loggedin")
            setloggedin(true);
          }
          else{
            // console.log(res);
            // alert(res.data.Error);
            setAlert({
                show : true,
                // message : "eooro",
                message : `${res.data.Error}`,
                severity : "error",
            })
            setTimeout(()=>{
                setAlert({
                    show : false,
                    message : "",
                    severity : "",
                })
            },3000)
          }
        })
        .catch(err => {
            console.log(err)
            setAlert({
                show : true,
                message : "Server Error",
                severity : "warning",
            })
            setTimeout(()=>{
                setAlert({
                    show : false,
                    message : "",
                    severity : "",
                })
            },3000)
        })
    }

    const renderoption = ()=>{
        switch(option){
            case 1 : 
                return <div>
                    <div className='card'>
                        <div className='card-header'>Sign in</div>
                        <div className='card-body'>
                         {alertdata.show ? <Alert severity={alertdata.severity}>{alertdata.message}</Alert> : <></> }
                        <div className='card-text'>
                            <div className='d-flex d-block d-sm-none d-md-none d-lg-none justify-content-center'>
                                <img src={Logo} className='w-50' style={{height:'max-content'}} alt='logo'/>
                            </div>
                            <form className='d-flex' onSubmit={handelloginsubmit}>
                                <div className='d-flex d-none d-sm-block justify-content-center'>
                                    <img src={Logo} className='w-75' style={{height:'max-content'}} alt='logo'/>
                                </div>
                                <Box textAlign="right">
                            <TextField 
                                type='email'
                                required
                                label={isemailvalid ? 'Email' : 'Invalid email'} 
                                color={isemailvalid ? 'primary' : 'error'}
                                value={loginvalues.email}
                                fullWidth
                                onChange={handelloginemail}
                                className='mt-3'/>
                            <TextField
                                label="Password"
                                required
                                type="password"
                                value={loginvalues.password}
                                fullWidth
                                onChange={handelloginpass}
                                className='mt-3'
                            />
                            <div>
                            <Button variant="contained" type='submit' className='mt-2' color='primary'>Sign in</Button>
                            </div>
                            </Box>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            case 2 : 
                return <div>
                    <div className='card mb-2'>
                        <div className='card-header'>Sign up</div>
                        <div className='card-body'>
                         {alertdata.show ? <Alert severity={alertdata.severity}>{alertdata.message}</Alert> : <></> }
                        <div className='card-text'>
                            <div className='d-flex d-block d-sm-none d-md-none d-lg-none justify-content-center'>
                                <img src={Logo} className='w-50' style={{height:'max-content'}} alt='logo'/>
                            </div>
                            <form className='d-flex' onSubmit={handelsubmit}>
                                <div className='d-flex d-none d-sm-block justify-content-center'>
                                    <img src={Logo} className='w-75' style={{height:'max-content'}} alt='logo'/>
                                </div>
                                <Box textAlign="right">
                            <TextField 
                                label="Name"
                                type='text'
                                required
                                value={values.name}
                                fullWidth
                                onChange={handelname}
                                className='mt-3'/>
                            <TextField 
                                label={valid.email ? 'Email' : 'Invalid email'} 
                                color={valid.email ? 'primary' : 'error'}
                                type='email'
                                required
                                value={values.email}
                                fullWidth
                                onChange={handelmail}
                                className='mt-3'/>
                            <TextField
                                label="Password"
                                required
                                type="password"
                                value={password}
                                fullWidth
                                onChange={handelpassword}
                                className='mt-3'
                            />
                            <TextField
                                label={valid.cpassword ? 'Repeat Password' : 'Password not matching'} 
                                color={values.cpassword === "" ? 'primary' :valid.cpassword ? 'success' : 'error'}
                                type="password"
                                onChange={handelcpassword}
                                value={values.cpassword}
                                fullWidth
                                required
                                className='mt-3'
                            />
                            <div>
                            <Button variant="contained" type='submit' className='mt-2' disabled={valid.email && valid.cpassword ? false : true} color='primary'>Sign up</Button>
                            </div>
                            </Box>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            default :
                setOption(1);
                return <></>
        }
    }

    const User = ()=>{
        return <>user data</>
    }

  return (
    <div className='d-flex flex-column' style={{height:'100vh'}}>
        <Header isloggedin={isloggedin}/>
        {isloggedin ? (<User/>) :
        (<div><div className="btn-toolbar d-flex justify-content-center m-2" role="toolbar" aria-label="Toolbar with button groups">
        <div className="btn-group btn-group-lg mr-2" role="group" aria-label="First group">
            <button type="button" className={option===1 ? 'btn btn-primary' : 'btn btn-outline-secondary'} onClick={()=>setOption(1)}>Sign in</button>
            <button type="button" className={option===2 ? 'btn btn-primary' : 'btn btn-outline-secondary'} onClick={()=>setOption(2)}>Sign up</button>
        </div>
        </div>
        <div className='container'>
            <div className="row d-flex justify-content-center">
                <div className="col col-sm-12 col-md-6 col-lg-6">
                    {renderoption()}
                </div>
            </div>
        </div>
        </div>)
    }
        <Footer/>
    </div>
  )
}

export default Home