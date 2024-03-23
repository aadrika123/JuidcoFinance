import React, { useEffect, useState } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import { MuncipalityTableData } from "@/utils/types/types";
import DebouncedSearch from "@/components/global/atoms/DebouncedSearch";
import MunicipalityCodeTable from "@/components/Helpers/Tables/MunicipalityCodeTable";
import Loader from "@/components/Helpers/Basic/Loader";

type HeroMuncipalityCodeProps = {
  data: MuncipalityTableData[];
};

const HeroMuncipalityCode: React.FC<HeroMuncipalityCodeProps> = (props) => {
  const [searching, setSearching] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [tableData, setTableData] = useState<MuncipalityTableData[]>(props.data);
  const [searchCondition, setSearchCondition] = useState<RegExp | null>(null);

  useEffect(()=>{
    const reg = new RegExp(`(${searchText})`,"gi");
    if(searchText.length == 0){
      setTableData(props.data);
      setSearchCondition(null);
    }else{
      setTableData(props.data.filter(function (el) {
        return el.ulbs.search(reg) != -1;
      }));
      setSearchCondition(reg);
    }
  },[searchText]);

  return (
    <section className="border bg-white shadow-2xl p-6 px-10">
      <div className="flex items-center justify-between">
        <SubHeading>Municipality Codes</SubHeading>
        <DebouncedSearch onChange={setSearchText} debounceDuration={500} onSearching={setSearching} />
      </div>

      <div className="mt-8 mb-4">
      {searching? (<Loader />):(
        <MunicipalityCodeTable data={tableData} searchCondition={searchCondition} />
      )}
        
      </div>

      <div>
           Found {tableData.length} Records
        </div>
        
    </section>
  );
};

export default HeroMuncipalityCode;
