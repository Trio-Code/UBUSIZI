export default (value) => {
    // less than thousands
    if (value < 1000) {
      return value;
    }
  
    // thousands
    if (value >= 1000 && value < 10000) {
      // 1000 - 9999
      const division = value / 1000;
      const result = division.toString();
      const finalNber = result.length === 1 ? result : result.slice(0, 3);
      return finalNber + 'K';
    }
    if (value >= 10000 && value < 100000) {
      // 10,000 - 99,999
      const division = value / 1000;
      const result = division.toString();
      const finalNber = result.length === 1 ? result : result.slice(0, 4);
      return finalNber + 'K';
    }
    if (value >= 100000 && value < 1000000) {
      // 100,000 - 999,999
      const division = value / 1000;
      const result = division.toString();
      const finalNber = result.length === 1 ? result : result.slice(0, 5);
      return finalNber + 'K';
    }
  
    // Millions
    if (value >= 1000000 && value < 10000000) {
      // 1,000,000 - 9,999,999
      const division = value / 1000000;
      const result = division.toString();
      const finalNber = result.length === 1 ? result : result.slice(0, 3);
      return finalNber + 'M';
    }
    if (value >= 10000000 && value < 100000000) {
      // 10,000,000 - 99,999,999
      const division = value / 1000000;
      const result = division.toString();
      const finalNber = result.length === 1 ? result : result.slice(0, 4);
      return finalNber + 'M';
    }
    if (value >= 100000000 && value < 1000000000) {
      // 1,000,000 - 9,999,999
      const division = value / 1000000;
      const result = division.toString();
      const finalNber = result.length === 1 ? result : result.slice(0, 5);
      return finalNber + 'M';
    }
  
    // Billions
    if (value >= 1000000000 && value < 10000000000) {
      // 1,000,000,000 - 9,999,999,999
      const division = value / 1000000000;
      const result = division.toString();
      const finalNber = result.length === 1 ? result : result.slice(0, 3);
      return finalNber + 'B';
    }
    if (value >= 10000000000 && value < 100000000000) {
      // 10,000,000,000 - 99,999,999,999
      const division = value / 1000000000;
      const result = division.toString();
      const finalNber = result.length === 1 ? result : result.slice(0, 4);
      return finalNber + 'B';
    }
    if (value >= 100000000000 && value < 1000000000000) {
      // 100,000,000,000 - 999,999,999,999
      const division = value / 1000000000;
      const result = division.toString();
      const finalNber = result.length === 1 ? result : result.slice(0, 5);
      return finalNber + 'B';
    }
  };