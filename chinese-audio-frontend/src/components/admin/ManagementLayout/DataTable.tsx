import React from 'react';
import styled from 'styled-components';

const StyledDataTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    th {
        background-color: #333;
        border-bottom: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    td {
        border-bottom: 1px solid #ddd;
        padding: 8px;
    }
`;

interface DataTableProps {
    columns: string[];
    data: string[][];
    Actions?: React.FC<{id: string}>;
}

const DataTable: React.FC<DataTableProps> = (props) => {
    return (
        <StyledDataTable>
            <thead>
                <tr>
                    {props.columns.map((column, index) => {
                        return <th key={index}>{column}</th>
                    })}
                    {props.Actions && <th>Actions</th>}
                </tr>
            </thead>
            <tbody>
                {props.data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((data, dataIndex) => (
                            <td key={dataIndex}>{data}</td>
                        ))}
                        {props.Actions && <td>{props.Actions({id: row[0]})}</td>}
                    </tr>
                ))}
            </tbody>
        </StyledDataTable>
    );
};

export default DataTable;