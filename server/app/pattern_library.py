from supabasePatterns import supabase

patterns = {
    "glider": "bo$2bo$3o!",
    "blinker": "3o$!",
    "toad": "2bo$2ob$!",
    "rats": "5b2o5b$6bo5b$4bo7b$2obob4o3b$2obo5bobo$3bo2b3ob2o$3bo4bo3b$4b3obo3b$7bo4b$6bo5b$6b2o!",
    "ants": "2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o2b$2b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o$2b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o$2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o!",
    "gosper_glider_gun": "24bo11b$22bobo11b$12bo10b2o11b$11bo2bo9b2ob2o8b$11bobo6bo4bo4bo7b$9b2o9bobo2bo5bo6b$9bo12b2o2bo3bo7b$10bo7b2o4b3o4bo6b$9b2o7bo2bo7bobo6b$19bobo2b2ob2o8b$11bo7bo4b2o11b$10bobo6bo4bobo10b$9bo2bo10bo12b$10b2o!",
    "queen_bee_shuttle": "6b2o8b$5bo2bo7b$5bo3bo6b$6bobo7b$6b2o8b$10b2o4b$9bo2bo3b$8bo2bo4b$8bobo5b$9b2o!",
    "pulsar": "5b2o6b2o5b$5b2o6b2o5b$7bo4bo7b$2o2bobo4bobo2b2o$2o3bo6bo3b2o$4bo8bo4b$4bo8bo4b$2o3bo6bo3b2o$2o2bobo4bobo2b2o$7bo4bo7b$5b2o6b2o5b$5b2o6b2o!",
    "diehard": "6bo6b$2o5b2o4b$bo4bobo4b$bo10b$3bobo7b$3b2o!",
    "acorn": "bo7b$3bo5b$2obo5b$5bo3b$5bobo$6b2o!",
    "r_pentomino": "b2o3b$2o2bo$bo!",
}

for key, value in patterns.items():
    newPattern = {"Name": key, "Code": value}
    supabase.table("Patterns").insert(newPattern).execute()
    print("Pattern added")

