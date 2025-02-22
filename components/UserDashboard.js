import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import TodoCard from './TodoCard'
import { doc, setDoc, deleteField } from 'firebase/firestore'
import { db } from '../firebase'
import useFetchTodos from '../hooks/fetchTodos'
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export default function UserDashboard() {
    const { userInfo, currentUser } = useAuth()
    const [edit, setEdit] = useState(null)
    const [todo, setTodo] = useState('')
    const [edittedValue, setEdittedValue] = useState('')

    const { todos, setTodos, loading, error } = useFetchTodos()



    console.log(todos)

    function handleAddEdit(todoKey) {
        return () => {
            setEdit(todoKey)
            setEdittedValue(todos[todoKey])
        }
    }

    async function handleAddTodo() {
        if (!todo) { return }
        const newKey = Object.keys(todos).length === 0 ? 1 : Math.max(...Object.keys(todos)) + 1
        const updatedTodos = { ...todos, [newKey]: todo }
        setTodos(updatedTodos)
        const userRef = doc(db, 'users', currentUser.uid)
        await setDoc(userRef, {
            todos: updatedTodos
        }, { merge: true })
        setTodo('')
    }

    async function handleEditTodo() {
        if (!edittedValue) { return }
        const newKey = edit
        const updatedTodos = { ...todos, [newKey]: edittedValue }
        setTodos(updatedTodos)
        const userRef = doc(db, 'users', currentUser.uid)
        await setDoc(userRef, {
            todos: updatedTodos
        }, { merge: true })
        setEdit(null)
        setEdittedValue('')
    }

    async function handleDelete(todoKey) {
        return async () => {
            const tempObj = { ...todos }
            delete tempObj[todoKey]
            setTodos(tempObj)
            const userRef = doc(db, 'users', currentUser.uid)
            await setDoc(userRef, {
                todos: tempObj
            }, { merge: true })
        }
    }

    return (
        <div className='container mx-auto py-6 max-w-2xl'>
            <Card className='p-6 bg-white shadow-sm'>
                <div className='flex gap-2'>
                    <Input 
                        type='text' 
                        placeholder="Add a new todo" 
                        value={todo} 
                        onChange={(e) => setTodo(e.target.value)}
                        className="flex-1"
                    />
                    <Button onClick={handleAddTodo} variant="default">
                        Add
                    </Button>
                </div>
                {loading && (
                    <div className='flex justify-center items-center py-8'>
                        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
                    </div>
                )}
                {!loading && (
                    <div className='mt-6 space-y-4'>
                        {Object.keys(todos).map((todo, i) => (
                            <TodoCard 
                                key={i}
                                handleEditTodo={handleEditTodo}
                                handleAddEdit={handleAddEdit}
                                edit={edit}
                                todoKey={todo}
                                edittedValue={edittedValue}
                                setEdittedValue={setEdittedValue}
                                handleDelete={handleDelete}
                            >
                                {todos[todo]}
                            </TodoCard>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    )
}
