import sqlite3
from flask import Flask, render_template

app = Flask(__name__, template_folder="../templates", static_folder="../static")

# parametrul la functia route reprezinta url-ul unde este servit fisierul html
@app.route("/")
def index():
    return render_template("index.html")

app.run(host="0.0.0.0", port=80)