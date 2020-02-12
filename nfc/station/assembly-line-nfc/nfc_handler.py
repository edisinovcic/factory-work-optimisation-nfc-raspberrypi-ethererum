import os, sys, time, json, subprocess
import urllib.request
import Constants, ErrCodes
from platform import *
from ctypes import *

def Connect(mySO,readerType, cardType, cardUIDSize, cardUID, c):
    fResult = mySO.ReaderOpen()
    if fResult == Constants.DL_OK:
        print("UFR device is CONNECTED")
        print("hex: ", hex(fResult))
        print("UFR code:", ErrCodes.UFCODER_ERROR_CODES[fResult])
        __CONN = True
        return 1
    else:
        print("UFR device is NOT_CONNECTED")
        print("hex: ", hex(fResult))
        print("UFR code:", ErrCodes.UFCODER_ERROR_CODES[fResult])
        __CONN = False
        print("######## TRYING AGAIN ############")
        subprocess.run(["sudo", "python3", "assembly-line-nfc/nfc_handler.py", sys.argv[1], sys.argv[2]])
        time.sleep(0.2)
        return 0

def ReadID(readerType, cardType, cardUIDSize, cardUID, c):
    readerType = c_int32()
    cardType = c_uint8()
    cardUIDSize = c_uint8()
    cardUID = (c_ubyte * 9)()
    c = ''

    fResult = mySO.GetReaderType(byref(readerType))
    fResult = mySO.GetCardIdEx(byref(cardType),cardUID,byref(cardUIDSize))
    for n in range(cardUIDSize.value):
        c +=  '%0.2x' % cardUID[n]
    return str(c.upper())

def ServerCommunication(url, station, tagNum):
    header = {'content-type' : 'application/json'}
    data = {
        'station' : station,
        'tag' : tagNum
    }
    jsonData = json.dumps(data)
    jsonDataBytes = jsonData.encode('utf-8')
    req = urllib.request.Request(url=url, headers=header, method='POST')
    try:
        urllib.request.urlopen(req, data=jsonDataBytes)
        return True
    except urllib.error.URLError as e:
        return False

__CONN = False
__readerOn = False
__functionOn = False
__dlogicCardType = c_int()

try:
    mySO = cdll.LoadLibrary('assembly-line-nfc/libuFCoder-armhf.so')
except:
    print("Enter into folder that holds libuFCoder-armhf.so and python script before calling it.")

readerType = c_int32()
cardType = c_uint8()
cardUIDSize = c_uint8()
cardUID = (c_ubyte * 9)() 
c = str()

ip = sys.argv[1]
station = sys.argv[2]
url = 'http://' + ip + '/startTimer'
lastTag = ''

if Connect(mySO, readerType, cardType, cardUIDSize, cardUID, c):
    while True:
        time.sleep(0.2)
        tagNum = ReadID(readerType, cardType, cardUIDSize, cardUID, c)
        if ((tagNum != lastTag)&(tagNum != '')):
            if(ServerCommunication(url, station, tagNum)):
                print('Success')
                lastTag = tagNum
            else:
                print('Error')


