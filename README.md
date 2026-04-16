# RouTENEO

**Last updated:** February 27, 2026

Welcome! This guide will help you set up the **Django backend** and **frontend** for the RouTENEO project. The instructions below assume a Windows environment.

---

## Basic Setup

1. **Clone the repository** 

```bash
git clone https://github.com/GoodBoyJinggoy/RouTENEO/tree/django_setup
```

2. **Create a virtual environment** 

```bash
py -m venv venv
```

3. **Activate the virtual environment** 

```bash
.\venv\Scripts\activate
```

4. **Install required Python packages**

```bash
pip install -r requirements.txt
```

## Backend
1. **Create a `.env` file** 

* Go to the folder `project_routeneo` (same folder as `manage.py`).
* Create a file named `.env`.
```python
SECRET_KEY = '{YOUR_SECRET_KEY}'
STATIC_ROOT = 'static/'
```

* Add the following **secret key** to the file (replace `{YOUR_SECRET_KEY}` with the generated key):

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

2. **Run the Django server**

```bash
py manage.py runserver 0.0.0.0:8000
```

You should see the development server running at `http://127.0.0.1:8000/`.

---

## Frontend Setup

1. **Install dependencies**

```bash
npm install
```
NOTE: If vulnerabilities are found, run 
```bash
npm audit fix
```

2. **Start the development server**

```bash
npm run dev -- --host
```

Take note of the URL that appears after "Network:".

3. **Create a .env file**
* Create a `.env ` file inside the `frontend` folder.
* Replace `{URL}` with the URL from the previous step.
```
VITE_API_URL='{URL}'
```

4. **Access the Website**
* To access the website, type the same URL into any web browser.
* The website should be accessible to any device on the same network as the host.

The frontend communicates with the backend via Django REST API.

---

✅ Yippee

---