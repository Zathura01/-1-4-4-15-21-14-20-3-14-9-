import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function EditGrid({ edit, userEditList, setEdit, setUserEditList }) {
  const [data, setData] = useState();

  const fetchDatatoEdit = async () => {
    const response = await fetch("http://localhost:5000/api/getBudget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: edit })
    });

    const jsonData = await response.json();
    setData(jsonData);
  };

  useEffect(() => {
    if (edit) fetchDatatoEdit();
  }, [edit]);

  const sectionColors = {
    Income: '#d1e7dd',
    Investment: '#fef3c7',
    Saving: '#e0e7ff',
    Expense: '#ffe4e6',
    Misc: '#f3f4f6'
  };

  const filterRow = (row) => {
    const filtered = { ...row };
    delete filtered._id;
    return filtered;
  };

  const renderTable = (sectionName, items) => {
    const filteredItems = items.map(filterRow);
    return (
      <div
        key={sectionName}
        style={{
          marginBottom: '2.5rem',
          backgroundColor: sectionColors[sectionName] || '#f9fafb',
          borderRadius: '8px',
          padding: '1rem',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <h3 style={{ borderBottom: '2px solid #ccc', paddingBottom: '0.5rem', color: '#333' }}>
          {sectionName}
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9' }}>
                {Object.keys(filteredItems[0] || {}).map((key) => (
                  <th key={key} style={{ padding: '10px', borderBottom: '1px solid #ccc', color: '#555' }}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                  {Object.entries(row).map(([key, val], i) => (
                    <td key={i} style={{ padding: '10px', color: '#444' }}>{val ?? 'N/A'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text(data?.bName || 'Budget Report', 14, 20);

    // Meta Info
    doc.setFontSize(11);
    doc.text(`Comment: ${data?.Comment || 'N/A'}`, 14, 30);
    doc.text(`Created At: ${new Date(data?.createdAt).toLocaleString()}`, 14, 36);

    let currentY = 45;

    Object.entries(data).forEach(([sectionName, sectionData]) => {
      if (Array.isArray(sectionData) && sectionData.length > 0) {
        const filteredData = sectionData.map(filterRow);
        const keys = Object.keys(filteredData[0] || {});
        const rows = filteredData.map(row => keys.map(k => row[k]));

        doc.setFontSize(14);
        doc.text(sectionName, 14, currentY);

        autoTable(doc, {
          startY: currentY + 4,
          head: [keys],
          body: rows,
          theme: 'grid',
          styles: { fontSize: 10 },
          headStyles: { fillColor: [100, 100, 255] },
        });

        currentY = doc.lastAutoTable.finalY + 10;
      }
    });

    doc.save(`${data?.bName || 'budget'}.pdf`);
  };

  return (
    <div id="budget-pdf" style={{
      fontFamily: 'Segoe UI, Roboto, sans-serif',
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      color: '#222'
    }}>
      {data ? (
        <div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{data.bName}</h1>
          <p><strong>Comment:</strong> {data.Comment || 'N/A'}</p>
          <p><strong>Created At:</strong> {new Date(data.createdAt).toLocaleString()}</p>
          <hr style={{ margin: '1rem 0' }} />

          {Object.entries(data).map(([key, value]) =>
            Array.isArray(value) ? renderTable(key, value) : null
          )}
        </div>
      ) : (
        <p>Loading budget details...</p>
      )}
      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
}

export default EditGrid;
