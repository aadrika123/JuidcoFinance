import React, { useEffect, useState } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import { MuncipalityTableData } from "@/utils/types/types";
import DebouncedSearch from "@/components/global/atoms/DebouncedSearch";
import MunicipalityCodeTable from "@/components/Helpers/Tables/MunicipalityCodeTable";
import Loader from "@/components/Helpers/Basic/Loader";
import { escapeRegExp } from "@/utils/helper";

type HeroMuncipalityCodeProps = {
  data: MuncipalityTableData[];
};

const HeroMuncipalityCode: React.FC<HeroMuncipalityCodeProps> = (props) => {
  const [searching, setSearching] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [tableData, setTableData] = useState<MuncipalityTableData[]>(props.data);
  const [searchCondition, setSearchCondition] = useState<RegExp | null>(null);

  useEffect(()=>{
    const escapedST = escapeRegExp(searchText);
    const reg = new RegExp(`(${escapedST})`,"gi");

    if(searchText.length == 0){
      setTableData(props.data);
      setSearchCondition(null);
    }else{
      setTableData(props.data.filter(function (el) {
        const text = el.ulbs.concat(el.code).concat(el.district).concat(el.full_code)
        return text.search(reg) != -1 || text.search(reg) != -1;
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
