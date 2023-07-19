import React, { Component } from 'react'
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import { signIn } from '../../constants/constants';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            auth: getAuth()
        }
    }

  render() {
    return (
      <Box sx={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 1, backgroundColor: 'grey', border: '1px black solid'}}>
        <h2> Sign In </h2>
        <TextField variant="outlined" placeholder='email' value={this.email} onChange={(e) => this.setState(() => {
            return {
                email: e.target.value
            }
        })} />
        <TextField variant="outlined" placeholder='password' type='password' value={this.password} onChange={(e) => this.setState(() => {
            return {
                password: e.target.value
            }
        })} />
        <Button variant='outlined'
        onClick={async() => {
            await signIn(this.state.auth, this.state.email, this.state.password)
            await  onAuthStateChanged(this.state.auth, (user) => {
                if(user) {
                    localStorage.setItem('user', JSON.stringify(user) )
                    console.log('aa')
                } else {
                    alert('no')
                }
            })
        }}> Sign In </Button>
      </Box>
    )
  }
}
