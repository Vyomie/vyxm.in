from flask import Flask, request, jsonify
from flask_cors import CORS
from arthaLM import Pipeline

app = Flask(__name__)
CORS(app)  # Allows front-end requests from any origin

# Load the Artha model pipeline once
pipe = Pipeline(model_name="vyomie/artha-1")

@app.route("/artha/api", methods=["GET", "POST"])
def chat():
    try:
        if request.method == "POST":
            data = request.get_json()
            user_message = data.get("message", "")
        else:  # GET request
            user_message = request.args.get("message", "")

        if not user_message.strip():
            return jsonify({"reply": "⚠️ Please type something."}), 400

        # Generate model response
        response = pipe(user_message)
        return jsonify({"reply": response})
    
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"reply": "❌ Something went wrong."}), 500


if __name__ == "__main__":
    app.run(debug=True)
