import json

with open("messages/en.json", "r") as f:
    data = json.load(f)

# The current 'doors' key has manifesto content. Move it to 'manifesto' and add proper doors
home = data["Home"]

# Check what's in doors
print("Current doors:", json.dumps(home.get("doors", {}), indent=2)[:500])
print("Current manifesto:", json.dumps(home.get("manifesto", {}), indent=2)[:200])

# If doors contains manifesto content (heading starts with "The next decade"), fix it
doors = home.get("doors", {})
if doors.get("heading", "").startswith("The next decade"):
    # Move doors content to manifesto
    home["manifesto"] = doors
    # Add proper doors structure
    home["doors"] = {
        "eyebrow": "Three ways we work",
        "heading": "Pick the door that matches you",
        "build": {
            "eyebrow": "Build",
            "title": "Production-grade software",
            "body": "Shippable AI features, real interfaces, stakeholder-friendly communication. Built fast, without dropping the quality bar.",
            "promise": "Every engagement ends with something running in production, not a slide deck.",
            "cta": "Start a build"
        },
        "ventures": {
            "eyebrow": "Ventures",
            "title": "Our own products",
            "body": "We're hunting for the golden egg. Real pipeline, real progress. Open to collaborating with people who have ideas.",
            "promise": "We ship our own MVPs and share what we learn along the way.",
            "cta": "See the pipeline"
        },
        "think": {
            "eyebrow": "Think",
            "title": "Knowledge & community",
            "body": "Articles, tutorials, showcases, newsletter. Building a name in the Saudi startup and ventures community. Not just sharing knowledge — building influence.",
            "promise": "The same thinking that goes into the work, published.",
            "cta": "Read the latest"
        }
    }
    print("Fixed! New doors:", json.dumps(home["doors"], indent=2)[:300])

with open("messages/en.json", "w") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Done")