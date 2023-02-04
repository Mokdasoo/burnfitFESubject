export interface dateObj {
    year: number;
    month: number;
    date: number;
    day : number;
}
export interface MonthObj {
    year: number;
    month: number;
    date: dateObj[][];
}
/** Date 객체를 받아 year, month, date, day 정보를 반환하는 함수 */
export const getDateInfo = (dateObj: Date) => {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    const day = dateObj.getDay();
    return { year, month, date, day };
}

export const getMonthDate = (dateinfo: dateObj) => {
    /**구하고 싶은 달의 첫째 날 정보 */
    const currMonthFirstDate = getDateInfo(
      new Date(dateinfo.year, dateinfo.month - 1, 1)
    );
    /**이전 달의 마지막 날 정보 */
    const prevMonthLastDate = getDateInfo(
      new Date(currMonthFirstDate.year, currMonthFirstDate.month - 1, 0)
    );

    /**달력에 표시되는 첫 번째 날짜 */
    const startDate =
      prevMonthLastDate.day === 0 // 일요일
        ? prevMonthLastDate
        : prevMonthLastDate.day === 6 // 토요일
        ? currMonthFirstDate
        : getDateInfo(
            new Date(currMonthFirstDate.year, currMonthFirstDate.month - 1, -prevMonthLastDate.day)
          );
    let monthDate = [];
    for (let i = 0; i < 42; i++) {
      monthDate.push(
        getDateInfo(
          new Date(startDate.year, startDate.month - 1, startDate.date + i)
        )
      );
    }
  
    const week1 = monthDate.slice(0, 7);
    const week2 = monthDate.slice(7, 14);
    const week3 = monthDate.slice(14, 21);
    const week4 = monthDate.slice(21, 28);
    const week5 = monthDate.slice(28, 35);
    const week6 = monthDate.slice(35);
  
    const week4LastDate = week4[week4.length - 1];
    const week5LastDate = week5[week5.length - 1];
    const lastDate = new Date(currMonthFirstDate.year, currMonthFirstDate.month, 0);
    const isLastWeek4 =
      week4LastDate.month !== currMonthFirstDate.month || (week4LastDate.date === lastDate.getDate());
    const isLastWeek5 =
      week5LastDate.month !== currMonthFirstDate.month || (week5LastDate.date === lastDate.getDate());
    const dateArr = [week1, week2, week3, week4];
  
    return {
      year: currMonthFirstDate.year,
      month: currMonthFirstDate.month,
      date: isLastWeek4
        ? dateArr
        : isLastWeek5
        ? [...dateArr, week5]
        : [...dateArr, week5, week6],
    };
  }

