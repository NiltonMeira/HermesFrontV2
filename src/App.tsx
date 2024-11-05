import { ReactNode } from 'react'
import { AppBar } from './components/appbar'

interface IAppProps {
  children:ReactNode
}


function App({children}: IAppProps) {

  return (
    <>
      <AppBar/>
      {children}
    </>
  )
}

export default App
