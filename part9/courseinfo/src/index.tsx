/**
 * @file Frontend app showing course information
 * @author Roman Vasilyev
 */

import React from "react";
import ReactDOM from "react-dom";

/*
 * Types
 */
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescribed extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartDescribed {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDescribed {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartDescribed {
  name: "Deepest type usage";
  hoursSpent: number;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

//Helper function for exhaustive type checking
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

/*
 * Componenta
 */
// Main app component
const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Deepest type usage",
      exerciseCount: 1,
      description: "A custom type practice",
      hoursSpent: 1
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total count={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

// Page header
const Header: React.FC<{ name: string }> = ({ name }) => (
  <h1>{name}</h1>
);

// Iteration over contents
const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => (
  <div>
    {parts.map(part => (
      <Part key={part.name} part={part} />
    ))}
  </div>
);

// render of a single course part
const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
      <p>
        <PartCommon name={part.name} exerciseCount={part.exerciseCount} />
        <PartDescription description={part.description} />
      </p>)
    case "Using props to pass data":
      return (
      <p>
        <PartCommon name={part.name} exerciseCount={part.exerciseCount} />
        {"Group projects: "}{part.groupProjectCount}
      </p>)
    case "Deeper type usage":
      return (
      <p>
        <PartCommon name={part.name} exerciseCount={part.exerciseCount} />
        <PartDescription description={part.description} />
        <a href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</a>
      </p>)
    case "Deepest type usage":
      return (
      <p>
        <PartCommon name={part.name} exerciseCount={part.exerciseCount} />
        <PartDescription description={part.description} />
        {"Hours spent on exercise: "}{part.hoursSpent}
      </p>)
    default:
      return assertNever(part);
  }
};

// render a course part name and exercise count
const PartCommon: React.FC<{ name: string, exerciseCount: number }> = ({ name, exerciseCount }) => (
  <div>
    {name} {exerciseCount}
  </div>
);

// render a course part description
const PartDescription: React.FC<{ description: string }> = ({ description }) => (
  <div>
    {description}
  </div>
);

// Page footer showing total number of exercises
const Total: React.FC<{ count: number }> = ({ count })=> (
  <p>
    Number of exercises {count}
  </p>
);

/*
 * Render
 */
ReactDOM.render(<App />, document.getElementById("root"));