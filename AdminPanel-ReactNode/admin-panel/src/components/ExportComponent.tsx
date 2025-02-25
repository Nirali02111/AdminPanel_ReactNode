import { CButton, CButtonGroup, CModal, CModalBody } from "@coreui/react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";

const ExportComponent = ({ fileName }: { fileName: string }) => {
  const [visible, setVisible] = useState(false);
  const [rows, setRows] = useState(0);
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setVisible(false);
      }, 1000);
    }
  }, [visible]);

  const findTable = (): HTMLTableElement | null => {
    const table = document.getElementById("table");
    if (table) {
      const tableCopy: HTMLTableElement = table.cloneNode(
        true
      ) as HTMLTableElement;
      //ignore the details column in audit log table details button
      const cellsToModify = tableCopy.querySelectorAll(".dt-control");
      cellsToModify.forEach((cell) => {
        if (cell.textContent === "+") {
          cell.textContent = "";
        }
      });
      //ignore the details column in audit log table details row
      const rowsToDelete = tableCopy.querySelectorAll(".audit-details-row");
      rowsToDelete.forEach((row) => row.remove());

      //ignore the search row
      const excludedRow: HTMLTableRowElement | undefined = tableCopy.rows[1];
      if (excludedRow) {
        tableCopy.deleteRow(excludedRow.rowIndex);
      }
      return tableCopy;
    }
    return null;
  };
  const convertTableToCommaSeparated = (table: HTMLTableElement): string => {
    const rows = Array.from(table.querySelectorAll("tr"));
    return rows
      .map((row) => {
        const columns = Array.from(row.querySelectorAll("th,td"));
        return columns
          .map((column) =>
            column.textContent?.includes(",")
              ? '"' + column.textContent + '"'
              : column.textContent
          )
          .join(",");
      })
      .join("\n");
  };

  //handler functions
  const handleCopyClick = () => {
    const table = findTable();
    if (table) {
      const tableText = convertTableToCommaSeparated(table);
      const tableDataArr = tableText
        .split("\n")
        .map((ele) => ele.split(","))
        .map((ele) => ele.join("    "));
      const textToCopy = tableDataArr.join("\n");
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setRows(tableDataArr.length - 1);
          setVisible(true);
        })
        .catch(() => {});
    }
  };
  const handleExcelClick = () => {
    const table = findTable();
    if (table) {
      const workbook: XLSX.WorkBook = XLSX.utils.table_to_book(table);
      XLSX.writeFile(workbook, fileName + ".xlsx");
    }
  };
  const handleCSVClick = (): void => {
    const table = findTable();
    if (table) {
      const csvData = convertTableToCommaSeparated(table);

      const blob = new Blob([csvData], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName + ".csv";
      link.click();
    }
  };
  const handlePDFClick = () => {
    const doc = new jsPDF();
    const table = findTable();
    if (table) {
      autoTable(doc, { html: table });
      doc.save(fileName);
    }
  };
  return (
    <div className="mb-3">
      <CButtonGroup className="me-2" role="group" aria-label="First group">
        <CButton
          color="secondary"
          variant="outline"
          size="sm"
          onClick={handleCopyClick}
        >
          Copy
        </CButton>
        <CButton
          color="secondary"
          variant="outline"
          size="sm"
          onClick={handleExcelClick}
        >
          Excel
        </CButton>
        <CButton
          color="secondary"
          variant="outline"
          size="sm"
          onClick={handleCSVClick}
        >
          CSV
        </CButton>
        <CButton
          color="secondary"
          variant="outline"
          size="sm"
          onClick={handlePDFClick}
        >
          PDF
        </CButton>
      </CButtonGroup>
      {/* Modal */}
      <CModal
        visible={visible}
        alignment="center"
        style={{ height: "120px" }}
        className="border"
      >
        <CModalBody className="">
          <h4 className="text-center">Copied to clipboard</h4>
          <hr />
          <div className="text-center">Copied {rows} rows to the clipboard</div>
        </CModalBody>
      </CModal>
    </div>
  );
};

export default ExportComponent;

// Create a textarea element to hold the content
