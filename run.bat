@echo off

REM Activate the virtual environment
call .venv\Scripts\activate.bat

REM Your commands after activation
python -m uvicorn --port 8080 main:app 
