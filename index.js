'use strict';

var events = require('events');
var inherits = require('inherits');
var NanoTimer = require('nanotimer');

/**
 * Construct a new Rieussec stopwatch
 *
 * @class Rieussec
 * @classdesc A rieussec stopwatch object.
 *
 * @param {Object} options - Options to initialize the component with
 * @param {Number} options.tickRate - How often (in milliseconds) to emit "tick" events, sets {@link Rieussec#tickRate}
 */
var Rieussec = function(options){
    events.EventEmitter.call(this);
    options = options || {};

    /**
     * How often (in milliseconds) to emit "tick" events
     * @name Rieussec#tickRate
     * @type Number
     * @default 100
     */
    this.tickRate = options.tickRate || '100m';

    // Initialize private properties
    this._hrtime = [0, 0];
    this._startHrtime = process.hrtime();
    this._pauseHrtime = process.hrtime();
    this._setState('stopped');
    this._timer = new NanoTimer();
    this._segments = [];
};

inherits(Rieussec, events.EventEmitter);

/**
 * Start the timer.
 * @memberof Rieussec
 * @method start
 */
Rieussec.prototype.start = function() {
    if (this._state === 'stopped' || this._state === 'paused') {
        this._startInterval();
        this._startHrtime = process.hrtime();
        return true;
    } else {
        return false;
    }
};

/**
 * Pause the timer.
 * @memberof Rieussec
 * @method pause
 */
Rieussec.prototype.pause = function() {
    if (this._state === 'running') {
        this._pauseHrtime = process.hrtime();
        this._segments.push([
            this._pauseHrtime[0] - this._startHrtime[0],
            this._pauseHrtime[1] - this._startHrtime[1]
        ]);
        this._stopInterval();
        this._setState('paused');
        this._tick();
        return true;
    } else {
        return false;
    }
};

/**
 * Reset the timer.
 * @memberof Rieussec
 * @method reset
 */
Rieussec.prototype.reset = function() {
    this._stopInterval();
    this._milliseconds = 0;
    this._segments = [];
    this.emit('tick', 0);
    this._setState('stopped');
};

/**
 * Manually set the timer (in milliseconds).
 * @memberof Rieussec
 * @method setMilliseconds
 */
Rieussec.prototype.setMilliseconds = function(ms) {
    var seconds = ~~(ms / 1000);
    var nanoseconds = (ms % 1000) * 1000000;
    this._hrtime = [seconds, nanoseconds];
    this._milliseconds = ms;

    // Change the start stamp to match the new duration.
    if (this._state === 'running') {
        var hrtimeNow = process.hrtime();
        this._startHrtime = [
            hrtimeNow[0] - this._hrtime[0],
            hrtimeNow[1] - this._hrtime[1]
        ];
    } else {
        this._startHrtime = [
            this._pauseHrtime[0] - this._hrtime[0],
            this._pauseHrtime[1] - this._hrtime[1]
        ];
    }

    return this._milliseconds;
};

Rieussec.prototype._tick = function() {
    if (this._state === 'stopped') return false;
    var nowHrtime = process.hrtime(this._startHrtime);
    if (this._segments.length) {
        this._hrtime = this._segments.reduce(function(prev, curr) {
            return [
                prev[0] + curr[0],
                prev[1] + curr[1]
            ]
        });

        if (this._state === 'running') {
            this._hrtime = [
                this._hrtime[0] + nowHrtime[0],
                this._hrtime[1] + nowHrtime[1]
            ]
        }
    } else {
        this._hrtime = nowHrtime;
    }
    this._milliseconds = Math.round(this._hrtime[0] * 1000 + this._hrtime[1] / 1000000);
    this.emit('tick', this._milliseconds);
    return true;
};

Rieussec.prototype._startInterval = function() {
    if (this._state === 'running') {
        return false;
    } else {
        this._setState('running');
        this._pauseHrtime = null; // If the timer is running, there is no pause time
        this._timer.setInterval(this._tick.bind(this), null, this.tickRate);
        return true;
    }
};

Rieussec.prototype._stopInterval = function() {
    if (this._state === 'running') {
        this._timer.clearInterval();
        return true;
    } else {
        return false;
    }
};

Rieussec.prototype._setState = function(state) {
    this._state = state;
    this.emit('state', state);
};

module.exports = Rieussec;
