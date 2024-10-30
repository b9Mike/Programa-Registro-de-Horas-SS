export const getDateRange = (range) => {
    const now = new Date();
    const offset = -6; // GMT-6
    let startDate = null;
    let endDate = null;

    switch (range) {
        case 'today':
            startDate = getDate();
            endDate = getDate(0,0,1);
            break;

        case 'this_week':
            const weekStart = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Lunes
            const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 7)); // Domingo
            
            startDate = new Date(weekStart.setHours(0, 0, 0, 0));
            endDate = new Date(weekEnd.setHours(23, 59, 59, 999));
            break;

        case 'last_7_days':
            startDate = getDate(0,0,-7);
            endDate = getDate(0,0,1);
            break;

        case 'last_30_days':
            startDate = getDate(0,0,-30);
            endDate = getDate(0,0,1);
            break;

        case 'this_month':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0); // Primero del mes
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0); // Primero del siguiente mes
            break;

        case 'last_3_months':
            startDate = getDate(0,3,0);
            endDate = getDate(0,0,1);
            break;

        case 'this_year':
            startDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0); // Desde el 1 de enero
            endDate = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0);; // Hasta el 1 de enero del siguiente año
            break;

        case 'this_semester':
            ({ startDate, endDate } = getSemester(now.getMonth()));
            break;

        case 'last_semester':
            ({ startDate, endDate } = getSemester(now.getMonth()-6));
            break;

        default:
            break;
    }

    // Ajustar a UTC considerando el offset
    if (startDate) startDate.setHours(startDate.getHours() + offset);
    if (endDate) endDate.setHours(endDate.getHours() + offset);
    
        // Formato para buscar fechas
    const formatDate = (date) => {
        return date ? date.toISOString().split('T')[0] : null; // "YYYY-MM-DD"
    };
    
    return {
        start: startDate ? formatDate(startDate) : null,
        end: endDate ? formatDate(endDate) : null,
    };

};

const getSemester = (month) => {
    const now = new Date();
    let startDate = null;
    let endDate = null;

    if (month >= 0 && month < 6) { // Enero a Junio
        startDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0); // Desde el 1 de enero
        endDate = new Date(now.getFullYear(), 6, 1, 0, 0, 0, 0); // Hasta el 30 de junio
    } else { // Julio a Diciembre
        startDate = new Date(now.getFullYear(), 6, 1, 0, 0, 0, 0); // Desde el 1 de julio
        endDate = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0); // Hasta el 31 de diciembre
    }

    return {startDate, endDate};
}

const getDate = (year=0, month=0, day=0) => {
    const now = new Date();

    return new Date(now.getFullYear()+year, now.getMonth()+month, now.getDate()+day, 0, 0, 0); // Desde 00:00:00
}