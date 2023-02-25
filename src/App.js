import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import allData from "./data";
import IntroText from "./components/IntroText";
import Chart from './components/Chart';
import Input from "./components/Input";
import StudentRoutes from "./components/StudentRoutes";

import "./style.css"

const App = () => {

    // define state of checkboxes
    const [isDataShown, setIsDataShown] = useState(
        {
            Evelyn: true,
            Aranka: true,
            Floris: true,
            Hector: true,
            Martina: true,
            Maurits: true,
            Rahima: true,
            Sandra: true,
            Wietske: true,
            Storm: true,
        }
    );

    // define state of radio button
    const [chartType, setChartType] = useState({ chartStyle: "chart-bar-style" });

    // define state of toggle-buttons
    const [isFunShown, setIsFunShown] = useState(true);
    const [isDifficultyShown, setIsDifficultyShown] = useState(true);

    // define all students
    const students = allData.map(data => data.firstName);
    const removeDuplicateStudents = students => students.filter((item, index) => students.indexOf(item) === index)
    const allStudents = removeDuplicateStudents(students);

    // define actions after clicking buttons
    const handleClickFun = () => setIsFunShown(prevIsFunShown => !prevIsFunShown);
    const handleClickDifficulty = () => setIsDifficultyShown(prevIsDifficultyShown => !prevIsDifficultyShown);

    // define state of selected students
    const [selectedStudents, setSelectedStudents] = useState(allStudents);

    // define actions after (de)selecting checkbox
    const handleCheckboxChange = event => {
        const selectedStudent = event.target.name;
        selectedStudents.includes(selectedStudent) ?
            setSelectedStudents(selectedStudents.filter(student => student !== selectedStudent)) :
            setSelectedStudents(prev => [...prev, selectedStudent])
        const { name, checked } = event.target
        setIsDataShown(prevIsStudentShown => {
            return {
                ...prevIsStudentShown,
                [name]: checked,
            }
        })
    };

    // define actions after selecting radio button
    const handleChartChange = event => {
        const { name, value, } = event.target
        setChartType(prevIsChartShown => {
            return {
                ...prevIsChartShown,
                [name]: value
            }
        })
    };

    // define some numbers to count with
    const numberOfStudents = selectedStudents.length; // = <= 10
    const numberOfAssignments = allData.filter(data => data.firstName === allData[0].firstName).length; // = 56

    // define fun rate, filtered by the number of students (all, or some)
    const averageFunRatePerAssignment = n => {
        const average = allData
            .filter(({ firstName }) => selectedStudents.includes(firstName))
            .filter(data => data.projectCode === allData[n].projectCode)
            .map(data => +data.funRate) // the "+" converts the string-value into a number-value
            .reduce((prev, current) => prev + current) / numberOfStudents;
        return average;
    };

    // define difficulty rate, filtered by the number of students (all, or some)
    const averageDifficultyRatePerAssignment = n => {
        const average = allData
            .filter(({ firstName }) => selectedStudents.includes(firstName))
            .filter(data => data.projectCode === allData[n].projectCode)
            .map(data => +data.difficultyRate)
            .reduce((prev, current) => prev + current) / numberOfStudents;
        return average;
    };

    // push all fun and difficulty rates in 1 array of objects
    let allRates = [];

    for (let x = 0; x < numberOfAssignments; x++) {
        allRates.push({
            projectCode: allData[x].projectCode,
            funRate: averageFunRatePerAssignment(x),
            difficultyRate: averageDifficultyRatePerAssignment(x)
        });
    }

    // NEW: define all data for routing
    const [chosenStudent, setChosenStudent] = useState("");

    const chosen = Object.values(chosenStudent).toString();

    const studentFunData = allData
        .filter(studentName => studentName.firstName === chosen)
        .map(data => +data.funRate);

    const studentDiffData = allData
        .filter(studentName => studentName.firstName === chosen)
        .map(data => +data.difficultyRate);

    const handleStudentChange = event => {
        const chosenStud = event.target.href.slice(22);
        setChosenStudent(prevChosenStudent => {
            return {
                ...prevChosenStudent, chosenStud
            }
        })
    };

    let ratesForOneStudent = [];

    for (let x = 0; x < numberOfAssignments; x++) {
        ratesForOneStudent.push({
            projectCode: allData[x].projectCode,
            funRate: studentFunData[x],
            difficultyRate: studentDiffData[x]
        });
    }

    return (
        <div>
            <IntroText />
            <Routes>
                <Route
                    path="/"
                    element={<Chart
                        allRates={allRates}
                        chartType={chartType}
                        isFunShown={isFunShown}
                        isDifficultyShown={isDifficultyShown}
                    />} />
                <Route
                    path="/:name"
                    element={<Chart
                        allRates={ratesForOneStudent}
                        chartType={chartType}
                        isFunShown={isFunShown}
                        isDifficultyShown={isDifficultyShown}
                    />}
                />
            </Routes>
            <Input
                handleChartChange={handleChartChange}
                handleCheckboxChange={handleCheckboxChange}
                handleClickFun={handleClickFun}
                handleClickDifficulty={handleClickDifficulty}
                chartType={chartType}
                isDataShown={isDataShown}
                isFunShown={isFunShown}
                isDifficultyShown={isDifficultyShown}
            />
            <StudentRoutes
                allStudents={allStudents}
                handleStudentChange={handleStudentChange}
            />
        </div>
    )
};

export default App;