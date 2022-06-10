var calendar_target = CalendarApp.getCalendarById(TARGET_ID);
var calendar_source = CalendarApp.getCalendarById(SOURCE_ID);
const createdbyMsg = "created_by_AppScript" 

/**
 * カレンダーから指定期間内にあるイベントを取得する
 * @param {*} calendar カレンダーオブジェクト
 * @param {date} start_date 取得開始日付
 * @param {number} days 取得日数。0であれば start_date の分のみ取得する
 * @returns 
 */
function getEventsForDays(calendar, start_date, days) {
  if (days == 0) {
    var events = calendar.getEventsForDay(start_date);
    return events;
  } else {
    var end_time = new Date(start_date.getTime() + (days * 24 * 60 * 60 * 1000));
    var events = calendar.getEvents(start_time, end_time);
    return events;
  }
}

/**
 * カレンダー間で予定をコピーする
 * @param {*} from_calendar 
 * @param {*} to_calendar 
 * @param {*} start_date 
 * @param {*} days 
 */
function copyEventsForDay(from_calendar, to_calendar, start_date, days) {
  var events = getEventsForDays(from_calendar, start_date, days);
  events.forEach(function(e) {
    var description = `${e.getDescription()}\n\n${createdbyMsg}`;

    if (e.isAllDayEvent()) {
      to_calendar.createAllDayEvent(e.getTitle(), e.getStartTime(), {description: description, location: e.getLocation()});
    } else {
      to_calendar.createEvent(e.getTitle(), e.getStartTime(), e.getEndTime(), {description: description, location: e.getLocation()});
    }
  });
}

/**
 * カレンダーの予定を削除する
 * @param {*} calendar 
 * @param {*} start_date 
 * @param {*} days 
 */
function deleteEventsForDay(calendar, start_date, days) {
  // var events = getEventsForDays(calendar, start_date, days);
  // events.forEach(function(e) {
  //   e.deleteEvent();
  // });
}

/**
 * カレンダー間で予定を同期する
 * @param {*} start_date 
 * @param {*} days 
 */
function syncEventsForDay(start_date, days) {
  // deleteEventsForDay(calendar_shared, start_date, days);
  copyEventsForDay(calendar_source, calendar_target, start_date, days);
}

/**
 * 今日の予定を同期する
 */
function syncEventsForToday() {
  var today = new Date();
  syncEventsForDay(today, 0);
}

/**
 * 明日の予定を同期する
 */
function syncEventsForTommorow() {
  var today = new Date();
  var tomorrow = new Date(today.getTime() + (1 * 24 * 60 * 60 * 1000));
  syncEventsForDay(tomorrow, 0);
}

/**
 * 明後日から2週間後の予定を同期する
 */
function syncEventsAfter2To14Days() {
  var today = new Date();
  var two_days_after = new Date(today.getTime() + (2 * 24 * 60 * 60 * 1000));
  syncEventsForDay(two_days_after, 14);
}

/**
 * 明後日から2週間後の予定を同期する
 */
function syncEventsAfter15To60Days() {
  var today = new Date();
  var fiften_days_after = new Date(today.getTime(), (15 * 24 * 60 * 60 * 1000));
  syncEventsForDay(fiften_days_after, 60);
}