import React from "react";
import styled from "styled-components";
import { AudioAttributes } from "../../../services/audioService";
import { formatDistanceToNow } from "date-fns";
import CustomAudioPlayer from "../../utitils/CustomAudioPlayer";

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
  columns: object;
  data: any;
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
    const date = new Date(data);
    if (
      typeof data === "string" &&
      /^\d+-\d+-\d+T\d+:\d+:\d+\.\d+Z$/.test(data)
    ) {
      return formatDistanceToNow(date, { addSuffix: true });
    }
    return data;
  };
  const renderContent = (data: object[], columns: object) => {
    return (
      <>
        {data?.map((row: any, rowIndex: number) => (
          <tr key={rowIndex}>
            {Object.keys(columns).map((key, dataIndex) => {
              return <td key={dataIndex}>{filterDataRender(row[key])}</td>;
            })}
            {props.Actions && (
              <td>{props.Actions({ record: row }) as React.ReactNode}</td>
            )}
          </tr>
        ))}
      </>
    );
  };

  return (
    <table className="w-full border-collapse border border-gray-800">
      <thead className="">
        <tr>
          {Object.values(props.columns).map((column, index) => {
            return <th key={index}>{column}</th>;
          })}
          {props.Actions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>{renderContent(props.data, props.columns)}</tbody>
    </table>
  );
};

export default DataTable;
