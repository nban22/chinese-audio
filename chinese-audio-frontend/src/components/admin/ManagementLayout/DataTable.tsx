import React from "react";
import styled from "styled-components";

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
    Actions?: React.FC<{ record: any }>;
}

const DataTable: React.FC<DataTableProps> = (props) => {
    const filterDataRender = (data: any) => {
        if (typeof data === "string") {
            if (data.includes("http") && data.includes(".mp3")) {
                return (
                    <audio controls>
                        <source src={data} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                );
            }
        }
        return data;
    };
    const renderContent = (data: any, columns: string[]) => {
        return (
            <>
                {data?.map((row: any, rowIndex: number) => (
                    <tr key={rowIndex}>
                        {Object.entries(row).map((data, dataIndex) => {
                            if (props.columns.includes(data[0])) {
                                return <td key={dataIndex}>{filterDataRender(data[1])}</td>;
                            } else {
                                return null;
                            }
                        })}
                        {props.Actions && <td>{props.Actions({ record: row })}</td>}
                    </tr>
                ))}
            </>
        );
    };

    return (
        <StyledDataTable>
            <thead>
                <tr>
                    {props.columns.map((column, index) => {
                        return <th key={index}>{column}</th>;
                    })}
                    {props.Actions && <th>Actions</th>}
                </tr>
            </thead>
            <tbody>
                {renderContent(props.data, props.columns)}
            </tbody>
        </StyledDataTable>
    );
};

export default DataTable;
