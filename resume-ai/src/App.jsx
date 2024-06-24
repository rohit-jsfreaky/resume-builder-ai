import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/Header'
import { Toaster } from "@/components/ui/sonner"

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();

  const {user , isLoaded , isSignedIn} = useUser();

  if(!isSignedIn && isLoaded){
    return navigate("/auth/sign-in")
  }

  return (
    <>
    <Header/>
    <Outlet/>
     <Toaster />
    </>
  )
}

export default App
