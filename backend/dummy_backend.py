from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import random
from fastapi import Query, HTTPException  

app = FastAPI()

# CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/live")
def get_live_data():
    return {
        "timestamp": datetime.now().isoformat(),
        "sensors": {
            "current_sensor_1": round(random.uniform(0.1, 5.0), 2),
            "current_sensor_2": round(random.uniform(0.1, 5.0), 2),
            "wattage_sensor_1": round(random.uniform(20, 1200), 2),
            "wattage_sensor_2": round(random.uniform(20, 1200), 2),
            "temperature_1": round(random.uniform(25, 45), 2),
            "temperature_2": round(random.uniform(25, 45), 2),
            "ambient_temperature": round(random.uniform(20, 35), 2),
            "humidity": round(random.uniform(30, 70), 2),
        }
    }

@app.get("/api/history")
def get_history(date: str = Query(None)):
    try:
        base_date = datetime.strptime(date, "%Y-%m-%d") if date else datetime.now()
        history = []

        for i in range(24):
            hour_data = {
                "timestamp": (base_date.replace(hour=i, minute=0, second=0, microsecond=0)).isoformat(),
                "wattage": round(random.uniform(200, 800), 2),
                "temperature": round(random.uniform(25, 35), 2)
            }
            history.append(hour_data)

        return {
            "date": base_date.strftime("%Y-%m-%d"),
            "data": history
        }

    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")



