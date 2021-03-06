import React, { useState, useEffect, useRef } from "react";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import OrderService from "../../services/OrderService";
import Button from "../UI/Button";
import Table from "../UI/Table";

import "./OrderTable.module.css";
import GroupService from "../../services/GroupService";

const OrderTable = () => {
  const [loading, setLoading] = useState(false);
  const [groupSelectionError, setGroupSelectionError] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [orders, setOrders] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState(null);
  const toast = useRef(null);
  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 50,
    page: 1,
    sortField: null,
    sortOrder: null,
    // filters: {
    //   id: { value: "", matchMode: "contains" },
    //   code: { value: "", matchMode: "contains" },
    //   name: { value: "", matchMode: "contains" },
    //   date: { value: "", matchMode: "contains" },
    // },
    filters: {
      name: { value: "", matchMode: "contains" },
      "country.name": { value: "", matchMode: "contains" },
      company: { value: "", matchMode: "contains" },
      "representative.name": { value: "", matchMode: "contains" },
    },
  });

  let loadLazyTimeout = null;

  useEffect(() => {
    loadLazyData();
  }, [lazyParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadLazyData = () => {
    setLoading(true);

    if (loadLazyTimeout) {
      clearTimeout(loadLazyTimeout);
    }

    //imitate delay of a backend call
    loadLazyTimeout = setTimeout(() => {
      OrderService.getCustomers({ lazyEvent: JSON.stringify(lazyParams) }).then(
        (data) => {
          setTotalRecords(data.totalRecords);
          setOrders(data.customers);
          setLoading(false);
        }
      );
    }, Math.random() * 1000 + 250);
  };

  const onPage = (event) => {
    setLazyParams(event);
  };

  const onSort = (event) => {
    setLazyParams(event);
  };

  const onFilter = (event) => {
    event["first"] = 0;
    setLazyParams(event);
  };

  const onSelectionChange = (event) => {
    const value = event.value;
    setSelectedOrders(value);
    setSelectAll(value.length === totalRecords);
  };

  const onSelectAllChange = (event) => {
    const selectAll = event.checked;

    if (selectAll) {
      OrderService.getCustomers().then((data) => {
        setSelectAll(true);
        setSelectedOrders(data.customers);
      });
    } else {
      setSelectAll(false);
      setSelectedOrders([]);
    }
  };

  const groupSelectedOrders = () => {
    if (!selectedOrders || selectedOrders.length === 0) {
      setGroupSelectionError(true);
    } else {
      setGroupSelectionError(false);
      GroupService.addGroup(selectedOrders);
      toast.current.show({
        severity: "success",
        summary: "Group created successfully!",
        detail: "You can find it under Group",
        life: 3000,
      });
      setSelectedOrders(null);
    }
  };

  const clearSelections = () => {
    console.log(selectedOrders);
    setSelectedOrders(null);
  };

  useEffect(() => {
    setGroupSelectionError(false);
  }, [selectedOrders]);

  const header = (
    <div className="table-header-container">
      <Button onClick={groupSelectedOrders}>Group</Button>
      <Button onClick={clearSelections}>Clear</Button>
      {groupSelectionError && <p>Please select at least 1 item</p>}
    </div>
  );
  return (
    <div>
      <Toast ref={toast} className="toast_msg" />
      <Table
        value={orders}
        header={header}
        totalRecords={totalRecords}
        selection={selectedOrders}
        onSelectionChange={onSelectionChange}
        selectAll={selectAll}
        onSelectAllChange={onSelectAllChange}
        first={lazyParams.first}
        onPage={onPage}
        onSort={onSort}
        sortField={lazyParams.sortField}
        sortOrder={lazyParams.sortOrder}
        onFilter={onFilter}
        filters={lazyParams.filters}
        loading={loading}
      >
        <Column
          expander
          selectionMode="multiple"
          headerStyle={{ width: "3em" }}
        ></Column>
        <Column
          field="name"
          header="ID"
          sortable
          filter
          filterPlaceholder="Search by name"
        />
        <Column
          field="country.name"
          sortable
          header="Code"
          filterField="country.name"
          filter
          filterPlaceholder="Search by country"
        />
        <Column
          field="company"
          sortable
          filter
          header="Name"
          filterPlaceholder="Search by company"
        />
        <Column
          field="representative.name"
          header="Date"
          filter
          filterPlaceholder="Search by representative"
        />
      </Table>
    </div>
  );
};

export default OrderTable;
