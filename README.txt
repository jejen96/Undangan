& "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqld.exe" --defaults-file="C:\Users\admin\mysql-data\my.ini" --console


cd backend
python -m uvicorn main:app --reload --port 8000

cd frontend
npm run dev
