import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { fetchProductsService } from './FetchProductsServices';

// note: I added this function which lets the user generate a report of all products 
// The report includes product details like name price creation and update dates
// and adds the current date as the report date.
// It generates an Excel file that the user can download before log out

export const generateProductsReport = async () => {
  try {
    const products = await fetchProductsService();

    const today = new Date().toLocaleDateString('en-GB');

    const formattedData = products.map((product: any) => ({
      Name: product.name,
      Price: product.price,
      'Created At': product.created_at ? product.created_at.slice(0, 10) : 'N/A',
      'Updated At': product.updated_at ? product.updated_at.slice(0, 10) : 'N/A',
      'Report Date': today,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products Report');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    FileSaver.saveAs(blob, `Products_Report_${today.replace(/\//g, '-')}.xlsx`);
  } catch (err) {
    console.error("Failed to generate report:", err);
    throw err;
  }
};
