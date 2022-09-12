import React from 'react'
import {Container} from "react-bootstrap"
const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=04e83d189cf246af828900b68bfa5251&response_type=code&redirect_uri=https://thunderous-gelato-ead3d7.netlify.app&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return (
    
        <Container className='d-flex justify-content-center align-items-center' style={{position: "absolute" , minHeight: "100vh", zIndex: '1', backgroundColor: "rgba(0,0,0,0.1)", left: "50%", transform: "translate(-50%)"}}>
            <a className='btn btn-success btn-lg' href={AUTH_URL}>Login with Spotify</a>
        </Container>
    
  )
}