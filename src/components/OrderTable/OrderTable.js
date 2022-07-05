import { useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import styles from "./OrderTable.module.css";

const CustomToolbar = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarFilterButton ref={setFilterButtonEl} />
  </GridToolbarContainer>
);

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "code",
    headerName: "Code",
    width: 150,
    editable: true,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "date",
    headerName: "Date",
    type: "number",
    width: 110,
    editable: true,
  },
];

const rows = [
  { id: 1, name: "Snow", code: "Jon", date: 35 },
  { id: 2, name: "Lannister", code: "Cersei", date: 42 },
  { id: 3, name: "Lannister", code: "Jaime", date: 45 },
  { id: 4, name: "Stark", code: "Arya", date: 16 },
  { id: 5, name: "Targaryen", code: "Daenerys", date: null },
  { id: 6, name: "Melisandre", code: null, date: 150 },
  { id: 7, name: "Clifford", code: "Ferrara", date: 44 },
  { id: 8, name: "Frances", code: "Rossini", date: 36 },
  { id: 9, name: "Roxie", code: "Harvey", date: 65 },
  { id: 10, name: "Snow", code: "Jon", date: 35 },
  { id: 11, name: "Lannister", code: "Cersei", date: 42 },
  { id: 12, name: "Lannister", code: "Jaime", date: 45 },
  { id: 13, name: "Stark", code: "Arya", date: 16 },
  { id: 14, name: "Targaryen", code: "Daenerys", date: null },
  { id: 15, name: "Melisandre", code: null, date: 150 },
  { id: 16, name: "Clifford", code: "Ferrara", date: 44 },
  { id: 17, name: "Frances", code: "Rossini", date: 36 },
  { id: 18, name: "Roxie", code: "Harvey", date: 65 },
  { id: 19, name: "Snow", code: "Jon", date: 35 },
  { id: 20, name: "Lannister", code: "Cersei", date: 42 },
  { id: 21, name: "Lannister", code: "Jaime", date: 45 },
  { id: 22, name: "Stark", code: "Arya", date: 16 },
  { id: 23, name: "Targaryen", code: "Daenerys", date: null },
  { id: 24, name: "Melisandre", code: null, date: 150 },
  { id: 25, name: "Clifford", code: "Ferrara", date: 44 },
  { id: 26, name: "Frances", code: "Rossini", date: 36 },
  { id: 27, name: "Roxie", code: "Harvey", date: 65 },
  { id: 28, name: "Snow", code: "Jon", date: 35 },
  { id: 29, name: "Lannister", code: "Cersei", date: 42 },
  { id: 30, name: "Lannister", code: "Jaime", date: 45 },
  { id: 31, name: "Stark", code: "Arya", date: 16 },
  { id: 32, name: "Targaryen", code: "Daenerys", date: null },
  { id: 33, name: "Melisandre", code: null, date: 150 },
  { id: 34, name: "Clifford", code: "Ferrara", date: 44 },
  { id: 35, name: "Frances", code: "Rossini", date: 36 },
  { id: 36, name: "Roxie", code: "Harvey", date: 65 },
];

const OrderTable = ({ items }) => {
  console.log(items);

  const [filterButtonEl, setFilterButtonEl] = useState(null);

  return (
    <div
      className={styles["table_container"]}
      style={{ height: 400, width: "50%" }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
        }}
        componentsProps={{
          panel: {
            anchorEl: filterButtonEl,
          },
          toolbar: {
            setFilterButtonEl,
          },
        }}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default OrderTable;
