import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
try {
  const doc = new jsPDF();
  console.log("jsPDF success");
} catch(e) {
  console.log("jsPDF Error: ", e);
}
