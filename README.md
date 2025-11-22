# Node.js & Express Learning Notes

## IPv4 Address vs Domain Name

**Example:**
```
Client: https://next.ashikdev.com/success
```

**URL Structure:**
- **Protocol** // **Domain Name** / **Resource**
- Example: `https://139.59.19.134:443`

---

## HTTP Requests & Responses

**HTTP Methods:**
- GET
- POST
- PATCH
- PUT
- DELETE

**Response Status Codes:**
- 200 (Success)
- 404 (Not Found)
- 500 (Server Error)

---

## Frontend vs Backend vs Database

### Architecture Components:
- **Load Balancer** - Distributes traffic
- **Vertical Scaling** - Increase server capacity
- **Horizontal Scaling** - Add more servers

### Database Architecture:
- **Master Database** - Handles write operations
- **Slave Database** - Handles read operations

---

## Static Website vs Dynamic Website

### Static Website
- Technologies: HTML, CSS, JavaScript
- Delivered directly to browser
- Pre-built files

### Dynamic Website
- Technologies: PHP, Python, Node.js
- Processed on server
- Generated on-the-fly

### Rendering Types:
1. **Client-Side Rendering** - Browser renders
2. **Server-Side Rendering** - Server renders
3. **Static Site Generation** - Pre-built static files

---

## JavaScript Engines by Browser

| Browser | Engine |
|---------|--------|
| Chrome | V8 |
| Firefox | SpiderMonkey |
| Safari | JavaScriptCore (Nitro) |

---

## JavaScript Runtime in Browser

**Core Components:**
- Call Stack
- Heap Memory

**Web APIs:**
- DOM (Document Object Model)
- Fetch API
- Callback Queue
- Timers
- Click Events

---

## Why Node.js is Popular

### Advantages:
- ✓ Server-side JavaScript execution
- ✓ Highly scalable backend applications
- ✓ Single-threaded, event-driven architecture
- ✓ Non-blocking I/O operations
- ✓ Perfect for real-time applications:
  - Chat applications
  - Gaming applications
  - Live streaming

### Disadvantages:
- ✗ Not ideal for CPU-intensive tasks
- ✗ Challenging for heavy computational work with multiple threads
- ⚠ Solution: Use Worker Threads for CPU-bound operations

---

## Event Loop vs Thread Pool

### Event Loop
- **What it is:** Core mechanism of Node.js that handles asynchronous operations
- **How it works:**
  1. Checks the call stack
  2. Processes callbacks from the callback queue
  3. Executes timers and I/O operations
  4. Repeats in phases (timers → pending callbacks → poll → check → close)
- **Single-threaded:** Runs on main thread
- **Best for:** I/O operations, network requests, file handling

### Thread Pool (libuv)
- **What it is:** Background worker threads managed by libuv library
- **How it works:**
  - Handles CPU-intensive operations
  - Executes heavy computations off main thread
  - Default size: 4 threads (configurable)
- **Multi-threaded:** Uses multiple threads
- **Best for:** File system operations, DNS lookups, some crypto operations

### Key Differences:

| Aspect | Event Loop | Thread Pool |
|--------|-----------|------------|
| **Threads** | Single main thread | Multiple background threads |
| **Purpose** | Coordinate async operations | Handle heavy computations |
| **Use Case** | I/O, callbacks, timers | CPU-bound tasks |
| **Blocking** | Non-blocking | Offloads blocking work |

---

## Node.js Architecture

### Event-Driven Architecture

Node.js is built on an event-driven model, which makes it highly efficient for handling concurrent operations.

### Key Components:

**1. Event Emitter**
- Special object that emits events
- Allows objects to communicate asynchronously
- Core to Node.js architecture

**2. Event Listener**
- Function that listens for specific events
- Executes when an event is emitted
- Can be attached to Event Emitters

**3. Event Loop**
- Continuously monitors for events and callbacks
- Executes callbacks in the correct order
- Manages asynchronous operations

**4. Process & Threads**
- **Process:** Entire Node.js application running
- **Main Thread:** Executes JavaScript code
- **Worker Threads:** Background threads for CPU-intensive tasks
- **Event Loop Thread:** Handles async operations

---

## Single-Threaded Server vs Multi-Threaded Server

### Single-Threaded Server (Node.js)

**How it works:**
- One main thread handles all requests
- Uses event loop for asynchronous operations
- Non-blocking I/O prevents thread blocking

**Advantages:**
- ✓ Lower memory consumption (no thread overhead)
- ✓ Simpler to develop and debug
- ✓ Excellent for I/O-heavy applications
- ✓ Scales horizontally easily
- ✓ Fewer context switches

**Disadvantages:**
- ✗ CPU-intensive tasks block the event loop
- ✗ Single core utilization by default
- ✗ Cannot leverage multiple CPU cores directly

### Multi-Threaded Server (Traditional: Java, PHP)

**How it works:**
- Creates a new thread for each incoming request
- Each thread handles one request independently
- Threads may be reused from a thread pool

**Advantages:**
- ✓ Can handle CPU-intensive operations
- ✓ Utilizes multiple CPU cores efficiently
- ✓ Straightforward request handling per thread

**Disadvantages:**
- ✗ High memory consumption (each thread needs memory)
- ✗ More complex context switching overhead
- ✗ Thread synchronization issues
- ✗ Difficult to scale to thousands of connections
- ✗ Harder to debug race conditions

### Comparison Table:

| Feature | Single-Threaded (Node.js) | Multi-Threaded (Java/PHP) |
|---------|---------------------------|--------------------------|
| **Memory Usage** | Low | High |
| **Scalability** | Very High | Limited |
| **CPU Utilization** | Single core (default) | Multiple cores |
| **Concurrency** | Event-based | Thread-based |
| **Best For** | I/O operations | CPU tasks |
| **Context Switch** | Minimal | Heavy |
| **Learning Curve** | Moderate | Steep | 
