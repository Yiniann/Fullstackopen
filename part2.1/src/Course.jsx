import React from 'react'
const Part=({part}) =>{
    return (
        <li>
            {part.name} {part.exercises}
        </li>
    )
}

const Content =({part}) => {
    return (
        <ul>
            {part.map((part)=>(
                <part key={part.id} part ={part} />
            ))}
        </ul>
    )
}

const Course = ({course}) =>{
    const total =course.parts.reduce((sum,current)=> sum + current.exercises,0)    
    return (
        <div>
        <h2>{course.name}</h2>
        <ul>
            {course.parts.map((part)=>(<li key ={part.id}>{part.name} {part.exercises} </li>))}
        </ul>
        <p><strong>Total of {total} exercises</strong></p>
        </div>
    )
}

export default Course