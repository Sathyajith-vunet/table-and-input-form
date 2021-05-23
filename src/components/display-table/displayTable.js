import { useEffect, useState } from "react";
import { fetchUserList } from "../../apiCalls";
import { formatHeader } from "../../utilityFunctions";
import './displayTable.css';

export default function DisplayTable(props) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetchUserList().then((data) => {
      if (mounted) {
          data.map((user) => {
            delete user.address;
            delete user.company;
          })
        setTableData(data);
      }
    });
    return () => (mounted = false);
  }, []);

  const renderTableHeader = () => {
    if (tableData.length > 0) {
      return Object.keys(tableData[0]).map((header) => {
        return <th key={header}>{formatHeader(header)}</th>;
      });
    }
  };

  const renderTableData = () => {
    if (tableData.length > 0) {
        return tableData.map((user) => {
            return (<tr key={user.id}>
            {Object.values(user).map((value) => {
                if(typeof value !== Object)
                return <td key={value}>{value}</td>;
            })}
            </tr>)
        });
      }
  };

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
    </div>
  );
}
