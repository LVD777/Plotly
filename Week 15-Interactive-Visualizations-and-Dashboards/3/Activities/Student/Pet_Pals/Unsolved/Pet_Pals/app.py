# import necessary libraries
from sqlalchemy import func

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

# @TODO: Setup your database here


@app.route("/")
def home():
    return render_template("index.html")


# @TODO: Create a route "/send" that handles both GET and POST requests
# If the request method is POST, save the form data to the database
# Otherwise, return "form.html"


# @TODO: Create an API route "/api/pals" to return data to plot


if __name__ == "__main__":
    app.run()
