import React from "react";
import { formatDistanceToNow } from "date-fns";

interface DataTableProps {
  columns: object;
  data: any;
  Actions?: React.FC<{ record: any; onSuccess: () => void }>;
  onFetchData?: () => void;
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
      if (data.includes("http") && (data.includes(".jpg") || data.includes(".png"))) {
        return (
          <img src={data} alt="preview" className="w-20 h-20 object-cover" />
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
              <td>
                <props.Actions
                  record={row}
                  onSuccess={props.onFetchData || (() => {})}
                />
              </td>
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
