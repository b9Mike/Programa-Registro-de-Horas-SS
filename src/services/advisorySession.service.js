export const getDateRange = (range) => {
    const now = new Date();
    const offset = -6; // GMT-6
    let startDate = null;
    let endDate = null;

    switch (range) {
        case 'today':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0); // Desde 00:00:00
            endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0); // Hasta 23:59:59.999
            break;
        case 'this_week':
            const weekStart = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Lunes
            const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 7)); // Domingo
            startDate = new Date(weekStart.setHours(0, 0, 0, 0));
            endDate = new Date(weekEnd.setHours(23, 59, 59, 999));
            break;
        case 'last_7_days':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7 , 0, 0, 0); // Desde 00:00:00
            endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0); // Hasta 23:59:59.999
            break;
        case 'last_30_days':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30 , 0, 0, 0); // Desde 00:00:00
            endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0); // Hasta 23:59:59.999
            break;
        case 'this_month':
            startDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate(), 0, 0, 0); // Desde 00:00:00
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate() + 1, 0, 0, 0, 0); // Hasta 23:59:59.999
            break;
        case 'last_3_months':
            startDate = new Date(now.getFullYear(), now.getMonth() + 3, now.getDate(), 0, 0, 0); // Desde 00:00:00
            endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0); // Hasta 23:59:59.999
            break;
        case 'this_year':
            startDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0); // Desde el 1 de enero
            endDate = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0);; // Hasta el final del año
            break;
        case 'this_semester':
            const currentMonth = now.getMonth();
            if (currentMonth >= 0 && currentMonth < 6) { // Enero a Junio
                startDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0); // Desde el 1 de enero
                endDate = new Date(now.getFullYear(), 6, 1, 0, 0, 0, 0); // Hasta el 30 de junio
            } else { // Julio a Diciembre
                startDate = new Date(now.getFullYear(), 6, 1, 0, 0, 0, 0); // Desde el 1 de julio
                endDate = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0); // Hasta el 31 de diciembre
            }
            break;
        case 'last_semester':
            const lastSemester = new Date(now);
            lastSemester.setMonth(now.getMonth() - 6); // Retroceder 6 meses
            const lastCurrentMonth = lastSemester.getMonth();
            if (lastCurrentMonth >= 0 && lastCurrentMonth < 6) { // Enero a Junio
                startDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0); // Desde el 1 de enero
                endDate = new Date(now.getFullYear(), 6, 1, 0, 0, 0, 0); // Hasta el 30 de junio
            } else { // Julio a Diciembre
                startDate = new Date(now.getFullYear(), 6, 1, 0, 0, 0, 0); // Desde el 1 de julio
                endDate = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0); // Hasta el 31 de diciembre
            }
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