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
        align-content: center;
    }
`;

interface DataTableProps {
    columns: string[];
    data: any[][];
    Actions?: React.FC<{id: string}>;
}


const DataTable: React.FC<DataTableProps> = (props) => {
    const filterDataRender = (data: any) => {
        if (typeof data === 'string') {
            if (data.includes('http') && data.includes('.mp3')) {
                return (
                    <audio controls>
                        <source src={data} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                )
            }
        }
        return data;
    }
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
                            <td key={dataIndex}>{filterDataRender(data)}</td>
                        ))}
                        {props.Actions && <td>{props.Actions({id: row[0]})}</td>}
                    </tr>
                ))}
            </tbody>
        </StyledDataTable>
    );
};

export default DataTable;