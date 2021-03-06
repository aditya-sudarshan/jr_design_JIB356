// import * as React from 'react';
import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Button, Image, KeyboardAvoidingView, Dimensions, Animated, PanResponder } from 'react-native';
// import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import shouldUseActivityState from 'react-native-screens'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { fromLeft } from 'react-navigation-transitions';
import { render } from 'react-dom';


// class NiceButton extends React.Component {
//   constructor(props) { super(props); }
//   render() {
//     return (
//       <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
//         <Text style={styles.buttonText}>{this.props.title}</Text>
//       </TouchableOpacity>
//     );
//   }
// }

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const projectDetails = [
  {
    id: "1",
    name: "Example Project",
    description: "dfskj  sdjfl kldsf klj sd klsd jklfjkls df! dfskj lkjfsd kjf d!"
      + " dsfklj kldjs flkj sdfjks dflkjs fd! kljdsf kljdfs jklf sdjk!"
      + " Is this example long enough?",
    skills: "Programming",
    hoursPerWeek: "10",
    externalLink: "https://www.google.com",
    uri: require('../../../assets/1.jpg')
  },
  {
    id: "2",
    name: "Example Project 2",
    description: "dka;ldksngadgsn;sadgks",
    skills: "html, css",
    hoursPerWeek: "5",
    externalLink: "bing.com",
    uri: require('../../../assets/2.jpg')
  },
  {
    id: "3",
    name: "Project 3",
    description: ";lskdgn;klsgnl;ksagn;laskdg",
    hoursPerWeek: "8",
    externalLink: "yahoo.com",
    uri: require('../../../assets/3.jpg')
  },
  {
    id: "4",
    name: "Project 4",
    description: "kdsn;gkdsng;lskdgn;lsadg",
    hoursPerWeek: "3",
    externalLink: "images.google.com",
    uri: require('../../../assets/4.jpg')
  },
  {
    id: "5",
    name: "Project 5",
    description: "lkdgnsd;lkzgnsad;lgnasdg",
    hoursPerWeek: "7",
    externalLink: "maps.google.com",
    uri: require('../../../assets/5.jpg')
  }
]

export class Card extends React.Component {

