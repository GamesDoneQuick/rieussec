'use strict';

var events = require('events');
var inherits = require('inherits');

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
    this.tickRate = options.tickRate || 100;

    // Initialize private properties
    this._milliseconds = 0;
    this._startStamp = Date.now();
    this._pauseStamp = Date.now();
    this._state = 'stopped';
};

inherits(Rieussec, events.EventEmitter);

/**
 * Start the timer.
 * @memberof Rieussec
 * @method start
 */
Rieussec.prototype.start = function() {
    if (this._state === 'stopped') {
        this._startStamp = Date.now();
        this._startInterval();
        return true;
    } else if (this._state === 'paused') {
        this._startInterval();
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
        this._pauseStamp = Date.now();
        this._tick();
        this._stopInterval();
        this._state = 'paused';
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
    this._tick(0);
    this._state = 'stopped';
};

/**
 * Manually set the timer (in milliseconds).
 * @memberof Rieussec
 * @method setMilliseconds
 */
Rieussec.prototype.setMilliseconds = function(ms) {
    this._milliseconds = ms;

    // Need to change the start stamp to match the new duration.
    if (this._state === 'running') {
        this._startStamp = Date.now() - this._milliseconds;
    } else {
        this._startStamp = this._pauseStamp - this._milliseconds;
    }

    return this._milliseconds;
};

Rieussec.prototype._tick = function(ms) {
    if (ms) {
        this.emit('tick', ms);
    } else if (this._state === 'running') {
        this._milliseconds = Date.now() - this._startStamp;
        this.emit('tick', this._milliseconds);
        return true;
    } else {
        return false;
    }
};

Rieussec.prototype._startInterval = function() {
    if (this._state === 'running') {
        return false;
    } else {
        this._state = 'running';
        this._pauseStamp = null; // If the timer is running, there is no pause time
        this._interval = setInterval(this._tick.bind(this), this.tickRate);
        return true;
    }
};

Rieussec.prototype._stopInterval = function() {
    if (this._state === 'running') {
        clearInterval(this._interval);
        this._interval = null;
        return true;
    } else {
        return false;
    }
};

module.exports = Rieussec;
