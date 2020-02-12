# Workstation

**Project setup:**
1. Run `git clone https://github.com/mzglav/assembly-line.git` or unzip file
2. Position into the project folder
3. Run `npm install`
4. Run `npm run compile`
5. Create .env according to .env.example
6. Run `npm start`

**Starting project:**

Make sure that project is set up correctly.

Run server with: `npm start`

Check on which IP the server is running with ipconfig (ifconfig on Linux)

Make sure that you're on the same LAN as the server.
To use the app at remote workstations go to address http://IP:PORT/1.
Change workstation number for different workstations (1, 2, 3, 4).

Modify taskList.json or taskList.xlsx file with task schedule.
To use excel task list set .env variable MODE to excel.
Otherwise json file is used as a default task schedule.

Make sure that imgs contains folders with correct product name and images
for each workstation. Names have to match product names defined with task schedule.

Consult documentation for more detailed usage explanation.