  constructor() {
    super()

    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0
    }
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })
  }

  UNSAFE_componentWillMount() {
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.useNativeDriver = true,
          this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
            , useNativeDriver: true
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: true
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
            , useNativeDriver: true
          }).start()
        }
      }
    })
  }

  renderUsers = () => {

    return projectDetails.map((item, i) => {

      if (i < this.state.currentIndex) {
        return null
      } else if (i == this.state.currentIndex) {
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>

            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={item.uri} />
          </Animated.View>
        )
      } else {
        return (
          <Animated.View
            key={item.id} style={[{ opacity: this.nextCardOpacity, transform: [{ scale: this.nextCardScale }], height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>

            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={item.uri} />
          </Animated.View>
        )
      }
    }).reverse()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }}>

        </View>
        <View style={{ flex: 1 }}>
          {this.renderUsers()}
        </View>
        <View style={{ height: 60 }}>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/* var i = 0;

function increaseI() {
  if (i > projectDetails.length - 2) {
              i = 0;
  } else {
              i++;
  }
}

function decreaseI() {
  if (i < 1) {
              i = projectDetails.length - 1;
  } else {
              i--;
  }
}


function projectView() {
  return (
            <View id="page1" style={[style.container, { flex: 1 }]}>

              <Image source={require("../../../assets/defaultskin.png")} style={{
                width: "100%",
                alignSelf: "center",
                resizeMode: "center",
                flex: 0.75
              }} />
              <Text style={styles.title}>{projectDetails[i].name}</Text>
              <Text style={styles.label}>{projectDetails[i].description}</Text>
              <View style={[style.navButtonContainer, { flex: 1 }]}>
                <NiceButton title="Previous" onPress={() => { decreaseI(); navigation.navigate("Page1"); }} />
                <NiceButton title="See Project" onPress={() => navigation.navigate("Page2")} />
                <NiceButton title="Next" onPress={() => { increaseI(); projectView() }} />
              </View>
            </View>
  );
}

export var ProjectSelector = ({ navigation}) => {
  const title = React.useState("Project Selector");
  return (
            <View id="page1" style={[style.container, { flex: 1 }]}>

              <Image source={require("../../../assets/defaultskin.png")} style={{
                width: "100%",
                alignSelf: "center",
                resizeMode: "center",
                flex: 0.75
              }} />
              <Text style={styles.title}>{projectDetails[i].name}</Text>
              <Text style={styles.label}>{projectDetails[i].description}</Text>
              <View style={[style.navButtonContainer, { flex: 1 }]}>
                {/* <NiceButton title="Previous" onPress={() => { 0 }} /> */
/* <NiceButton title="Previous" onPress={() => { decreaseI(); navigation.push("Page1") }} />
                <NiceButton title="See Project" onPress={() => navigation.push("Page2")} />
                <NiceButton title="Next" onPress={() => { increaseI(); navigation.push("Page1") }} />
              </View>
            </View>
  );
}; */



/* export const ProjectExtended = ({navigation}) => {
  const title = React.useState("Project Selector");
  return (
            <View id="page2" style={[style.container, { flex: 1 }]}>

              <Image source={require("../../../assets/defaultskin.png")} style={{
                width: "100%",
                alignSelf: "center",
                resizeMode: "center",
                flex: 0.75
              }} />
              <Text style={styles.title}>{projectDetails[i].name}</Text>
              <Text style={styles.label}>{projectDetails[i].description}</Text>
              <Text style={styles.label}>Skills: {projectDetails[i].skills}</Text>
              <Text style={styles.label}>Hours Per Week: {projectDetails[i].hoursPerWeek}</Text>
              <Text style={styles.label}>Link: {projectDetails[i].externalLink}</Text>
            </View>
  );
}; */

const Stack = createStackNavigator();


export default function ViewProject(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName="Page1">
      <Stack.Screen name="Page1" component={Card} />
      {/* <Stack.Screen name="Page2" component={ProjectExtended} /> */}
      {/* <Stack.Screen name="Page3" component={PageFix} /> already prev commented out */}
    </Stack.Navigator>
  );
};

/* const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    color: '#F5F5F5',
    opacity: 100,
    alignItems: 'stretch',
    padding: 15,
    marginTop: 30,
    justifyContent: 'center',
    flex: 1
  },
  login: {
    backgroundColor: '#F5F5F5',
    opacity: 100,
    alignItems: 'stretch',
    padding: 15,
    justifyContent: 'center',
    alignContent: 'center'
  },
  name: {
    fontFamily: 'serif',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 25,
    color: '#B3A369',
    fontWeight: '700'
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    fontSize: 25,
    marginVertical: 15,
    color: '#B3A369',
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#B3A369',
    height: 40,
    width: '25%',
    justifyContent: "center",
    margin: 20,
    marginVertical: 10,
    //paddingHorizontal: 10,
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B3A369',
    paddingVertical: 10
  },
  inputs: {
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: '#B3A36975',
    padding: 10,
    paddingLeft: 20,
    height: 40
  },
  selector: {
    margin: 10,
    flexDirection: 'column',
    position: 'relative',
    bottom: -250,
    alignItems: 'stretch',
  },
});

const style = StyleSheet.create({//File-specific
  navButtonContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: 'center',
    //width: "100%",
    backgroundColor: '#F5F5F5',
    flexDirection: "row",
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: 5,
    marginTop: 5
  },
  container: {
    backgroundColor: '#F5F5F5',
    color: '#F5F5F5',
    //opacity: 100,
    padding: 15,
    marginTop: 30,
    flex: 1
  }
}); */