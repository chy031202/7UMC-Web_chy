import React, { useState, useContext } from "react";
import styled from "styled-components";
import colors from "../styles/colors";
import TodoInput from "../components/input/todoInput";
import TodoButton from "../components/button/todoButton";
import ListTodo from "../components/list/list-todo";
import { TodoContext } from "../context/todoContext";

const TitleP = styled.p`
    color: ${colors.black};
    margin: 6.95vw 0 3vw 0;
    font-size: 1.6rem;
    font-weight: bold;
`;

const TitleBar = styled.hr`
    width: 70%;
    height: 0.1vw;
    background-color: #B5D2ED;
    border: none;
`;

const BodyContainer = styled.div`
    width: 70%;
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: 1.65vw 0;
`;

const Todo = () => {
    const { todos, addTodo } = useContext(TodoContext);
    const [inputValue, setInputValue] = useState("");

    const handleAddTodo = () => {
        if (inputValue) {
            addTodo(inputValue);
            setInputValue("");
        }
    };

    return (
        <div className="pageContainer">
            <TitleP>UMC Study Plan</TitleP>
            <BodyContainer>
                <TodoInput 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    placeholder="할 일을 작성해보세요."
                />
                <TodoButton text="등록" onClick={handleAddTodo} />
            </BodyContainer>

            <TitleBar />
            
            <ListTodo todos={todos} />
        </div>
    );
};

export default Todo;
