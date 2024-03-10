import { useCallback, useState, useEffect } from 'react';
import './App.css';
function App() {
  const [length, setLength] = useState(8);
  const [isNum, setIsNum] = useState(false); // Checkbox state for numbers
  const [isSpecial, setIsSpecial] = useState(false); // Checkbox state for special characters
  const [password, setPassword] = useState('');
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (isNum) {
      str += '0123456789';
    }
    if (isSpecial) {
      str += '~!@#$%^&*()_+-=[]{}|;:\'\",./?'; // Add special characters
    }
    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, isNum, isSpecial]);
  useEffect(() => {
    passwordGenerator();
  }, [length, isNum, isSpecial]); // Call passwordGenerator only on dependency changes
  const copyPassword = () => {
    // Access clipboard using navigator.clipboard directly (modern browsers)
      navigator.clipboard.writeText(password);
    // Select the password input after copying
    const passwordInput = document.getElementById('passwordInput');
    passwordInput.select();
  };
  return (
    <>
<div className="container mx-auto py-8">
  <h1 className="text-3xl font-bold mb-6">Password Generator</h1>
  <div className="mb-8">
    <input
      type="text"
      value={password}
      readOnly
      placeholder="Generated Password"
      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400 transition duration-300"
      id="passwordInput"
    />
    <button
      className="mt-2 px-6 py-3 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600 transition duration-300"
      onClick={copyPassword}
    >
      Copy Password
    </button>
  </div>
  <div className="mb-8">
    <div className="flex items-center mb-4">
      <input
        type="range"
        className="cursor-pointer w-full"
        onChange={(e) => setLength(e.target.value)}
        name="lengthInput"
        min={6}
        max={100}
      />
      <label htmlFor="length" className="ml-4 text-sm">Length: {length}</label>
    </div>
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        name="numbers"
        id="numbers"
        checked={isNum}
        onChange={() => setIsNum((prev) => !prev)}
        className="mr-2 cursor-pointer appearance-none w-5 h-5 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none transition duration-300"
      />
      <label htmlFor="numbers" className="cursor-pointer select-none text-sm">Include Numbers</label>
    </div>
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        name="characters"
        id="characters"
        checked={isSpecial}
        onChange={() => setIsSpecial((prev) => !prev)}
        className="mr-2 cursor-pointer appearance-none w-5 h-5 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none transition duration-300"
      />
      <label htmlFor="characters" className="cursor-pointer select-none text-sm">Include Special Characters</label>
    </div>
  </div>
</div>
    </>
  );
}
export default App;
