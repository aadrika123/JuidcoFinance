import React from "react";
import SimpleTable, { ColumnProps } from "../atoms/SimpleTable";
import DebouncedSearchBox from "../../Helpers/DebouncedSearchBox";

interface TableWithSearchProps<T> {
  columns: Array<ColumnProps>;
  data?: T[];
  onViewButtonClick: () => void;
}

const TableWithSearch = <T,>({
  columns,
  data,
  onViewButtonClick,
}: TableWithSearchProps<T>) => {
  const onSearchTextChange = () => {
    window.alert("Not defined");
  };

  return (
    <>
      <section className="border rounded-lg border-zinc-300 p-6 px-10">
        <div className="flex justify-between">
          <div>Insert Chart</div>
          <DebouncedSearchBox
            debounceTime={1000}
            onChange={onSearchTextChange}
          />
        </div>

        <SimpleTable
          columns={columns}
          data={data}
          onViewButtonClick={onViewButtonClick}
        />
      </section>
    </>
  );
};

export default TableWithSearch;
