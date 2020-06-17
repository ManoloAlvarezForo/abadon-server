import Event from '../models/event';
import { getStartAndEndDateFromMonth } from '../utils/CalendarUtil';
import { groupBy } from '../utils/arrayUtils';
import moment from 'moment';

/**
 * Gets All events.
 */
export const getEvents = async (filter = 'preaching') => {
  const allEvents = await Event.find({}).sort({ date: 'asc' });
  const groupByDate = groupBy('date');
  const groupedEvents = groupByDate(allEvents);
  const response = Object.keys(groupedEvents).map(e => {
    return {
      date: e,
      events: groupedEvents[e],
    };
  });

  return response;
};

/**
 * Gets Events by from date and to date.
 *
 * @param {String} from Date to specifies the from.
 * @param {String} to Date to specifies the to.
 */
export const getEventsByDate = async (fromDateParam, toDateParam) => {
  let response = [];
  let fromDate = moment(fromDateParam);
  let toDate = moment(toDateParam);

  while (!moment(fromDate).isAfter(toDate)) {
    let newDate = { date: fromDate.format('YYYY-MM-DD'), events: [] };
    let auxDate = await Event.find({ date: fromDate.format('YYYY-MM-DD') });
    if (auxDate.length !== 0) {
      newDate.events = newDate.events.concat(auxDate);
      response.push(newDate);
    }

    fromDate.add(1, 'days');
  }

  return response;
};

/**
 * Gets the events by month and year date also use the locale and the days per month to calculate the events.
 *
 * @param {String} month Month number to be used to find Events.
 * @param {String} year Year number to be used to find Events.
 * @param {String} locale Locale to handle Dates according the locale.
 * @param {String} daysPerMonth Days per month to extra days.
 */
export const getEventsByMonth = async (month, year, locale, daysPerMonth) => {
  const calendarUtil = getStartAndEndDateFromMonth(
    month,
    year,
    locale,
    daysPerMonth
  );
  const fromDate = calendarUtil.startDate;
  const toDate = calendarUtil.endDate;
  let response = [];

  while (!moment(fromDate).isAfter(toDate)) {
    let auxDate = await Event.find({ date: fromDate.format('YYYY-MM-DD') });
    if (auxDate.length !== 0) {
      let dayAux = { date: fromDate.format('YYYY-MM-DD'), events: [] };
      dayAux.events = dayAux.events.concat(auxDate);
      response.push(dayAux);
    }

    fromDate.add(1, 'days');
  }

  return response;
};

/**
 * Gets the recent events according a today date that gets the next 2 events.
 *
 * @param {String} today String date that represent today.
 */
export const getRecentEvents = async today => {
  let now = moment(today);
  let response = [];
  let finishFind = false;
  let counter = 0;
  const allEvents = await getEvents();

  const todayEvent = allEvents.find(e => e.date === today);

  todayEvent !== undefined && (response = [...response, todayEvent]);

  while (counter !== 2 && finishFind === false) {
    const eventAfterToday = allEvents.find(e => moment(e.date).isAfter(now));

    if (eventAfterToday) {
      response = [...response, eventAfterToday];
      now = moment(eventAfterToday.date);
      counter++;
    } else {
      finishFind = true;
    }
  }

  return response;
};

/**
 * Adds the new Event based in the arguments.
 *
 * @param {Object} args Contanis the arguments to be added in the new intem.
 */
export const addEvent = async args => {
  const newEvent = new Event({ ...args });
  const response = await newEvent.save();
  return response;
};

/**
 * Gets an Event according the id.
 *
 * @param {String} id ID to be used to fing the Event.
 */
export const getEventById = async id => {
  return await Event.findById(id);
};

/**
 * Updates the Events using the Event Object to update.
 *
 * @param {Object} EventToUpdate
 */
export const updateEventById = async EventToUpdate => {
  const event = await Event.findByIdAndUpdate(EventToUpdate.id, EventToUpdate);
  let eventUpdated = { updated: false, Event: {} };

  if (event !== null) {
    eventUpdated.updated = true;
    eventUpdated.Event = await Event.findById(EventToUpdate.id);
  }

  return eventUpdated;
};

/**
 * Removes an Event using an Id.
 *
 * @param {
 * } idToRemove
 */
export const removeEventById = async idToRemove => {
  return await Event.findByIdAndRemove(idToRemove);
};
