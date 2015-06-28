# Rieussec
A Node.js lib for making stopwatch timers.

Rieussec does not have "split" functionality at this time.

## API Reference
    <a name="Rieussec"></a>
## Rieussec
A rieussec stopwatch object.

**Kind**: global class  

* [Rieussec](#Rieussec)
  * [new Rieussec(options)](#new_Rieussec_new)
  * _instance_
    * [.tickRate](#Rieussec+tickRate) : <code>Number</code>
  * _static_
    * [.start()](#Rieussec.start)
    * [.stop()](#Rieussec.stop)
    * [.pause()](#Rieussec.pause)
    * [.setMilliseconds()](#Rieussec.setMilliseconds)

<a name="new_Rieussec_new"></a>
### new Rieussec(options)
Construct a new Rieussec stopwatch


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options to initialize the component with |
| options.tickRate | <code>Number</code> | How often (in milliseconds) to emit "tick" events, sets [tickRate](#Rieussec+tickRate) |

<a name="Rieussec+tickRate"></a>
### rieussec.tickRate : <code>Number</code>
How often (in milliseconds) to emit "tick" events

**Kind**: instance property of <code>[Rieussec](#Rieussec)</code>  
**Default**: <code>100</code>  
<a name="Rieussec.start"></a>
### Rieussec.start()
Start the timer.

**Kind**: static method of <code>[Rieussec](#Rieussec)</code>  
<a name="Rieussec.stop"></a>
### Rieussec.stop()
Stop the timer.

**Kind**: static method of <code>[Rieussec](#Rieussec)</code>  
<a name="Rieussec.pause"></a>
### Rieussec.pause()
Pause the timer.

**Kind**: static method of <code>[Rieussec](#Rieussec)</code>  
<a name="Rieussec.setMilliseconds"></a>
### Rieussec.setMilliseconds()
Manually set the timer (in milliseconds).

**Kind**: static method of <code>[Rieussec](#Rieussec)</code>  
