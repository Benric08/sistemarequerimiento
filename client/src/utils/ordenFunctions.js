export function orderByDate(a, b) {
    const dateA = new Date(a);
    const dateB = new Date(b);
  
    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else {
      return 0;
    } 
  }

