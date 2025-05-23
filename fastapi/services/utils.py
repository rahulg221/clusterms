from dotenv import load_dotenv
from fastapi import Request
import supabase
import os
import string
import re
import json
from datetime import datetime, timedelta
import calendar
import pytz

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")  

supabase_client = supabase.create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

def get_user_key(request: Request):
    return request.state.user.get("sub", request.client.host)

def parse_embedding(note: dict) -> dict:
    if isinstance(note.get("embedding"), str):
        note["embedding"] = json.loads(note["embedding"])
    return note

def preprocess_text(text: str) -> str:
    """
    Preprocesses a given text by performing the following steps:
        1. Converts the text to lower case.
        2. Removes punctuation and extra spaces.
    Args:
        text (str): The text to be preprocessed.
    Returns:
        str: The preprocessed text.
    """

    text = text.lower()
    text = text.translate(str.maketrans("", "", string.punctuation))
    text = " ".join(text.split())
    return text

def extract_datetime(text, base_datetime=None):
    """
    Extract date and time information from natural language text using custom patterns.
    
    Args:
        text (str): Input text containing date/time information
        base_datetime (datetime, optional): Reference datetime (defaults to current time)
        
    Returns:
        datetime: The extracted datetime object, or None if no datetime found
    """

    if base_datetime is None:
        base_datetime = datetime.now()
    
    # Normalize text
    text = text.lower()
    
    result_date = base_datetime.replace(hour=0, minute=0, second=0, microsecond=0)
    time_found = False
    date_found = False
    
    # Handle relative dates
    if "tomorrow" in text:
        result_date += timedelta(days=1)
        date_found = True
    elif "today" in text:
        date_found = True
    elif "yesterday" in text:
        result_date -= timedelta(days=1)
        date_found = True
    
    # Handle weekday references
    weekday_pattern = r'\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b'
    weekday_match = re.search(weekday_pattern, text)
    if weekday_match and not date_found:
        target_weekday = ["monday", "tuesday", "wednesday", "thursday", 
                          "friday", "saturday", "sunday"].index(weekday_match.group(1))
        current_weekday = result_date.weekday()
        days_ahead = (target_weekday - current_weekday) % 7
        
        # If days_ahead is 0, it means today - but if "next" is present, it means next week
        if days_ahead == 0 and "next" not in text:
            days_ahead = 7
        
        # If "next" is present, it means next week
        if "next" in text and text.find("next") < text.find(weekday_match.group(1)):
            days_ahead += 7
            
        result_date += timedelta(days=days_ahead)
        date_found = True
    
    # Handle month and day (e.g., "May 1st")
    month_day_pattern = r'\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})(?:st|nd|rd|th)?\b'
    month_day_match = re.search(month_day_pattern, text)
    if month_day_match:
        month_name = month_day_match.group(1)
        month_num = ["january", "february", "march", "april", "may", "june", 
                     "july", "august", "september", "october", "november", "december"].index(month_name) + 1
        day = int(month_day_match.group(2))
        
        # Validate day number for the month
        max_days = calendar.monthrange(result_date.year, month_num)[1]
        if 1 <= day <= max_days:
            # If the date has already passed this year, consider it for next year
            candidate_date = result_date.replace(month=month_num, day=day)
            if candidate_date < base_datetime:
                candidate_date = candidate_date.replace(year=candidate_date.year + 1)
            result_date = candidate_date
            date_found = True
    
    # Extract time
    time_patterns = [
        (r'(\d{1,2})(?::(\d{2}))?\s*(am|pm)', 
         lambda h, m, ampm: (int(h) % 12 + (12 if ampm.lower() == 'pm' else 0), int(m) if m else 0)),
        (r'(\d{1,2})(?::(\d{2}))?(?!\s*(?:am|pm))', 
         lambda h, m, _: (int(h), int(m) if m else 0)),
        (r'\b(noon)\b', lambda _, __, ___: (12, 0)),
        (r'\b(midnight)\b', lambda _, __, ___: (0, 0))
    ]
    
    for pattern, time_func in time_patterns:
        time_match = re.search(pattern, text)
        if time_match:
            if pattern.startswith(r'\b'):  # Special cases like noon/midnight
                hour, minute = time_func(None, None, None)
            else:
                hour, minute = time_func(time_match.group(1), time_match.group(2), 
                                        time_match.group(3) if len(time_match.groups()) > 2 else None)
            result_date = result_date.replace(hour=hour, minute=minute)
            time_found = True
            break
    
    # Convert to a timezone-aware datetime
    timezone = pytz.timezone("America/New_York")  
    result_date = timezone.localize(result_date)
    
    google_calendar_format = result_date.isoformat()

    if date_found or time_found:
        return google_calendar_format
    
    return None

def remove_filler_phrases(text):
    for pattern in filler_phrases:
        text = re.sub(pattern, "", text, flags=re.IGNORECASE)
    return text.strip()

def remove_time_keywords(text):
    for pattern in time_keywords:
        text = re.sub(pattern, "", text, flags=re.IGNORECASE)
    return text.strip()

def get_category_examples():
    return category_examples

filler_phrases = [
    r"\blet'?s\b",
    r"\btry\b",
    r"\bmaybe\b",
    r"\bprobably\b",
    r"\bjust\b",
    r"\bkind of\b",
    r"\bwe\b",
    r"\bshould\b",
    r"\bcan\b",
    r"\bgonna\b",
    r"\bgoin[g']? to\b",
    r"\bsee if\b",
    r"\bneed to\b",
    r"\bhave to\b",
    r"\bwanna\b",
    r"\bwant to\b",
    r"\bget to\b",
    r"\bmake sure\b",
    r"\basap\b",
    r"\beventually\b",
    r"\btry to\b",
    r"\bsoon\b",
    r"\bsometime\b",
    r"\bhopefully\b",
    r"\bmight\b",
    r"\bby the way\b",
    r"\bI think\b",
    r"\ba bit\b",
    r"\bkind of\b",
    r"\bsort of\b",
    r"\bto be honest\b",
    r"\bno rush\b",
    r"\ba little\b",
    r"\baround\b",
    r"\babout\b",
    r"\bthis\b",
    r"\bthat\b",
    r"\bit\b",
    r"\bon\b",
    r"\bin\b",
    r"\bat\b",
    r"\bthe\b",
    r"\bfor\b",
    r"\bwith\b",
    r"\bif possible\b",
    r"\bif you can\b",
]

time_keywords = [
            r"\b(?:on|at|by|around|this|next|the|a|an|in|to|from|between|today|tomorrow|noon|midnight|morning|evening|afternoon|night|pm|am|[0-9]{1,2}(:[0-9]{2})?\s?(am|pm)?)\b"
        ]

category_examples = [
    "Project Ideas",
    "App Features",
    "Meal Prep Recipes",
    "Gym Workouts",
    "Book Ideas",
    "Song Lyric Ideas",
    "Grocery Lists",
    "Startup Concepts",
    "Content Ideas",
    "Bucket List Items",
    "Gift Ideas",
    "Travel Itinerary",
    "Side Hustle Ideas",
    "Daily Affirmations",
    "Favorite Movies"
    "Favorite Quotes",
]