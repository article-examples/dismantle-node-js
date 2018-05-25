# Dismantle NodeJs

NodeJS is not Programming Language and not Framework.
NodeJS applications are Asynchronous, by default and its Single Thread.
Node.js eliminates the waiting, and simply continues with the next request.
NodeJS uses Single Threaded Event Loop Model, which is very memory efficient.
V8 converts JS Code to Machine Code.
A runtime environment for executing JavaScript Code.
It's Highly-scalable, data-intensive and real-time apps.
Node is ideal for I/O intensive apps.
Do Not use Node for CPU intensive apps like Video encoding / image manipulation services where it has more CPU to do calculations.
Node utilizes object pool, facade and factory design pattern.
JavaScript has a concurrency model based on an "event loop".

Blocking vs Non-Blocking?
Let me give you metaphore

    What is Non-blocking?
    Non-Blocking which is Asynchronous operation which will never block your next request.

    What is Blocking?
    Blocking which is Synchronous operation which will wait for the requested operation to get completed to do the next request.

Tradational Multi Threaded Server
    When a receive the request on the server, Thread is allocated to handle that request and during 
    this process time. Thread will be sit and waiting and it can be used to serve another request. 

    So there will be a new Thread assigned to Next request.

    Imagine, if we have large number of concurrent request to the server. At some point, we will 
    reach max threads. So new request / client have to wait for the free Threads are available or 
    we need to add more hardware like adding servers.

    So, with this kind of Architecture, We are not utilizing the resources efficiently which is 
    big drawback of blocking / Synchronous Architecture.

NodeJS Server - Concurrent request with Single-Threaded Model
How Node JS handles concurrent request with Single-Threaded model?
    Mainly based on Javascript Event based model with Javascript callback mechanism.
    Single Threaded Event Loop Model to handle multiple concurrent clients.
    event-driven and single-threaded with background workers.
     The main event loop is single-threaded but most of the I/O works run on separate threads, because the I/O APIs in Node.js are asynchronous/non-blocking by design, in order to accommodate the event loop.

What is Event Loop model?
Libuv is the library that provides the event loop to Node.js and by default creates a thread pool with four threads to offload asynchronous work to.
Event loop allows Node.js to perform non-blocking I/O operation.
Node receives those requests and places them into a Queue which is called as “Event Queue”.
Node Server internal component called "Event Loop" because it uses indefinite loop to receive requests and process them and Event Loop uses only Single Thread.
JavaScript is single-threaded & by offloads operations to the system kernel whenever possible. 

If Node pushes all those responsibilities down to the kernel then why would a thread pool be needed?
Because the kernel doesn’t support doing everything asynchronously. In those cases Node has to lock a thread for the duration of the operation so it can continue executing the event loop without blocking.
    --------------------------
        1. Set Timeout and Set Interval - Check there is any
        2. Network, Disk and Child Process - It will find those events and manage them
        3. Set Immediate - Call all your callbacks.
        4. Close Events - Internal Event to Clean up open sockets.
        5. Process.exit()
    --------------------------
    ``````````````````````````
        Sockets, File Descriptive 
        TCP Service

        Thread Based Connection
        int Server = socket();
        bind(Server, 80);
        listen(Server); // Until you call this `listen` method. Socket will be used to accept and making connections.

        while(int connection = accept(Server)) {
            pthread_create(echo, connection);
        }
    ``````````````````````````

On Each run of the event loop, Node.js checks if it is waiting for any asynchronous I/O or timers and shuts down cleanly if there are not any.

Read-Eval-Print-Loop (REPL) 

What are the various phases of Event Loop / Event Loop Order Operation?

   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │ Internal Usage
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │ retrieve new I/O events; node will block 
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │ setImmediate() callbacks called here
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │ eg. socket.on('close', ...)
   └───────────────────────────┘

    Timers
    ─────────
    This Phase executes callbacks scheduled by setTimeout() and setInterval().

    I/O callbacks
    ──────────────
    Executes all callbacks with the exception of close callbacks.
    It's scheduled by timers and setImmediate().

    Idle, prepare
    ──────────────

    Poll
    ──────────────
    
    Poll
    ──────────────


Event Loop Model
──────────────────
Each phase has a FIFO queue of callbacks to execute.
Every phase perform operations and then execute callbacks in the phase queue until queue has got exhausted or reach maximum number of callback (limit) reached and then move to next phase.
More Scheduled Operations and new events processed in the poll phase are queued by the kernel.
When, any of these operations has more request then it will be scheduled and new events processed in the poll phase are quequed by Kernal.

NOTE: There is a slight discrepancy between the Windows and the Unix/Linux implementation

What are the Event Loop errors?
What are the Event Loop drawbacks?
How timers set up in browsers?
How require function works?
What is NPM?
Where is 
What is Node-gyp?

Why V8?
V8 Engine is JIT (Just In Time) compiler written in c++ which has outperformed PHP, Ruby and python performance wise.
V8 compiles Javascript directly into assembly level code.
It has  3 major components. They are Compiler, Optimizer, Garbage Collector.
    1. Compiler : dissects the JS code
    2. Optimizer : Optimizer called crankshaft create abstract syntax tree(AST) which further converts to SSA : static single assignment and gets optimized
    3. Garbage Collector : V8 divides the memory into 2 spaces Old spaces and new spaces both belongs to heap memory and keeps track of JS objects, any new objects is stored in new space. When new space is fully occupied V8’s garbage collector removes dead objects from new space and puts into old space. Gabage collector play vial role in keeping NodeJs lightweight.

What is Libuv?
Its a C++ library.
It handles Node’s asynchronous I/O operation and main event loop.
There are thread pool reserve in Libuv which handles the thread allocation to individual I/O operations.


Built-In Modules
------------------
var http = require('http');
var fs = require('fs');
var url = require('url');

var events = require('events'); //  In this analogy, the event will be fired once (when Node is ready to call the callback) and the callback acts as the event handler.
EventEmitter is at the core of Node asynchronous event-driven architecture. 

https://github.com/felixge/node-formidable
https://github.com/expressjs/multer - Node.js middleware for handling `multipart/form-data`.
nodemailer

Notes
--------
https://github.com/nodejs/node

https://nodeschool.io/

Notes taken from Videos
https://www.youtube.com/watch?v=XUSHH0E-7zk
https://www.youtube.com/watch?v=jOupHNvDIq8

Create Node Native Addons
https://medium.com/@fhinkel?source=post_header_lockup
https://medium.com/the-node-js-collection/speed-up-your-node-js-app-with-native-addons-5e76a06f4a40
https://medium.freecodecamp.org/understanding-node-js-event-driven-architecture-223292fcbc2d


https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#poll
https://nodejs.org/api/repl.html#repl_repl
https://www.youtube.com/watch?v=P9csgxBgaZ8
https://www.youtube.com/watch?v=PNa9OMajw9w
https://www.youtube.com/watch?v=zphcsoSJMvM

https://stackoverflow.com/questions/26740888/how-node-js-event-loop-model-scales-well
https://blog.risingstack.com/node-js-at-scale-understanding-node-js-event-loop/
https://www.tutorialspoint.com/nodejs/nodejs_event_loop.htm
https://medium.com/the-node-js-collection/what-you-should-know-to-really-understand-the-node-js-event-loop-and-its-metrics-c4907b19da4c