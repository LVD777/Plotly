# Pet Pal

## Instructions

* Create a full-stack application that allows users to enter information about their pets then renders a chart visualizing the number of pets by type.

### Server-side (Python)

* In `app.py`, setup your database. Then create two routes:

  1. '/send': This route will handle both GET and POST requests. If the request method is POST, save the form data to the database. Otherwise, return the `form.html` template.
  2. '/api/pals': This route will query the database for all pets by type, then return a jsonified dictionary to the client for plotting.

### Client-side (JavaScript)

* In `/static/js/app.js`, use `d3.json()` to make a request to your API. Build a plot with the response data.
