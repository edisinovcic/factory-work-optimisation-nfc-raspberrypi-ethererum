import RPi.GPIO as GPIO
import urllib.request
import sys
import json

PIN = 10 #Default PIN number, change if you're using some other PIN
ip = sys.argv[1]
station = sys.argv[2]
url = 'http://' + ip + '/finish?station=' + station

def button_callback(channel):
  req = urllib.request.Request(url=url, method='POST')
  try:
      urllib.request.urlopen(req)
      print('Success')
  except urllib.error.URLError as e:
      print('Error')
  
      
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(PIN, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.add_event_detect(PIN, GPIO.RISING, callback=button_callback, bouncetime=1000)
message = input('Press enter to quit\n\n')
GPIO.cleanup()

