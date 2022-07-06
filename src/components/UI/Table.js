import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

const Table = (props) => {
  return (
    <DataTable
      value={props.value}
      lazy
      filterDisplay="row"
      responsiveLayout="scroll"
      dataKey="id"
      paginator
      scrollable
      scrollHeight="350px"
      header={props.header}
      first={props.first}
      rows={50}
      totalRecords={props.totalRecords}
      onPage={props.onPage}
      onSort={props.onSort}
      sortField={props.sortField}
      sortOrder={props.sortOrder}
      onFilter={props.onFilter}
      filters={props.filters}
      loading={props.loading}
      selection={props.selection}
      onSelectionChange={props.onSelectionChange}
      selectAll={props.selectAll}
      onSelectAllChange={props.onSelectAllChange}
      expandedRows={props.expandedRows}
      onRowToggle={props.onRowToggle}
      rowExpansionTemplate={props.rowExpansionTemplate}
    >
      {props.children}
    </DataTable>
  );
};

export default Table;
