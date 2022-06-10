var calendarTarget = CalendarApp.getCalendarById(TARGET_ID);
var calendarSource = CalendarApp.getCalendarById(SOURCE_ID);
const deleteTargetMsg = "[created_by_AppScript]" 

/**
 * カレンダーから指定期間内にあるイベントを取得する
 * @param {*} calendar カレンダーオブジェクト
 * @param {date} startDate 取得開始日付
 * @param {number} days 取得日数。
 * @returns 
 */
function getEventsForDays(calendar, startDate, days) {
  var events;
  days = days - 1;
  if (days == 0) {
    events = calendar.getEventsForDay(startDate);
  } else {
    var endDate = new Date(startDate.getTime() + (days * 24 * 60 * 60 * 1000));
    events = calendar.getEvents(startDate, endDate);
  }
  return events;
}

/**
 * カレンダー間で予定をコピーする
 * @param {*} sourceCalendar 
 * @param {*} targetCalendar 
 * @param {*} startDate 
 * @param {*} days 
 */
function copyEventsForDay(sourceCalendar, targetCalendar, startDate, days) {
  var events = getEventsForDays(sourceCalendar, startDate, days);
  events.forEach(function(e) {
    var description = `${e.getDescription()}\n\n${deleteTargetMsg}`;

    if (e.isAllDayEvent()) {
      targetCalendar.createAllDayEvent(e.getTitle(), e.getStartTime(), {description: description, location: e.getLocation()});
    } else {
      targetCalendar.createEvent(e.getTitle(), e.getStartTime(), e.getEndTime(), {description: description, location: e.getLocation()});
    }
  });
}

/**
 * カレンダーの予定を削除する
 * @param {*} targetCalendar 
 * @param {*} startDate 
 * @param {*} days 
 */
function deleteEventsForDay(targetCalendar , startDate, days) {
  var events = getEventsForDays(targetCalendar , startDate, days);
  events.forEach(function(e) {
    // スクリプトで作成された以外は削除を実行しない
    if(e.getDescription().indexOf(deleteTargetMsg) == -1) return;

    e.deleteEvent();
    // console.log("this event is deleted:", e.getTitle());
  });
}

/**
 * カレンダー間で予定を同期する
 * @param {*} startDate 
 * @param {*} days 
 */
function syncEventsForDay(startDate, days = 1) {
  deleteEventsForDay(calendarTarget, startDate, days);
  copyEventsForDay(calendarSource, calendarTarget, startDate, days);
}

/**
 * 今日の予定を同期する
 */
function syncEventsToday() {
  var today = new Date();
  syncEventsForDay(today);
}

/**
 * 明日の予定を同期する
 */
function syncEventsTommorow() {
  var today = new Date();
  var tomorrow = new Date(today.getTime() + (1 * 24 * 60 * 60 * 1000));
  syncEventsForDay(tomorrow);
}

/**
 * 明後日から2週間後の予定を同期する
 */
function syncEvents2Weeks() {
  var today = new Date();
  var twoDaysAfter = new Date(today.getTime() + (2 * 24 * 60 * 60 * 1000));
  syncEventsForDay(twoDaysAfter, 14);
}

/**
 * 2週間後から2か月後の予定を同期する
 */
function syncEvents2Months() {
  var today = new Date();
  var twoDaysAfter = new Date(today.getTime(), (15 * 24 * 60 * 60 * 1000));
  syncEventsForDay(twoDaysAfter, 60);
}