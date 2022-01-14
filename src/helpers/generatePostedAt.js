export default (postedAt) => {
  if (postedAt === 'ok') return 'Just Now';
  const current = new Date();
  const diffDate = current - postedAt;
  const display = new Date(postedAt);
  const months = [
    null,
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  if (diffDate <= 1000) {
    return 'Just Now';
  }
  if (diffDate > 1000 && diffDate < 60000) {
    const notation = diffDate / 6000;
    return `${notation.toFixed(0)} ${
      notation.toFixed(0) === '1' ? 'SECOND' : 'SECONDS'
    } AGO`;
  }
  if (diffDate >= 60000 && diffDate < 3600000) {
    const notation = diffDate / 60000;
    return `${notation.toFixed(0)} ${
      notation.toFixed(0) === '1' ? 'MINUTE' : 'MINUTES'
    } AGO`;
  }
  if (diffDate >= 3600000 && diffDate < 86400000) {
    const notation = diffDate / 3600000;
    return `${notation.toFixed(0)} ${
      notation.toFixed(0) === '1' ? 'HOUR' : 'HOURS'
    } AGO`;
  }
  if (diffDate >= 86400000 && diffDate < 601200000) {
    const notation = diffDate / 86400000;
    return `${notation.toFixed(0)} ${
      notation.toFixed(0) === '1' ? 'DAY' : 'DAYS'
    } AGO`;
  }
  if (diffDate >= 601200000 && diffDate < 2415600000) {
    const notation = diffDate / 601200000;
    return `${notation.toFixed(0)} ${
      notation.toFixed(0) === '1' ? 'WEEK' : 'WEEKS'
    } AGO`;
  }
  if (diffDate >= 2415600000 && diffDate < 28944000000) {
    const notation = diffDate / 2415600000;
    return `${notation.toFixed(0)} ${
      notation.toFixed(0) === '1' ? 'MONTH' : 'MONTHS'
    } AGO`;
  }
  return `${display.getDay()} ${
    months[display.getMonth() + 1]
  }. ${display.getFullYear()}`;
};
