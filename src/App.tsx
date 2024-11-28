import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

interface IAppProps {
  children:ReactNode
}


function App({children}: IAppProps) {

  return (
    <>
      <ToastContainer/>
      {children}
    </>
  )
}

export default App
