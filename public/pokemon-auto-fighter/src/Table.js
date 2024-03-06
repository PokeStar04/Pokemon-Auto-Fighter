import React from "react";

const TableBody = ({ tableContent }) => {
    return (
        <tbody>
            {tableContent.map((item, index) => (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                </tr>
            ))}
        </tbody>
    );
};

const Table = ({ tableContent }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                </tr>
            </thead>
            <TableBody tableContent={tableContent} />
        </table>
    );
};

export default Table;
