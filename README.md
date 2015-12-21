# Rieussec
A Node.js lib for making stopwatch timers. Rieussec does not have "split" functionality at this time.
[![Build Status](https://travis-ci.org/GamesDoneQuick/rieussec.svg?branch=master)](https://travis-ci.org/GamesDoneQuick/rieussec)
[![Coverage Status](https://coveralls.io/repos/GamesDoneQuick/rieussec/badge.svg?branch=master&service=github)](https://coveralls.io/github/GamesDoneQuick/rieussec?branch=master)

## API Reference
<a name="Rieussec"></a>
## Rieussec
A rieussec stopwatch object.

**Kind**: global class  

* [Rieussec](#Rieussec)
  * [new Rieussec([tickRate])](#new_Rieussec_new)
  * [.start()](#Rieussec.start)
  * [.pause()](#Rieussec.pause)
  * [.reset()](#Rieussec.reset)
  * [.setMilliseconds(ms, [keepCycle])](#Rieussec.setMilliseconds)

<a name="new_Rieussec_new"></a>
### new Rieussec([tickRate])
Construct a new Rieussec stopwatch


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [tickRate] | <code>Number</code> | <code>100</code> | How often (in milliseconds) to emit "tick" events |

<a name="Rieussec.start"></a>
### Rieussec.start()
Start the timer.

**Kind**: static method of <code>[Rieussec](#Rieussec)</code>  
<a name="Rieussec.pause"></a>
### Rieussec.pause()
Pause the timer.

**Kind**: static method of <code>[Rieussec](#Rieussec)</code>  
<a name="Rieussec.reset"></a>
### Rieussec.reset()
Reset the timer.

**Kind**: static method of <code>[Rieussec](#Rieussec)</code>  
<a name="Rieussec.setMilliseconds"></a>
### Rieussec.setMilliseconds(ms, [keepCycle])
Manually set the timer (in milliseconds).

**Kind**: static method of <code>[Rieussec](#Rieussec)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ms | <code>Number</code> |  | The new duration of the timer |
| [keepCycle] | <code>Boolean</code> | <code>false</code> | If true, retains the decimal value from the previous tick, keeping the cycle consistent. |


