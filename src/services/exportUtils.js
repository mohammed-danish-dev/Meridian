import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export const exportToCSV = (data, filename, title = 'Report', columns, filters = {}, summary = {}) => {
  const metadata = [
    [title],
    [`Generated Date: ${new Date().toLocaleString()}`],
    [],
    ['Filters', 'Value']
  ];
  Object.entries(filters).forEach(([key, val]) => {
    metadata.push([key, String(val)]);
  });
  metadata.push([]);
  metadata.push(['Summary', 'Value']);
  Object.entries(summary).forEach(([key, val]) => {
    metadata.push([key, String(val)]);
  });
  metadata.push([]);
  let csvData = [];
  if (data.length > 0) {
    let headers;
    let keys;

    if (columns) {
      headers = columns.map(c => c.headerName || c.field);
      keys = columns.map(c => c.field);
    } else {
      keys = Object.keys(data[0]);
      headers = keys;
    }

    csvData.push(headers);
    data.forEach(row => {
      csvData.push(keys.map(k => row[k]));
    });
  }

  const combinedData = [...metadata, ...csvData];
  const csv = Papa.unparse(combinedData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportToExcel = (data, filename, title = 'Report', columns, filters = {}, summary = {}) => {
  const wsData = [
    [title],
    [`Generated Date: ${new Date().toLocaleString()}`],
    [],
    ['Filters', 'Value']
  ];
  Object.entries(filters).forEach(([key, val]) => {
    wsData.push([key, String(val)]);
  });
  wsData.push([]);
  wsData.push(['Summary', 'Value']);
  Object.entries(summary).forEach(([key, val]) => {
    wsData.push([key, String(val)]);
  });
  wsData.push([]);

  if (data.length > 0) {
    let headers;
    let keys;

    if (columns) {
      headers = columns.map(c => c.headerName || c.field);
      keys = columns.map(c => c.field);
    } else {
      keys = Object.keys(data[0]);
      headers = keys;
    }

    wsData.push(headers);
    data.forEach(row => {
      wsData.push(keys.map(k => row[k]));
    });
  }

  const worksheet = XLSX.utils.aoa_to_sheet(wsData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const exportToPDF = (data, filename, title, columns, filters = {}, summary = {}) => {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Organization: Enterprise Suite`, 14, 30);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 36);

  let currentY = 46;

  if (Object.keys(filters).length > 0) {
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Applied Filters:', 14, currentY);
    currentY += 6;
    doc.setFontSize(10);
    doc.setTextColor(100);
    Object.entries(filters).forEach(([key, val]) => {
      doc.text(`${key}: ${val}`, 14, currentY);
      currentY += 5;
    });
    currentY += 5;
  }

  if (Object.keys(summary).length > 0) {
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Summary:', 14, currentY);
    currentY += 6;
    doc.setFontSize(10);
    doc.setTextColor(100);
    Object.entries(summary).forEach(([key, val]) => {
      doc.text(`${key}: ${val}`, 14, currentY);
      currentY += 5;
    });
    currentY += 5;
  }

  const tableColumn = columns.map(c => c.headerName || c.field);
  const tableRows = data.map(row => columns.map(col => row[col.field]));

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: currentY,
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [41, 128, 185] },
  });

  doc.save(`${filename}.pdf`);
};
