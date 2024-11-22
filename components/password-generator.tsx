'use client'

import { Card } from './ui/card'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { useState, ChangeEvent } from 'react'
import React from 'react'
import { CheckedState } from '@radix-ui/react-checkbox'

const PasswordGeneratorPage = () => {
    // states
    const [length, setLength] = useState<number>(16)
    const [password, setPassword] = useState<string>('')
    const [includeUpperCase, setIncludeUpperCase] = useState<boolean>(true)
    const [includeLowerCase, setIncludeLowerCase] = useState<boolean>(true)
    const [includeSymbols, setIncludeSymbols] = useState<boolean>(true)
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(true)



    //methods

    const handleLength = (e: ChangeEvent<HTMLInputElement>): void => {
        setLength(Number(e.target.value))
    }
    const handleCheckBox = (setter: (value: boolean) => void) => (checked: CheckedState): void =>{
        if (typeof checked == "boolean" ) {
          setter(checked)
        }
    }

    // main function to password generating

    const generatePassword = (): void => {
      const upperCaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowerCaseChar = "abcdefghijklmnopqrstuvwxyz"
      const numberChar = "1234567890"
      const symbolChar = "!@#$%^&*()_+[]{}|;:,.<>?"

      let allChar = ""
      if (includeUpperCase) {
         allChar += upperCaseChar
        }
        if (includeLowerCase) {
          allChar += lowerCaseChar
        }
        if (includeNumbers) {
          allChar += numberChar
        }
        if (includeSymbols) {
          allChar += symbolChar
        }
        if (allChar === "") {
          alert("please select atleast one character")
          return;
        }

        let generatePassword = ""
        for (let index = 0; index < length; index++) {
          const randomIndex = Math.floor(Math.random() * allChar.length)
          generatePassword += allChar[randomIndex]
          
        }
        setPassword(generatePassword)
        
      }
      
              const copied = (): void => {
                navigator.clipboard.writeText(password).then(() => {
                  alert("password copied to your clipboard..")
                }
              )
            }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 dark:bg-gray-900">
        <Card className="w-full max-w-lg p-8 bg-white dark:bg-gray-800 shadow-2xl rounded-xl">
          <div className="mx-auto max-w-md space-y-8">
            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
                Password Generator
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Create a secure password with just a few clicks.
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="length" className="text-gray-700 dark:text-gray-300">
                  Password Length
                </Label>
                <Input
                  id="length"
                  type="number"
                  min="8"
                  max="32"
                  value={length}
                  onChange={handleLength}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">Include:</Label>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="uppercase"
                    checked={includeUpperCase}
                    onCheckedChange={handleCheckBox(setIncludeUpperCase)}
                  />
                  <Label htmlFor="uppercase" className="text-gray-700 dark:text-gray-300">
                    Uppercase Letters
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="lowercase"
                    checked={includeLowerCase}
                    onCheckedChange={handleCheckBox(setIncludeLowerCase)}
                  />
                  <Label htmlFor="lowercase" className="text-gray-700 dark:text-gray-300">
                    Lowercase Letters
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="numbers"
                    checked={includeNumbers}
                    onCheckedChange={handleCheckBox(setIncludeNumbers)}
                  />
                  <Label htmlFor="numbers" className="text-gray-700 dark:text-gray-300">
                    Numbers
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="symbols"
                    checked={includeSymbols}
                    onCheckedChange={handleCheckBox(setIncludeSymbols)}
                  />
                  <Label htmlFor="symbols" className="text-gray-700 dark:text-gray-300">
                    Symbols
                  </Label>
                </div>
              </div>
              <Button
                type="button"
                className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                onClick={generatePassword}
              >
                Generate Password
              </Button>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                  Generated Password
                </Label>
                <div className="flex items-center space-x-3">
                  <Input
                    id="password"
                    type="text"
                    value={password}
                    readOnly
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <Button
                    type="button"
                    className="p-3 text-white bg-green-600 rounded-lg hover:bg-green-700"
                    onClick={copied}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
    
}

export default PasswordGeneratorPage