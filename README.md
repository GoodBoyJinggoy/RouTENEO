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
-To test if everything works,  
    py manage.py runserver  