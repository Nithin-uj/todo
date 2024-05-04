import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Logo from './logo.png'

function Home() {

    const [option,setOption] = useState(4);

    const renderoption = ()=>{
        switch(option){
            case 1 : 
                return <div>
                    <div className='card'>
                        <div className='card-header'>Sign in</div>
                        <div className='card-body'>
                        <div className='card-text'>
                            form1
                        </div>
                        </div>
                    </div>
                </div>
            case 2 : 
                return <div>
                    <div className='card'>
                        <div className='card-header'>Sign up</div>
                        <div className='card-body'>
                        <div className='card-text'>
                            <form className='d-flex'>
                                <div className='d-flex justify-content-center'>
                                    <img src={Logo} className='w-75' style={{height:'max-content'}} alt='logo'/>
                                </div>
                                <Box textAlign="right">
                            <TextField 
                                label="Email" 
                                type='email' 
                                className='mt-3'/>
                            <TextField
                                label="Password"
                                type="password"
                                className='mt-3'
                            />
                            <TextField
                                label="Repeat Password"
                                type="password"
                                className='mt-3'
                            />
                            <div>
                            <Button variant="contained" className='mt-2' color='primary'>Sign up</Button>
                            </div>
                            </Box>
                                {/* <TextField label="Filled success" color="success" focused placeholder='Filled success'/> */}
                                {/* <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="Enter Email"/>
                                </div>
                                <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" placeholder="Enter Password"/>
                                </div>
                                <div class="mb-3">
                                <label for="cpassword" class="form-label">Confirm Password</label>
                                <input type="password" class="form-control" id="cpassword" placeholder="Repeat Password"/>
                                </div>
                                <input type='submit' className='btn btn-success' value="Sign up"/> */}
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

  return (
    <div className='d-flex flex-column' style={{height:'100vh'}}>
        <Header/>
        <div className="btn-toolbar d-flex justify-content-center m-2" role="toolbar" aria-label="Toolbar with button groups">
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
        <Footer/>
    </div>
  )
}

export default Home