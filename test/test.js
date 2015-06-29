var Rieussec = require('../index.js');
var should = require('chai').should();

describe('Rieussec', function () {
    describe('#reset()', function () {
        beforeEach(function (done) {
            this.rieussec = new Rieussec();
            this.rieussec.start();
            setTimeout(function() { done(); }, 10)
        });

        it('should clear the interval', function () {
            this.rieussec.reset();
            should.equal(this.rieussec._interval, null);
        });

        it('should set the state to "stopped"', function () {
            this.rieussec.reset();
            this.rieussec._state.should.equal('stopped');
        });

        it('should emit a tick', function (done) {
            this.rieussec.once('tick', function () { done(); });
            this.rieussec.reset();
        });
    });

    context('when stopped', function () {
        beforeEach(function () {
            this.rieussec = new Rieussec();
        });

        afterEach(function () {
            this.rieussec.reset();
        });

        it('should not tick', function (done) {
            var self = this;
            this.rieussec.on('tick', onTick);

            setTimeout(function() {
                self.rieussec.removeListener('tick', onTick);
                done();
            }, self.rieussec.tickRate * 2);

            function onTick() {
                throw new Error('Rieussec should not tick when stopped');
            }
        });

        describe('#start()', function () {
            it('should set the interval', function () {
                this.rieussec.start();
                this.rieussec._interval.should.be.an('object');
            });

            it('should set the state to "running"', function () {
                this.rieussec.start();
                this.rieussec._state.should.equal('running');
            });

            it('should set the start stamp to the current time', function (done) {
                var preStartStamp = this.rieussec._startStamp;
                setTimeout(function () {
                    this.rieussec.start();
                    this.rieussec._startStamp.should.not.equal(preStartStamp);
                    done();
                }.bind(this), 10);
            });
        });

        describe('#pause()', function () {
            it('should return "false"', function () {
                this.rieussec.pause().should.be.false;
            });
        });

        describe('#setMilliseconds()', function () {
            it('should set the milliseconds', function () {
                this.rieussec.setMilliseconds(100);
                this.rieussec._milliseconds.should.equal(100);
            });

            it('should set the start stamp relative to the pause stamp', function () {
                this.rieussec.setMilliseconds(100);
                this.rieussec._startStamp.should.equal(this.rieussec._pauseStamp - 100);
            });
        });
    });

    context('when started', function () {
        beforeEach(function () {
            this.rieussec = new Rieussec();
            this.rieussec.start();
        });

        afterEach(function () {
            this.rieussec.reset();
        });

        it('should tick', function (done) {
            var self = this;
            var ticksHeard = 0;
            this.rieussec.on('tick', onTick);
            this.rieussec.start();

            function onTick() {
                ticksHeard++;
                if (ticksHeard >= 2) {
                    self.rieussec.removeListener('tick', onTick);
                    self.rieussec.reset();
                    done();
                }
            }
        });

        describe('#start()', function () {
            it('should return "false"', function () {
                this.rieussec.start().should.be.false;
            });
        });

        describe('#pause()', function () {
            it('should set the pause stamp', function () {
                var prePauseStamp = this.rieussec._pauseStamp;
                this.rieussec.pause();
                this.rieussec._pauseStamp.should.not.equal(prePauseStamp);
            });

            it('should emit a tick', function (done) {
                this.rieussec.once('tick', function () {
                    done();
                });
                this.rieussec.pause();
            });

            it('should clear the interval', function () {
                this.rieussec.pause();
                should.equal(this.rieussec._interval, null);
            });

            it('should set the state to "paused"', function () {
                this.rieussec.pause();
                this.rieussec._state.should.equal('paused');
            });
        });

        describe('#setMilliseconds()', function () {
            it('should set the milliseconds', function () {
                this.rieussec.setMilliseconds(100);
                this.rieussec._milliseconds.should.equal(100);
            });

            it('should set the start stamp relative to current time', function () {
                var preStartStamp = this.rieussec._startStamp;
                this.rieussec.setMilliseconds(100);
                this.rieussec._startStamp.should.not.equal(preStartStamp);
            });
        });
    });

    context('when paused', function () {
        beforeEach(function (done) {
            var self = this;
            this.rieussec = new Rieussec();
            this.rieussec.start();
            setTimeout(function () {
                self.rieussec.pause();
                done();
            }, 10)
        });

        afterEach(function () {
            this.rieussec.reset();
        });

        it('should not tick', function (done) {
            var self = this;
            this.rieussec.on('tick', onTick);

            setTimeout(function() {
                self.rieussec.removeListener('tick', onTick);
                done();
            }, self.rieussec.tickRate * 2);

            function onTick() {
                throw new Error('Rieussec should not tick when paused');
            }
        });

        describe('#start()', function () {
            it('should set the interval', function () {
                this.rieussec.start();
                this.rieussec._interval.should.be.an('object');
            });

            it('should set the state to "running"', function () {
                this.rieussec.start();
                this.rieussec._state.should.equal('running');
            });

            it('should not change the start stamp', function (done) {
                var preStartStamp = this.rieussec._startStamp;
                setTimeout(function () {
                    this.rieussec.start();
                    this.rieussec._startStamp.should.equal(preStartStamp);
                    done();
                }.bind(this), 10);
            });
        });

        describe('#pause()', function () {
            it('should return "false"', function () {
                this.rieussec.pause().should.be.false;
            });
        });
    });
});
