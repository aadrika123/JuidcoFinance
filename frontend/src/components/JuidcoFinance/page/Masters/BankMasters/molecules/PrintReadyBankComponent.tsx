import React from 'react';
import { AddBankDetailsData } from '../bank_master_types';

interface PrintReadyBankComponentProps {
  bank: AddBankDetailsData
}

export function PrintReadyBankComponent({ bank }: PrintReadyBankComponentProps) {

  return (
    <div className="m-10 p-10 border-2 rounded">
      <table className="border-collapse w-[100%]">
        <caption>Bank Details (#{bank?.id})</caption>
        <thead>
          <tr>
            <th className="w-[40%]"></th>
            <th className="w-[60%]"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-slate-300 px-2">ULB Name</td>
            <td className="border border-slate-300 px-2">{bank?.ulb}</td>
          </tr>
          <tr>
            <td className="border border-slate-300 px-2">Bank Type</td>
            <td className="border border-slate-300 px-2">{bank?.bank_type}</td>
          </tr>
          <tr>
            <td className="border border-slate-300 px-2">Bank Name</td>
            <td className="border border-slate-300 px-2">{bank?.bank}</td>
          </tr>
          <tr>
            <td className="border border-slate-300 px-2">Branch Name</td>
            <td className="border border-slate-300 px-2">{bank?.branch}</td>
          </tr>
          <tr>
            <td className="border border-slate-300 px-2">IFSC Code</td>
            <td className="border border-slate-300 px-2">{bank?.ifsc_code}</td>
          </tr>
          <tr>
            <td className="border border-slate-300 px-2">MICR Code</td>
            <td className="border border-slate-300 px-2">{bank?.micr_code}</td>
          </tr>

          <tr>
            <td className="border border-slate-300 px-2">Branch State</td>
            <td className="border border-slate-300 px-2">{bank?.branch_state}</td>
          </tr>

          <tr>
            <td className="border border-slate-300 px-2">Branch District</td>
            <td className="border border-slate-300 px-2">{bank?.branch_district}</td>
          </tr>

          <tr>
            <td className="border border-slate-300 px-2">Branch City</td>
            <td className="border border-slate-300 px-2">{bank?.branch_city}</td>
          </tr>

          <tr>
            <td className="border border-slate-300 px-2">Bank Branch Address</td>
            <td className="border border-slate-300 px-2">{bank?.branch_address}</td>
          </tr>

          <tr>
            <td className="border border-slate-300 px-2">Email ID</td>
            <td className="border border-slate-300 px-2">{bank?.email}</td>
          </tr>


          <tr>
            <td className="border border-slate-300 px-2">Contact Number</td>
            <td className="border border-slate-300 px-2">{bank?.contact_no}</td>
          </tr>


        </tbody>
      </table>

    </div>
  );
}
