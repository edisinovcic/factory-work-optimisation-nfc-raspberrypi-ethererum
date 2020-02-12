# Raspberry Pi button

Button is used to send HTTP requsts with fake NFC tags to the server.

Set up instructions:

1. Make sure Python3 is installed
2. Open the terminal and position yourself to folder with `button.py` script
3. Run: `python3 button.py [Server_IP:Port] [Station_Name]`  
  (i.e. `python3 button.py 192.168.1.25:3000 STATION1`)

  Currently there are 4 stations available: STATION1, STATION2, STATION3, STATION4.
 