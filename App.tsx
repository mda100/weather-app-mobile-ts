import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ImageBackground} from 'react-native';


export type State = {
  location: string;
  token: boolean;
  weather: any;
};

function Forecast (props: any){
  const {forecastday} = props.data.weather.forecast;
  return (<View style={styles.row}>
    <View style={styles.forecast}> 
    <Text>{forecastday[0].date}{"\n"}</Text>
    <Image source={{uri: "https:" + forecastday[0].day.condition.icon}} style={styles.icon} /> 
    <Text>{"\n"}{forecastday[0].day.maxtemp_f}&deg; F /&nbsp;  {forecastday[0].day.mintemp_f}&deg; F {"\n"}</Text>
    <Text>{forecastday[0].day.avghumidity}% Humidity </Text>
  </View>
  <View style={styles.forecast}>
  <Text>{forecastday[1].date} {"\n"}</Text>
    <Image source={{uri: "https:" + forecastday[1].day.condition.icon}} style={styles.icon}/> 
    <Text>{"\n"}{forecastday[1].day.maxtemp_f}&deg; F /&nbsp;  {forecastday[1].day.mintemp_f}&deg; F {"\n"}</Text>
    <Text>{forecastday[1].day.avghumidity}% Humidity </Text>
  </View>
  <View style={styles.forecast}>
  <Text>{forecastday[2].date} {"\n"}</Text>
    <Image source={{uri: "https:" + forecastday[2].day.condition.icon}} style={styles.icon}/> 
    <Text>{"\n"}{forecastday[2].day.maxtemp_f}&deg; F /&nbsp;  {forecastday[2].day.mintemp_f}&deg; F {"\n"}</Text>
    <Text>{forecastday[2].day.avghumidity}% Humidity</Text>
    </View>
    </View>)}


class App extends Component<State> {

  state: State = {
    location: "",
    token: false,
    weather: ""
  }

  weatherApiBuilder(location: string){
    let type = "forecast"
    let key = "ba47e033e3c54cd5b8720248211507"
    let days = 3
    let aqi = "yes"
    return `https://api.weatherapi.com/v1/"${type}.json?key=${key}&q=${location}&days=${days}&aqi=${aqi}}&alerts=no`;
  }

  onPress = async () => { 
    try {
        const resp = await fetch(this.weatherApiBuilder(this.state.location))
        if (!resp.ok) {throw new Error(`An error has occurred: ${resp.status}`)} 
        const data = await resp.json() 
        this.setState({token: true, weather: data})
    }
    catch(error){
        console.log(error)
    }
  }

  reset = () => {this.setState({token: false, location: "", weather:""})}

  render() {
    return (
      <ImageBackground style={styles.background} source={require('./mountains-1412683_1280.png')}>
      
      <View style={styles.container}> 

      {!this.state.token ?
      <Text style={styles.header1}> Welcome!</Text>:
      <Text style={styles.header2}> {`${this.state.weather.current.temp_f}\u00b0 F and ${this.state.weather.current.condition.text} in ${this.state.weather.location.name}, ${this.state.weather.location.region}, ${this.state.weather.location.country}`} </Text>}

      <View style={styles.middle}>

      <TextInput
      style={styles.search} 
      placeholder="City, Coordinates, or US/UK Zipcode..."
      onChangeText={input => this.setState({location: input})}
      defaultValue={this.state.location}
      />

      <TouchableOpacity
      style={styles.button}
      onPress={this.onPress}
      >
      <Text>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.button}
      onPress={this.reset}
      >
      <Text>Reset</Text>
      </TouchableOpacity>

      </View>

      {!this.state.token ? null : <Forecast data={this.state}/>}

      </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: .8,
    justifyContent: "center",
    alignItems: 'center',
  },
  background: {
    flex: 1,
  },
  row:{
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    margin: '0%'
  },
  header1: {
    fontFamily: 'Helvetica',
    top: '25%',
    position: 'absolute',
    textAlign: 'center',
    padding: '1%',
    width: '80%',
    flex: .4,
    fontSize: 42, 
  },
  header2: {
    fontFamily: 'Helvetica',
    top: '22%',
    position: 'absolute',
    textAlign: 'center',
    padding: '1%',
    width: '80%',
    flex: .4,
    fontSize: 28, //text cuts off 0 ?

  },
  middle:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '15%'
  },
  search: {
    backgroundColor: '#fff',
    width: 250,
    padding: 15,
    borderRadius: 100/2,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000000',
    margin: '1%'
  },
  button:{
    fontFamily: 'Helvetica',
    alignItems: 'center',
    backgroundColor:'#F5F5F5',
    width: 75,
    padding: 5,
    borderRadius: 100/2,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    margin: '1%'
  },
  image:{
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    width: 75,
    padding: 5,
    borderRadius: 100/2,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black'
  },
  forecast: {
    fontFamily: 'Helvetica',
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    width: 120,
    padding: 17,
    borderRadius: 100/2,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000000',
    margin: '1%',
    alignItems: 'center',
  },
  icon:{
    width: 40,
    height: 40
  }
});

export default App;
