import { useState, useEffect, useRef } from "react";
import GroupService from "../../services/GroupService";
import Table from "../UI/Table";
import TransparentBox from "../UI/TransparentBox";
// import styles from "./Group.module.css";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import Button from "../UI/Button";

const Group = () => {
  const [groups, setGroups] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [error, setError] = useState(false);

  const getGroups = async () => {
    GroupService.getGroups()
      .then((item) => {
        setGroups(item.customers);
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
    GroupService.getGroups().then((data) => {
      setGroups(data.customers);
      setTotalRecords(data.customers.length);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const rowExpansionTemplate = (data) => {
    return (
      <div
        className="orders-subtable"
        style={{ width: "600px", margin: "auto" }}
      >
        <h5>Orders for {data.name}</h5>
        <DataTable value={data.orders} responsiveLayout="scroll">
          <Column field="id" header="ID" sortable></Column>
          <Column field="customer" header="Code" sortable></Column>
          <Column field="date" header="Name" sortable></Column>
          <Column field="amount" header="Date" sortable></Column>
        </DataTable>
      </div>
    );
  };

  return (
    <TransparentBox>
      <Table
        value={groups}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        responsiveLayout="scroll"
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey="id"
        expander
      ></Table>
      <DataTable
        value={groups}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        responsiveLayout="scroll"
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey="id"
      >
        <Column expander style={{ width: "3em" }} />
        <Column field="name" header="Group Number" sortable />
        <Column field="price" header="Quantity" sortable />
        <Column field="category" header="Creation Date" sortable />
      </DataTable>
    </TransparentBox>
  );
};

export default Group;
