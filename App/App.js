import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {
  const [ledLigado, setLedLigado] = useState(false);

  const [temperatura, setTemperatura] = useState(0);
  const [temperaturaMax, setTemperaturaMax] = useState(0);
  const [temperaturaMin, setTemperaturaMin] = useState(0);

  useEffect(() => {
    requestToArduinoServer();
  }, []);

  const requestToArduinoServer = async () => {
    try {
      const response = await fetch(
        'http:192.168.0.80'
      );
      let json = await response.json();
  
      setTemperatura(json["temperatura"]);
      setTemperaturaMax(json["temperatura-max"]);
      setTemperaturaMin(json["temperatura-min"]);
      setLedLigado(json["status-led"]);

    } catch (error) {
      console.error(error);
    }
  };
  
  const requestToTurnOnLight = async () => {
    setLedLigado(true);
    try {
       await fetch(
        'http:192.168.0.80/turnOn'
      );
    } catch(error) {
      console.error(error);
    }
    requestToArduinoServer();
  }
  
  const requestToTurnOffLight = async () => {
    setLedLigado(false);
    try {
      await fetch(
        'http:192.168.0.80/turnOff'
      );
    } catch(error) {
      console.error(error);
    }
  }
  
  return (
  <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "#189AB4", justifyContent: "center", alignItems: "center"}}> 
        <Text style={styles.title}>Automação Residencial</Text>
        {ledLigado 
        ? <MaterialIcon name="home-automation" size={50} color="yellow" />
        : <MaterialIcon name="home-automation" size={50} color="white" />}
        
      </View>
      <View style={{ flex: 3, backgroundColor: "#75E6DA" }}>
      <View style={styles.tempContainer}> 
        <Text style={styles.mainTempLabel}>
        Temperatura Atual
        </Text>
        <Text style={styles.mainTemp}>
        {temperatura} °C
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, width: '100%'}}>
          
          <View style={styles.tempIconGroup}>
            <Text style={styles.minTemp}>
              {temperaturaMin} 
            </Text>
            <Icon name="temperature-low" size={18} color="blue" />
          </View>

          <View style={styles.tempIconGroup}>
            <Text style={styles.maxTemp}>
              {temperaturaMax} 
            </Text>
            <Icon name="temperature-high" size={18} color="red" />
          </View>

        </View>
      </View>
      {ledLigado
      ? <TouchableOpacity style = {styles.button} onPress={() => requestToTurnOffLight()}>
            <Text style={{color: "white"}}>Desligar Luz</Text>
            <Icon name="lightbulb" size={18} color="white" />
      </TouchableOpacity>
      : <TouchableOpacity style = {styles.button} onPress={() => requestToTurnOnLight()}>
            <Text style={{color: "white"}}>Ligar Luz</Text>
            <Icon name="lightbulb" size={18} color="yellow" />
      </TouchableOpacity>
      }
      </View>
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0
  },
  tempContainer: {
    marginTop: 20,
    height: 200,
    backgroundColor: 'white',
    alignItems: 'center',
    width: 300,
    alignSelf: "center",
    elevation: 20,
    borderRadius: 10
  },  
  button: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 20,
    alignItems: "center",
    backgroundColor: "#5885AF",
    height: 80,
    borderRadius: 50,
    elevation: 5,
    marginTop: 40,
    width: 300,
    alignSelf: "center",

  },
  title: {  
  color: "#D4F1F4",
  fontSize: 24
  },
  mainTemp: {
    fontSize: 24,
    padding: 10
  },
  mainTempLabel: {
    fontSize: 16,
    marginTop: 20,
    color: "#7EC8E3"
  },
  minTemp: {
    padding: 10,
    marginLeft: 20,
  },
  maxTemp: {
    padding: 10,
  },
  tempIconGroup: {
    flexDirection: "row",
    alignItems: "center",
    width: 110,
    margin: 10
  }
});

export default App;
