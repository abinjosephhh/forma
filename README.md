# FORMA Django starter

A Django starter for recreating the supplied FURNEXA reference screenshots with the brand changed to FORMA.

## Setup (Windows / VS Code)

```powershell
py -m venv venv
.\venv\Scripts\Activate.ps1
py -m pip install -r requirements.txt
py manage.py migrate
py manage.py runserver
```

Open http://127.0.0.1:8000/

If PowerShell blocks activation, use Command Prompt:
```bat
venv\Scripts\activate.bat
```

The hero and product images are remote Unsplash image URLs for the initial prototype. Replace them with licensed/local images when you have the final assets. The page recreates the visual structure from the provided screenshots; it is not the original website's source code.
