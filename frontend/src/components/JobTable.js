import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";

import { DUMMY_TABLE_DATA, TABLE_HEADER_NAMES } from "../common/constants";
import AddForm from "./AddForm";

const DELAY = 100;

const JobTable = () => {
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    date: null,
    skills: [],
    contacts: [],
    status: "Applied",
  });

  useEffect(() => {
    setTableData(DUMMY_TABLE_DATA);
  }, []);

  const handleAddRow = e => {
    const newRow = { id: Math.floor(Math.random() * Math.max()), ...formData };
    setTableData(tableData.concat(newRow));
    e.preventDefault();
  };

  const handleFormDataChange = useMemo(() =>
    debounce(e => {
      const { name, value } = e.target;
      const data = { ...formData };
      data[name] = value;

      setFormData(data);
    }, DELAY)
  );

  const handleDeleteRow = e => {
    setTableData(
      tableData.filter(
        row => row.id?.toString() !== e.target.getAttribute("id")
      )
    );
  };

  const handleSortColumn =
    (reverse = false) =>
    e => {
      const column = e.target.getAttribute("column").toLowerCase();

      const comparator = (a, b) => {
        if (a[column] < b[column]) return -1;
        if (a[column] > b[column]) return 1;
        return 0;
      };

      setTableData(
        reverse
          ? [...tableData].sort(comparator).reverse()
          : [...tableData].sort(comparator)
      );
    };

  return (
    <div>
      <table
        style={{
          margin: "2% auto",
          minWidth: "66%",
          border: "1px dashed black",
        }}
      >
        <tbody>
          <tr>
            {TABLE_HEADER_NAMES.map(name => (
              <th style={{ textAlign: "left" }}>
                {name}
                <button column={name} onClick={handleSortColumn()}>
                  ▲
                </button>
                <button column={name} onClick={handleSortColumn(true)}>
                  ▼
                </button>
              </th>
            ))}
          </tr>
          {tableData &&
            tableData.map(row => {
              return (
                <tr rowid={row.id}>
                  {Object.keys(row)
                    .slice(1)
                    .map(key => (
                      <td>{row[key]}</td>
                    ))}
                  <td>
                    <button id={row.id} onClick={handleDeleteRow}>
                      x
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div
        style={{
          position: "sticky",
          bottom: "5%",
          textAlign: "center",
        }}
      >
        <AddForm
          handleFormSubmit={handleAddRow}
          handleFormDataChange={handleFormDataChange}
        />
      </div>
    </div>
  );
};

export default JobTable;
