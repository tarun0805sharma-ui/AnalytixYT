try {
  const blob = new Blob(["test"], { type: 'text/csv;charset=utf-8;' });
  console.log("Blob success");
} catch(e) {
  console.log("Blob error", e);
}
