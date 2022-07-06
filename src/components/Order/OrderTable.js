// import { useState } from "react";

// import styles from "./OrderTable.module.css";

// const columns = [
//   { field: "id", headerName: "ID", width: 90 },
//   {
//     field: "code",
//     headerName: "Code",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "name",
//     headerName: "Name",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "date",
//     headerName: "Date",
//     type: "number",
//     width: 110,
//     editable: true,
//   },
// ];

// const rows = [
//   { id: 1, name: "Snow", code: "Jon", date: 35 },
//   { id: 2, name: "Lannister", code: "Cersei", date: 42 },
//   { id: 3, name: "Lannister", code: "Jaime", date: 45 },
//   { id: 4, name: "Stark", code: "Arya", date: 16 },
//   { id: 5, name: "Targaryen", code: "Daenerys", date: null },
//   { id: 6, name: "Melisandre", code: null, date: 150 },
//   { id: 7, name: "Clifford", code: "Ferrara", date: 44 },
//   { id: 8, name: "Frances", code: "Rossini", date: 36 },
//   { id: 9, name: "Roxie", code: "Harvey", date: 65 },
//   { id: 10, name: "Snow", code: "Jon", date: 35 },
//   { id: 11, name: "Lannister", code: "Cersei", date: 42 },
//   { id: 12, name: "Lannister", code: "Jaime", date: 45 },
//   { id: 13, name: "Stark", code: "Arya", date: 16 },
//   { id: 14, name: "Targaryen", code: "Daenerys", date: null },
//   { id: 15, name: "Melisandre", code: null, date: 150 },
//   { id: 16, name: "Clifford", code: "Ferrara", date: 44 },
//   { id: 17, name: "Frances", code: "Rossini", date: 36 },
//   { id: 18, name: "Roxie", code: "Harvey", date: 65 },
//   { id: 19, name: "Snow", code: "Jon", date: 35 },
//   { id: 20, name: "Lannister", code: "Cersei", date: 42 },
//   { id: 21, name: "Lannister", code: "Jaime", date: 45 },
//   { id: 22, name: "Stark", code: "Arya", date: 16 },
//   { id: 23, name: "Targaryen", code: "Daenerys", date: null },
//   { id: 24, name: "Melisandre", code: null, date: 150 },
//   { id: 25, name: "Clifford", code: "Ferrara", date: 44 },
//   { id: 26, name: "Frances", code: "Rossini", date: 36 },
//   { id: 27, name: "Roxie", code: "Harvey", date: 65 },
//   { id: 28, name: "Snow", code: "Jon", date: 35 },
//   { id: 29, name: "Lannister", code: "Cersei", date: 42 },
//   { id: 30, name: "Lannister", code: "Jaime", date: 45 },
//   { id: 31, name: "Stark", code: "Arya", date: 16 },
//   { id: 32, name: "Targaryen", code: "Daenerys", date: null },
//   { id: 33, name: "Melisandre", code: null, date: 150 },
//   { id: 34, name: "Clifford", code: "Ferrara", date: 44 },
//   { id: 35, name: "Frances", code: "Rossini", date: 36 },
//   { id: 36, name: "Roxie", code: "Harvey", date: 65 },
// ];

// const OrderTable = ({ items }) => {
//   console.log(items);

//   const [filterButtonEl, setFilterButtonEl] = useState(null);

//   return (
//     <div className={styles["table_container"]}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         components={{
//           Toolbar: CustomToolbar,
//         }}
//         componentsProps={{
//           panel: {
//             anchorEl: filterButtonEl,
//           },
//           toolbar: {
//             setFilterButtonEl,
//           },
//         }}
//         rowsPerPageOptions={[10]}
//         checkboxSelection
//         disableSelectionOnClick
//       />
//     </div>
//   );
// };

// export default OrderTable;

import React, { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import OrderService from "../../services/OrderService";
import Button from "../UI/Button";
import Table from "../UI/Table";

import "./OrderTable.module.css";

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
  console.log(orders);
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
      ></Table>
      {/* <DataTable
        value={orders}
        lazy
        filterDisplay="row"
        responsiveLayout="scroll"
        dataKey="id"
        paginator
        header={header}
        first={lazyParams.first}
        rows={10}
        totalRecords={totalRecords}
        onPage={onPage}
        onSort={onSort}
        sortField={lazyParams.sortField}
        sortOrder={lazyParams.sortOrder}
        onFilter={onFilter}
        filters={lazyParams.filters}
        loading={loading}
        selection={selectedOrders}
        onSelectionChange={onSelectionChange}
        selectAll={selectAll}
        onSelectAllChange={onSelectAllChange}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3em" }}
        ></Column>
        <Column
          field="name"
          header="Name"
          sortable
          filter
          filterPlaceholder="Search by name"
        />
        <Column
          field="country.name"
          sortable
          header="Country"
          filterField="country.name"
          body={countryBodyTemplate}
          filter
          filterPlaceholder="Search by country"
        />
        <Column
          field="company"
          sortable
          filter
          header="Company"
          filterPlaceholder="Search by company"
        />
        <Column
          field="representative.name"
          header="Representative"
          body={representativeBodyTemplate}
          filter
          filterPlaceholder="Search by representative"
        />
      </DataTable> */}
    </div>
  );
};

export default OrderTable;
