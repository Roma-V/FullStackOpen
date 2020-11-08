import React from 'react';

const Course = ({ course }) => {
    return (
      <div>
        <Header courseName={course.name} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
}
const Header = ({ courseName }) => {
    return (
      <h2>{courseName}</h2>
    )
}
const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map((part) => <Part key={part.id} part={part} />)}
        </div>
    )
}
const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>    
    )
}

const Total = ({ course }) => {
    const sum = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <p>Total of {sum} exercises</p>
    ) 
}

export default Course