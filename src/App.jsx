import { useState } from 'react'
import Translate from './components/TranslateArea'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="appWrapper">
        <Translate /> 
      </div>
    </>
  )
}

export default App
