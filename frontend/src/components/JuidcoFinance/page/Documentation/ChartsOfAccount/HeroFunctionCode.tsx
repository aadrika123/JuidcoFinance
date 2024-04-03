import React, { useEffect, useState } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import FunctionCodeTable from "@/components/Helpers/Tables/FunctionCodeTable";
import { FunctionTableData } from "@/utils/types/types";
import DebouncedSearch from "@/components/global/atoms/DebouncedSearch";
import Loader from "@/components/Helpers/Basic/Loader";
import { escapeRegExp } from "jflib";

type FunctionCodeProps = {
  data: FunctionTableData[];
};

const FunctionCode: React.FC<FunctionCodeProps> = (props) => {

  const [searching, setSearching] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [tableData, setTableData] = useState<FunctionTableData[]>(props.data);
  const [searchCondition, setSearchCondition] = useState<RegExp | null>(null);


  useEffect(()=>{
    const escapedST = escapeRegExp(searchText);
    const reg = new RegExp(`(${escapedST})`,"gi");
    if(searchText.length == 0){
      setTableData(props.data);
      setSearchCondition(null);
    }else{
      setTableData(props.data.filter(function (el) {
        return el.description.search(reg) != -1;
      }));
      setSearchCondition(reg);
    }
  },[searchText]);

  return (
    <>
      <section className="border bg-white shadow-2xl p-6 px-10">
        <div className="flex items-center justify-between">
          <SubHeading>Function codes</SubHeading>
          <DebouncedSearch onChange={setSearchText} debounceDuration={500} onSearching={setSearching}/>
        </div>

        <div className="mt-8 mb-4">
          {searching? (<Loader />):(
                      <FunctionCodeTable data={tableData} searchCondition={searchCondition} />
          )}
        </div>

        <div>
           Found {tableData.length} Records
        </div>
        
      </section>
    </>
  );
};

export default FunctionCode;
