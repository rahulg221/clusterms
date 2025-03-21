from services.clustering_service import group_and_label_notes
from services.calendar_service import create_google_event
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from imports import *

app = FastAPI()

# Allow requests from http://localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cluster request body that takes in a list of strings
class Notes(BaseModel):
    notes: list[str]

class Event(BaseModel):
    note: str
    
@app.get("/")
def main():
    return {"/label": "Clustering and labeling text.", "/event": "Creating a Google Calendar event."}

@app.post("/event")
async def create_new_event(request_body: Event):
    note = request_body.note
    return create_google_event(note)

@app.post("/label")
async def cluster_notes(request_body: Notes):
    notes = request_body.notes
    return group_and_label_notes(notes)