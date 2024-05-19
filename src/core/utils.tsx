export function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function cateringToString (type: 'ALL_INCLUSIVE' | 'THREE_COURSES' | 'TWO_COURSES' | 'BREAKFAST' | 'NO_CATERING' | 'ACCORDING_TO_PROGRAMME',) {
    if (type === 'ALL_INCLUSIVE') return 'All inclusive';
    if (type === 'THREE_COURSES') return 'Three courses';
    if (type === 'TWO_COURSES') return 'Two courses';
    if (type === 'BREAKFAST') return 'Breakfast';
    if (type === 'NO_CATERING') return 'No catering';
    if (type === 'ACCORDING_TO_PROGRAMME') return 'According to programme';
}
