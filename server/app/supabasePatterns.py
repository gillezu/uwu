from supabase import Client, create_client

SUPABASE_URL = "https://bknlsxulojfzkjfcyood.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrbmxzeHVsb2pmemtqZmN5b29kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5Nzc1MjQsImV4cCI6MjA0ODU1MzUyNH0.ajvJYLf3Yr0oGdMT2RyAl-6X6HEq6BA94PF7Y05lH0Y"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def getPatterns():
    response = supabase.table("Patterns").select("*").execute()
    patterns_list = response.data
    patterns_dict = {item["Name"]: item["Code"] for item in patterns_list}
    return patterns_dict


def addPattern(newPattern):
    response = supabase.table("Patterns").insert(newPattern).execute()
