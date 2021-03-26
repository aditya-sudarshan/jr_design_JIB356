import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { getUser } from '../../store.js'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect } from 'react';
import styles from '../../globalStyles';
//import MainLogin from './mainLogin.js';
// import AlumniLogin from './alumniLogin.js';
// import StudentLogin from './studentLogin.js';
import ViewProject from '../ViewProject/index.js'

const Tab = new createBottomTabNavigator(); //creates bottom tab

const Home = (props) => {
    const { navigation } = props;
    const createNewProject = () => {
        navigation.navigate("NewProject");
    }
    const viewProjects = () => {
        navigation.navigate("ViewProject");
    }
    const viewProfiles = () => {
        navigation.navigate("ViewProfile");
    }
    const savedProjects = () => {
        navigation.navigate("SavedProjects");
    }

    return (
        <View style={[styles.container, { alignItems: 'center' }]}>
            <Text style={styles.title}>Welcome!</Text>
            <TouchableOpacity style={styles.button} onPress={createNewProject}>
                <Text style={styles.buttonText}>Create Project</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={viewProjects}>
                <Text style={styles.buttonText}>View Projects</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={viewProfiles}>
                <Text style={styles.buttonText}>View Profiles</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={savedProjects}>
                <Text style={styles.buttonText}>Saved Projects</Text>
            </TouchableOpacity>
        </View>
    )
};

const Profile = (props) => {
    //alert(JSON.stringify(props));
    const { navigation } = props;
    const userDetails = getUser(props.route.params);
    const logout = () => {
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'Login'
                }
            ],
        });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Details</Text>
            <View style={styles.info}>
                <Text style={styles.label}>Name</Text>
                <Text>{userDetails.name || ""}</Text>
                <Text style={styles.label}>Email</Text>
                <Text>{userDetails.email || ""}</Text>
                <Text style={styles.label}>Degree</Text>
                <Text>{userDetails.degree || ""}</Text>
                <Text style={styles.label}>Major</Text>
                <Text>{userDetails.major || ""}</Text>
                <Text style={styles.label}>Skills</Text>
                <Text>{userDetails.skills || ""}</Text>
                <Text style={styles.label}>Interests</Text>
                <Text>{userDetails.interests || ""}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={logout}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    )
};

const ViewProjects = (props) => {
    const { navigation } = props;
    const viewProjects = () => {
        navigation.navigate("ViewProject");
    }
    return (
        <View style={[styles.container, { alignItems: 'center' }]}>
            <TouchableOpacity style={styles.button} onPress={viewProjects}>
                <Text style={styles.buttonText}>View Projects</Text>
            </TouchableOpacity>
        </View>
        // <Button
        //     title="Go somewhere"
        //     onPress={() => {
        //         // Navigate using the `navigation` prop that you received
        //         navigation.navigate(viewProjects);
        //     }}
        // />
    )
};

{/* <Tab.Screen
name="Add"
component={View}
listeners={({ navigation }) => ({
  tabPress: (e) => {
    // Prevent default action
    e.preventDefault();

    // Do something with the `navigation` object
    navigation.navigate("PhotoNavigation"); // Here!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  },
})}
/>
<Tab.Screen name="Notifications" component={Notifications} /> */}

export default function HomeScreen(props) {
    const { email } = props.route.params;
    // alert(email);
    // alert(JSON.stringify(props));
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} initialParams={{ email: email }} />
            <Tab.Screen name="Project" component={ViewProjects} listeners={({ navigation }) => ({
                tabPress: (e) => {
                    // Prevent default action
                    e.preventDefault();

                    // Do something with the `navigation` object
                    navigation.navigate("ViewProject"); // Here!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                },
            })} />
        </Tab.Navigator>
    )
};


