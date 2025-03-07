from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class ChatLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_message = db.Column(db.String, nullable=False)
    bot_response = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"<ChatLog {self.id} | {self.user_message} -> {self.bot_response}>"
