import styled from "styled-components";
import DataTable from "../../../components/admin/ManagementLayout/DataTable";
import IconPlusCircle from "../../../icons/IconPlusCircle";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

interface ManagementLayoutProps {
  title: string;
  columnNames: object;
  data: object[];
  onAddItem?: () => void;
  Actions?: React.FC<{ record: any }>;
}

const ManagementLayout: React.FC<ManagementLayoutProps> = (props) => {
  return (
    <div>
      <header className="flex flex-wrap items-center justify-between gap-3 p-5">
        <h1 className="text-[calc(1rem+2vw)] font-semibold">{props.title}</h1>
        {props.onAddItem && (
          <button
            className="flex items-center gap-2 rounded-md bg-primary p-3 text-white hover:brightness-125"
            style={{ textShadow: "1px 1px 1px #000, 0px 0px 1px #000" }}
            onClick={props.onAddItem}
          >
            <PlusCircleIcon className="h-6 w-6" />
            Add Item
          </button>
        )}
      </header>
      <DataTable
        columns={props.columnNames}
        data={props.data}
        Actions={props.Actions}
      />
    </div>
  );
};

export default ManagementLayout;
