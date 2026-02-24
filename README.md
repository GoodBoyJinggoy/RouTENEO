# RouTENEO
Last updated: February 24, 2026  
Hello! Here are the setup instructions for the Django side of the project (command line instructions are for Windows):  
-Create a copy of the repository on your computer using  
    git clone https://github.com/GoodBoyJinggoy/RouTENEO/tree/django_setup  
-Create a virtual environment called venv (this is important so that the virtual environment will be included in the gitignore)  
    py -m venv venv  
-Activate the virtual environment using  
    .\venv\Scripts\activate  
-Install the packages in requirements.txt  
    pip install -r requirements.txt  
-In the folder "project_routeneo" (same folder as manage.py), create a file called ".env". Then, paste the code I specified in the GC into the file.
--  run this in terminal and use it as the secret key: 
    {content: python -c "from django.core.management.utils import     get_random_secret_key; print(get_random_secret_key())"}
-To test if everything works,  
    py manage.py runserver  

For frontend
- install dependencies: "npm install"
- start the server:: run "npm run dev"
- in order to talk to the backend, it will utilize django's restapi