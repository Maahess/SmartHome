import requests
import RPi.GPIO as GPIO
import time
from pyFirmata import pyfirmata

GPIO.setmode(GPIO.BCM)
board = pyfirmata.Arduino("/dev/ttyUSB0")
GPIO.setwarnings(False)
ledDormitor=5
ledBaie = 2
ledBucatarie = 6
ledHol = 3
ledGaraj = 4
ledAfara = 7
ventilator = 13
enA = 10
enB = 13
Garaj_1=12
Garaj_2 = 11
buzzer = 8
board.digital[enA].write(1)
class locatie_lumina:
    def __init__(self,locatie,pin,id):
        self.locatie=locatie
        self.pin = pin
        self.id = id
dormitor = locatie_lumina("dormitor",ledDormitor,"5d108fc9bf99a21de469dec9")
baie = locatie_lumina("baie",ledBaie,"5d2094c9a2838d243070c568")
bucatarie = locatie_lumina("bucatarie",ledBucatarie,"5d20951ea2838d243070c569")
hol = locatie_lumina("hol",ledHol,"5d20952fa2838d243070c56a")
garaj = locatie_lumina("garaj",ledGaraj,"5d209535a2838d243070c56b")
afara = locatie_lumina("afara",ledAfara,"5d109133f0f4101e38ba4c06")
locatii_lumini = [dormitor,baie,bucatarie,hol,garaj,afara]
while True:
    for x in locatii_lumini:
        request = requests.get('http://192.168.1.100:3000/lumini/'+x.id)
        data = request.json()
        if data['stare']== 1:
            board.digital[x.pin].write(1)

        else:
            board.digital[x.pin].write(0)


    request = requests.get('http://192.168.1.100:3000/garaj/5d20a4ada2838d243070c56c')
    data = request.json()
    if data['stare_actiune'] == 1:
        requests.put('http://192.168.1.100:3000/garaj/5d20a4ada2838d243070c56c', data = {'stare_actiune':'0'})
        if data['stare'] == 1:
            board.digital[Garaj_1].write(1)
            board.digital[Garaj_2].write(0)
            time.sleep(0.38)
            board.digital[Garaj_1].write(0)
        else:
            board.digital[Garaj_1].write(0)
            board.digital[Garaj_2].write(1)
            time.sleep(0.2)
            board.digital[Garaj_2].write(0)

    request = requests.get('http://192.168.1.100:3000/ventilatoare/5d109639d5323c26b86cb08f')
    data = request.json()

    if data['stare'] == 1:
       board.digital[ventilator].write(1)
       board.digital[enB].write(1)
    else:
       board.digital[ventilator].write(0)
       board.digital[enB].write(0)
ss
