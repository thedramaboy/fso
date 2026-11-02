<h2>0.4: New note diagram</h2>

```
sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: Type "Trust the process" and click Save
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of server: Server saves the new note to database
    server-->>browser: HTTP 302 Found (Redirect to /notes)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: Browser starts executing JS code that fetches JSON

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{content: "lol", date: "2025-12-27T12:06:30.509Z"}, ... ]
    deactivate server

    Note right of browser: Browser executes the callback function that renders the notes
```

<h2>0.5: Single page app diagram</h2>

```
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: Browser starts executing JS code that fetches JSON

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{content: "modi maderchod", date: "2025-12-27T12:06:43.909Z"}, ... ]
    deactivate server

    Note right of browser: Browser executes the callback function that renders the notes
```

<h2>0.6: New note in Single page app diagram</h2>

```
sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: Type "New Note" and click Save
    
    Note right of browser: JS code adds the new note to the local list and rerenders the UI

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: Content-type: application/json<br/>{content: "Hi it's test!", date: "2025-12-28T04:14:47.032Z"}
    server-->>browser: HTTP 201 Created
    deactivate server

    Note right of browser: No redirection or page reload occurs
```
