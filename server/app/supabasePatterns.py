import os

from supabase import Client, create_client

# Credentials come from the environment (see server/.env.example).
# The old project was hardcoded here and no longer exists.
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

if SUPABASE_URL and SUPABASE_KEY:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
else:
    supabase = None
    print(
        "WARNING: SUPABASE_URL / SUPABASE_KEY are not set. "
        "The pattern library (save/load/library) will be unavailable."
    )


def getPatterns():
    if supabase is None:
        return {}
    response = supabase.table("Patterns").select("*").execute()
    patterns_list = response.data
    patterns_dict = {item["Name"]: item["Code"] for item in patterns_list}
    return patterns_dict


def addPattern(newPattern):
    if supabase is None:
        return
    supabase.table("Patterns").insert(newPattern).execute()


def deletePattern(patternName):
    if supabase is None:
        return
    supabase.table("Patterns").delete().eq("Name", patternName).execute()
