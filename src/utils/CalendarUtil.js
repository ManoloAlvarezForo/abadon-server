import moment from 'moment';

/**
 * Default days per month.
 */
const DEAFAULT_DAYS_PER_MONTH = 35;

/**
 * Gets the start date and end date according the month year locale and days per month.
 *
 * @param {Number} month Month number.
 * @param {Number} year Year number.
 * @param {String} locale Locale string.
 * @param {number} daysPerMonth Days per Month is default if undefined.
 */
export const getStartAndEndDateFromMonth = (
  month,
  year,
  locale,
  daysPerMonth = DEAFAULT_DAYS_PER_MONTH,
) => {
  let now = moment();
  now.locale(locale);
  now.set('month', month);
  now.set('year', year);
  const myMoment = now.clone().set({ date: 1 });
  const daysInMonth = myMoment.daysInMonth();
  const weekDay = parseInt(myMoment.format('d'));
  const startDate = myMoment.subtract(weekDay, 'days');
  const otherMoment = now.set({ date: daysInMonth });
  const endDate = otherMoment.add(daysPerMonth - daysInMonth - weekDay, 'days');

  return {
    startDate: startDate,
    endDate: endDate,
  };
};
