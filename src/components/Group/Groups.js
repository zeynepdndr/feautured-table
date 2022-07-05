import { useState, useEffect, useRef } from "react";
import GroupService from "../../services/GroupService";
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
  const [error, setError] = useState(false);
  console.log(groups);

  const getGroups = async () => {
    GroupService.getAll()
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
    GroupService.getAll().then((data) => setGroups(data.customers));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const expandAll = () => {
    let _expandedRows = {};
    groups.forEach((p) => (_expandedRows[`${p.id}`] = true));

    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(null);
  };

  const statusOrderBodyTemplate = (rowData) => {
    return (
      <span className={`order-badge order-${rowData.status}`}>
        {rowData.status}
      </span>
    );
  };

  const searchBodyTemplate = () => {
    return <Button icon="pi pi-search" />;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`product-badge status-${rowData.inventoryStatus}`}>
        {rowData.inventoryStatus}
      </span>
    );
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="orders-subtable">
        <h5>Orders for {data.name}</h5>
        <DataTable value={data.orders} responsiveLayout="scroll">
          <Column field="id" header="Id" sortable></Column>
          <Column field="customer" header="Customer" sortable></Column>
          <Column field="date" header="Date" sortable></Column>
          <Column field="amount" header="Amount" sortable></Column>
          <Column
            field="status"
            header="Status"
            body={statusOrderBodyTemplate}
            sortable
          ></Column>
          <Column
            headerStyle={{ width: "4rem" }}
            body={searchBodyTemplate}
          ></Column>
        </DataTable>
      </div>
    );
  };

  return (
    <TransparentBox>
      <DataTable
        value={groups}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        responsiveLayout="scroll"
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey="id"
      >
        <Column expander style={{ width: "3em" }} />
        <Column field="name" header="Name" sortable />
        <Column field="price" header="Price" sortable />
        <Column field="category" header="Category" sortable />
        <Column field="rating" header="Reviews" sortable />
        <Column
          field="inventoryStatus"
          header="Status"
          sortable
          body={statusBodyTemplate}
        />
      </DataTable>
    </TransparentBox>
  );
};

export default Group;
