import serial
import requests
import datetime
import time
ser = serial.Serial('/dev/ttyACM0',9600)
s = [0]
while True:
    read_serial=ser.readline()
    date = datetime.datetime.now()
    date_json = date.strftime('%Y-%m-%dT%H:%M:%S.%f%z')
    print (str(read_serial.decode('utf-8')))
    txt = str(read_serial.decode('utf-8'))
    x = txt.split("/")
    dht_data  = {'temperatura':x[0],'umiditate':x[1],'data':date_json}
    praf_data = {'cantitate_praf':x[2],'data':date_json}
    co_data = {'cantitate_co':x[3],'data':date_json}
    r = requests.post('http://192.168.43.220:3000/dht', json=dht_data)
    r = requests.post('http://192.168.43.220:3000/praf', json=praf_data)
    r = requests.post('http://192.168.43.220:3000/co', json=co_data)
    print(x)
    time.sleep(30)