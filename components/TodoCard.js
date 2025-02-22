import React from 'react'
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Pencil, Trash2, Check } from 'lucide-react'

export default function TodoCard({ children, edit, handleAddEdit, todoKey, edittedValue, setEdittedValue, handleEditTodo, handleDelete }) {
    return (
        <Card className='p-4 flex items-center justify-between gap-4 bg-white'>
            <div className='flex-1'>
                {!(edit === todoKey) ? (
                    <p className='text-sm text-gray-700'>{children}</p>
                ) : (
                    <Input
                        value={edittedValue}
                        onChange={(e) => setEdittedValue(e.target.value)}
                        className='text-sm'
                    />
                )}
            </div>
            <div className='flex items-center gap-2'>
                {(edit === todoKey) ? (
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={handleEditTodo}
                    >
                        <Check className='h-4 w-4' />
                    </Button>
                ) : (
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={handleAddEdit(todoKey)}
                    >
                        <Pencil className='h-4 w-4' />
                    </Button>
                )}
                <Button
                    variant='ghost'
                    size='icon'
                    onClick={handleDelete(todoKey)}
                >
                    <Trash2 className='h-4 w-4 text-red-500' />
                </Button>
            </div>
        </Card>
    )
}
