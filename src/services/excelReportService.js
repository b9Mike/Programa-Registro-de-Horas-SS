import ExcelJS from 'exceljs';

export const generateExcelReport = async (advisorySessions) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Reporte de Asesorías');

  // Definir las columnas
  worksheet.columns = [
    { header: 'ID', key: 'Identity', width: 10 },
    { header: 'Tema', key: 'Topic', width: 30 },
    { header: 'Profesor', key: 'Professor', width: 30 },
    { header: 'Tipo de Clase', key: 'ClassType', width: 15 },
    { header: 'Fecha', key: 'SessionDate', width: 15 },
    { header: 'Hora Inicio', key: 'StartTime', width: 10 },
    { header: 'Hora Fin', key: 'EndTime', width: 10 },
    { header: 'Activo', key: 'Active', width: 10 }
  ];

  // Insertar las filas con datos
  advisorySessions.forEach(session => {
    worksheet.addRow(session);
  });

  // Generar el archivo Excel en un buffer
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};
