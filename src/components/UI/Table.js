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
      <Column
        expander={props.expander}
        selectionMode={props.selectionMode}
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
    </DataTable>
  );
};

export default Table;
