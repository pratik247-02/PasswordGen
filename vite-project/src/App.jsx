import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(0)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charallowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordGenerator = useCallback(() => {
    let myPassword = ''
    let allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(numAllowed) allowedChars += '0123456789'
    if(charallowed) allowedChars += '!@#$%^&*+'

    for (let i = 0; i < length; i++) {
      myPassword += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length))
    }
    setPassword(myPassword)
  }, [length, numAllowed, charallowed])

useEffect(() => {
  passwordGenerator()
}, [length, charallowed, numAllowed, passwordGenerator])



const passwordRef = useRef(null)
const copytoClip = useCallback(() => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, length)
  window.navigator.clipboard.writeText(password)
}, [password])

  return (
    <>
    <h1 className='text-black text-4xl m-3 p-4'>PassWord Generator</h1>
    <div className='w-full flex justify-center items-center bg-gray-400'>
      
        <div className='w-full m-5 rounded-lg'>
            <input
                type='text'
                placeholder='Noob... You cant even make a Password'
                value={password}   
                ref={passwordRef}   
                readOnly
                className='w-1/3 p-2 border-3 border-gray-900 rounded-lg bg-white outline-none'    
            />
            <button 
                className='m-2 p-2 border-1 border-gray-900 bg-blue-500 text-white rounded-xl
                hover:bg-blue-600 active:scale-90 transition-all duration-200 ease-in-out'
                onClick={copytoClip}
                
                >COPY
            </button>
            <button 
                className='m-2 p-2 border-1 border-gray-900 bg-blue-500 text-white rounded-lg
                hover:bg-blue-600 active:scale-90 transition-all duration-200 ease-in-out'
                onClick={copytoClip}
                
                >ReGenerate
            </button>
        </div>
    </div>
    <div className='w-full flex justify-center bg-gray-400 p-5'>
          <div>
          <input
          type='range'
          min={6} max={20} value={length}
          className='cursor-pointer'
          onChange={(e) => setLength(e.target.value)}
          />
          <label className='m-2 text-2xl font-serif'>Password Length: {length}</label>
          </div>
          <div className='ml-2'>
          <input
          type='checkbox'
          className='cursor-pointer'
          onChange={(e) => setNumAllowed((prev) => !prev)}
          />
          <label className='text-2xl font-serif'>Include Numbers</label>
          </div>
          <div className='ml-2'>
          <input
          type='checkbox'
          className='cursor-pointer'
          onChange={(e) => setCharAllowed((prev) => !prev)}
          />
          <label className='text-2xl font-serif'>Include Special Characters</label>
          </div>
    </div>
    </>
  )
}

export default App
