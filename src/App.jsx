import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(4)
  const [password, setPassword] = useState('')
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const passwordRef = useRef(null);
  const generatePassword = useCallback(() => {
    let characters = 'abcdefghijklmnopqrstuvwxyz'
    if (uppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let password = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      password += characters[randomIndex]
    }
    setPassword(password)
  }, [length, uppercase, lowercase])

  useEffect(() => {
    generatePassword()
  }, [generatePassword])

  const copyHandler = () => {
    passwordRef.current.select()
    document.execCommand('copy')
  }
  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={() => {
            passwordRef.current.select();
            document.execCommand('copy');
          }}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onChange={copyHandler}
        >copy</button>
      </div>

      <div className="flex items-center mb-4">
        <label htmlFor="length" className="mr-2">Length</label>
        <input
          type="range"
          id="length"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className=""
        />
        <span className="ml-2">{length}</span>
        <input type='checkbox' id='uppercase' className='ml-4' value={uppercase} onChange={(e) => setUppercase(!uppercase)} />
        <label htmlFor='uppercase' className='mr-2'>Uppercase</label>
        <input type='checkbox' id='lowercase' className='ml-4' onChange={() => setLowercase((prev) => !prev)} />
        <label htmlFor='lowercase' className='mr-2'>Lowercase</label>
      </div>
    </div>
  )
}

export default App
