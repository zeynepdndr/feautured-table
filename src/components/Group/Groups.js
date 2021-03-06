import { useState, useEffect, useRef } from "react";
import GroupService from "../../services/GroupService";
import Table from "../UI/Table";
import TransparentBox from "../UI/TransparentBox";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

const Group = () => {
  const [groups, setGroups] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [error, setError] = useState(false);

  const getGroups = async () => {
    GroupService.getAll()
      .then((item) => {
        setGroups(item);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  };

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {}, [groups]);

  const [expandedRows, setExpandedRows] = useState(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const summary =
        expandedRows !== null ? "All Rows Expanded" : "All Rows Collapsed";
    }
  }, [expandedRows]);

  useEffect(() => {
    isMounted.current = true;
    GroupService.getAll().then((data) => {
      setGroups(data);
      setTotalRecords(data.length);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const rowExpansionTemplate = (data) => {
    return (
      <div
        className="orders-subtable"
        style={{ width: "600px", margin: "auto" }}
      >
        <h5>Orders for group {data.groupNumber}</h5>
        <DataTable value={data.orders} responsiveLayout="scroll">
          <Column field="id" header="ID" sortable></Column>
          <Column field="code" header="Code" sortable></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column field="date" header="Date" sortable></Column>
        </DataTable>
      </div>
    );
  };
  console.log("groups", groups);
  return (
    <TransparentBox>
      <Table
        value={groups}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        responsiveLayout="scroll"
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey="id"
      >
        <Column expander style={{ width: "3em" }} />
        <Column field="groupNumber" header="Group Number" sortable />
        <Column field="orders.length" header="Quantity" sortable />
        <Column field="createdDate" header="Creation Date" sortable />
      </Table>
    </TransparentBox>
  );
};

export default Group;
