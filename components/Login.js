import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoggingIn, setIsLoggingIn] = useState(true)

    const { login, signup, currentUser } = useAuth()
    console.log(currentUser)

    async function submitHandler() {
        if (!email || !password) {
            setError('Please enter email and password')
            return
        }
        if (isLoggingIn) {
            try {
                await login(email, password)
            } catch (err) {
                setError('Incorrect email or password')
            }
            return
        }
        await signup(email, password)
    }

    return (
        <div className='flex-1 flex justify-center items-center px-4'>
            <Card className='w-full max-w-md'>
                <CardHeader>
                    <CardTitle>{isLoggingIn ? 'Login' : 'Register'}</CardTitle>
                    <CardDescription>Enter your credentials to {isLoggingIn ? 'login to' : 'create'} your account</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-100 rounded-md">
                            {error}
                        </div>
                    )}
                    <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='password'>Password</Label>
                        <Input
                            id='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter your password'
                        />
                    </div>
                </CardContent>
                <CardFooter className='flex flex-col gap-4'>
                    <Button
                        className='w-full'
                        onClick={submitHandler}
                    >
                        {isLoggingIn ? 'Login' : 'Register'}
                    </Button>
                    <Button
                        variant='ghost'
                        className='w-full'
                        onClick={() => setIsLoggingIn(!isLoggingIn)}
                    >
                        {isLoggingIn ? 'Need an account? Register' : 'Already have an account? Login'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
