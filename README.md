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
Node receives those requests and places them into a Queue which is called as “Event Queue”.
Node Server internal component called "Event Loop" because it uses indefinite loop to receive requests and process them and Event Loop uses only Single Thread.
Event loop allows Node.js to perform non-blocking I/O operation
JavaScript is single-threaded & by offloads operations to the system kernel whenever possible. 

If Node pushes all those responsibilities down to the kernel then why would a thread pool be needed?
Because the kernel doesn’t support doing everything asynchronously. In those cases Node has to lock a thread for the duration of the operation so it can continue executing the event loop without blocking.


Read-Eval-Print-Loop (REPL) 

What are the various phases of Event Loop / Event Loop Order Operation?

   ┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<─────┤  connections, │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘

Each phase has a FIFO queue of callbacks to execute.
When, any of these operations has more request then it will be scheduled and new events processed in the poll phase are quequed by Kernal

What are the Event Loop errors?
What are the Event Loop drawbacks?
How timers set up in browsers?
How require function works?

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