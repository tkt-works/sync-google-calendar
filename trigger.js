function resetTrigger() {
  deleteTrigger();
  createTriggerEveryMinutes("syncEventsForToday", 15); // 毎日の予定を15分おきに同期
  createTriggerEveryHours("syncEventsForTommorow", 2); // 明日の予定を2時間おきに同期
  createTriggerEveryDays("syncEventsAfter2To14Days", 1); // 明後日から2週間後の予定を1日おきに同期
  createTriggerEveryWeeks("syncEventsAfter15To60Days", 1); // 2週間後から2か月後の予定を1週間おきに同期
}

function createTriggerEveryMinutes(funcName, minutes) {
  ScriptApp.newTrigger(funcName)
    .timeBased()
    .everyMinutes(minutes)
    .create();
}

function createTriggerEveryHours(funcName, hours) {
  ScriptApp.newTrigger(funcName)
    .timeBased()
    .everyHours(hours)
    .create();
}

function createTriggerEveryDays(funcName, days) {
  ScriptApp.newTrigger(funcName)
    .timeBased()
    .everyDays(days)
    .create();
}

function createTriggerEveryWeeks(funcName, weeks) {
  ScriptApp.newTrigger(funcName)
    .timeBased()
    .everyDays(weeks)
    .create();
}

function deleteTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}