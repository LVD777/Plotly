# import necessary libraries
from flask import (
    Flask,
    render_template,
    jsonify,
    request)

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db/db.sqlite"

db = SQLAlchemy(app)


class Pet(db.Model):
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(64))
    age = db.Column(db.Integer)

    def __repr__(self):
        return '<Pet %r>' % (self.nickname)


@app.before_first_request
def setup():
    # Recreate database each time for demo
    db.drop_all()
    db.create_all()


@app.route("/send", methods=["GET", "POST"])
def send():
    if request.method == "POST":
        nickname = request.form["nickname"]
        age = request.form["age"]

        pet = Pet(nickname=nickname, age=age)
        db.session.add(pet)
        db.session.commit()

        return "Thanks for the form data!"

    return render_template("form.html")


@app.route("/api/data")
def list_pets():
    results = db.session.query(Pet.nickname, Pet.age).all()

    pets = []
    for result in results:
        pets.append({
            "nickname": result[0],
            "age": result[1]
        })
    return jsonify(pets)


@app.route("/")
def home():
    return "Welcome!"


if __name__ == "__main__":
    app.run()
