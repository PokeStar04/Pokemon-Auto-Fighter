import React, { Component } from "react"
// class Test extends 

const Test = () => {
    const dataToPass = [
        {
            name: "hey",
            type: "je suis la "
        },
        {
            name: "BEcause",
            type: "je ezaeaea la "
        },
        {
            name: "Je suis pas la ",
            type: "en faite si"
        },
    ]
    return (
        <>
            <h1>Zakea</h1>
            <Table tableContent={dataToPass} />
        </>
    )
}



export default Test