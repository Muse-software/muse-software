import json

with open("messages/en.json", "r") as f:
    data = json.load(f)

home = data["Home"]
doors = home.get("doors", {})

if doors.get("heading", "").startswith("We don't pitch"):
    home["manifesto"] = doors
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
            "body": "We are hunting for the golden egg. Real pipeline, real progress. Open to collaborating with people who have ideas.",
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
    print("EN: Fixed!")
else:
    print("EN: doors heading is:", doors.get("heading", "NOT FOUND")[:50])
    print("EN: needs doors added?", "doors" not in home)

with open("messages/en.json", "w") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# Now fix Arabic
with open("messages/ar.json", "r") as f:
    data = json.load(f)

home = data["Home"]
if "doors" not in home:
    home["doors"] = {
        "eyebrow": "ثلاث طرق نشتغل بها",
        "heading": "اختر الباب اللي يناسبك",
        "build": {
            "eyebrow": "بناء",
            "title": "برامج جاهزة للإنتاج",
            "body": "ميزات ذكاء اصطناعي قابلة للتسليم، واجهات حقيقية، تواصل يناسب غير المتخصصين. بناء سريع، بدون التخلي عن معيار الجودة.",
            "promise": "كل مشروع ينتهي بشيء يشتغل بالإنتاج، مو عرض تقديمي.",
            "cta": "ابدأ مشروع بناء"
        },
        "ventures": {
            "eyebrow": "مبادرات",
            "title": "منتجاتنا الخاصة",
            "body": "نطارد البيضة الذهبية. خطوط أنتاج حقيقية، تقدم حقيقي. مفتوحون للتعاون مع من عنده أفكار.",
            "promise": "نطلق MVPs بنا ونشارك ما نتعلمه.",
            "cta": "شوف خط الإنتاج"
        },
        "think": {
            "eyebrow": "تفكير",
            "title": "معرفة ومجتمع",
            "body": "مقالات، شروحات، معارض، نشرة. بنبني اسمنا في مجتمع رواد الأعمال والمبادرات السعودية. ما نشارك معرفتنا، بنبني نفوذ.",
            "promise": "نفس التفكير اللي نبنيه، منشور.",
            "cta": "اقرأ الأحدث"
        }
    }
    print("AR: Added doors!")

with open("messages/ar.json", "w") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Done")
