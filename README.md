# Dismantle NodeJs

A runtime environment for executing JavaScript Code.
V8 converts JS Code to Machine Code.
Node is not Programming Language and not Framework.
It's Highly-scalable, data-intensive and real-time apps.
Node applications are Asynchronous, by default and its Single Thread.
Node is ideal for I/O intensive apps.
Do Not use Node for CPU intensive apps like Video encoding / image manipulation services where it has more CPU to do calculations.

JavaScript has a concurrency model based on an "event loop". 

Blocking vs Non-Blocking?
Let me give you metaphore

What is Non-blocking?
Non-Blocking which is Asynchronous operation which will never block your next request.

What is Blocking?
Blocking which is Synchronous operation which will wait for the requested operation to get completed to do the next request.

When a receive the request on the server, Thread is allocated to handle that request and during this process time. Thread will be sit and waiting and it can be used to serve another request.

So there will be a new Thread assigned to Next request.

Imagine, if we have large number of concurrent request to the server. At some point, we will reach max threads. So new request / client have to wait for the free Threads are available or we need to add more hardware like adding servers.

So, with this kind of Architecture, We are not utilizing the resources efficiently which is big drawback of blocking / Synchronous Architecture.

Concurrent request with Single-Threaded Model
Single Threaded Event Loop Model to handle multiple concurrent clients.

What is Event Loop model?

Node receives those requests and places them into a Queue which is called as “Event Queue”.
Node Server internal component called "Event Loop" and it uses indefinite loop to receive requests and process them.
Event Loop uses only Single Thread.

Read-Eval-Print-Loop (REPL) 

Event Loop Order Operation

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

What is Node-gyp?