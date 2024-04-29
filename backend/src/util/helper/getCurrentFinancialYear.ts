/////////// Getting Current Financial Year
export const getCurrFinancialYear = () => {
  const currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  if (currentMonth < 4) currentYear = currentYear - 1;

  const nextYear = currentYear + 1;

  const startDate = `${currentYear}-04-01`;
  const endDate = `${nextYear}-03-31`;

  return { startDate, endDate };
};

///// Getting the previous Financial Year
export const getPrevFinancialYear = () => {
  const currentMonth = new Date().getMonth();
  let prevYear = new Date().getFullYear() - 1; // 2023

  if (currentMonth < 4) prevYear = prevYear - 1;

  const nextYear = prevYear + 1;

  const prevStartDate = `${prevYear}-04-01`;
  const prevEndDate = `${nextYear}-03-31`;

  return { prevStartDate, prevEndDate };
};

/////// Getting the previous 8 Financial Year including Current Finanacial Year
export const getFinancialYears = async () => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const number = 8;
  const allYears = [];

  for (let i = 1; i < number; i++) {
    let startYear = currentYear;

    if (i === 1) {
      if (currentMonth < 4) {
        startYear = currentYear - 1;
      }
    } else {
      if (currentMonth < 4) {
        startYear = currentYear - i;
      } else {
        startYear = currentYear - i + 1;
      }
    }

    const startDate = `${startYear}-04-01`;
    const endDate = `${startYear + 1}-03-31`;
    allYears.push({ startDate, endDate });
  }
  return allYears;
};
