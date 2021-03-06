const moment = require("moment/moment");
const fs = require("fs");
const OneSignal = require("onesignal-node");
const crypto = require("crypto");

const CachedDatabaseQuery = require("../../classes/CachedDatabaseQuery");
const SimpleIntervalTimer = require("../../classes/SimpleIntervalTimer");

module.exports = function (vars, pool) {

    const webhookRunner = require("../../webhookRunner")(pool);
    let webhookSent = false;

    const fiveDaysInMillis = 4.32e+8;
    const fourHoursInMillis = 1.44e+7;
    const twoHoursInMillis = 7.2e+6;
    const fiveMinsInMillis = 300000;
    const thirtySecsInMillis = 30000;
    const oneHourInMillis = 3.6e+6;

    // Current interval seems to be about 5 days and 4 hours
    const eventInterval = fiveDaysInMillis+fourHoursInMillis;
    const eventDuration = oneHourInMillis*10;

    let timer = new SimpleIntervalTimer("jerryWorkshopEvent", eventInterval, eventDuration, pool, "skyblock_jerry_events", 1000 * 60 * 10);
    setTimeout(()=>timer.run(), 7000);

    return function (req, res) {
        res.json(timer.data);
    }
};
