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
SECRET_KEY= {YOUR_SECRET_KEY}
STATIC_ROOT='static/'
```

* Add the following **secret key** to the file (replace `{YOUR_SECRET_KEY}` with the generated key):

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

2. **Run the Django server**

```bash
py manage.py runserver
```

You should see the development server running at `http://127.0.0.1:8000/`.

---

## Frontend Setup

1. **Install dependencies**

```bash
npm install
```

2. **Start the development server**

```bash
npm run dev
```

3. The frontend communicates with the backend via Django REST API.

---

✅ Yippee

---