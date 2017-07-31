import React, { Component } from "react";
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	StatusBar,
	Image,
	Dimensions,
	TextInput,
	Animated,
	Easing,
	ScrollView,
    TouchableOpacity,
    Platform
} from "react-native";

import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Entypo';


import {
  StackNavigator,
  NavigationActions
} from 'react-navigation';


let { height, width } = Dimensions.get("window");


export default class MainView extends Component {
    static navigationOptions = {
        title: 'Welcome',
        header: null
    };
    constructor(props) {
		super(props);
		this.state = {
            initialRender: true,
            topHomePickerToggle: false,
            initLoc: {
                latitude: 34.662496,
                longitude: 135.503177,
            },
			markers: [
                {
                    latlng: {
                        latitude: 34.660968,
                        longitude: 135.503996,
                    }
                    
                },
                {
                    latlng: {
                        latitude: 34.662208,
                        longitude: 135.505933,
                    }
                    
                }
            ],

            markersblack: [
               

                {
                    latlng: {
                        latitude: 34.663162,
                        longitude: 135.503822,
                    },
                    rotate: '180deg'
                }
            ]
		};
    }
    
    componentWillMount() {
        console.disableYellowBox = true;

    }


    funcTopHomePickerButton() {
        this.setState({ topHomePickerToggle: !this.state.topHomePickerToggle })
    }
    _renderTopHomePicker() {
        if (this.state.topHomePickerToggle === true) {
            return (
                <View
                style={{
                    zIndex:5,
                    ...Platform.select({
                    ios: {
                        top: 79,
                        height:height-79,
                    },
                    android: {
                        top: 59,
                                                height:height-79,

                    },
                    }),
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    width:width,
                    position: 'absolute',

                }}
                >
                    <View
                    style={{
                        margin:11,
                        height:105,
                        backgroundColor:'#fff',
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                    >
                        
                        <Image style={{width: 295, height: 58}} source={require('./assets/cheat.png')}/>


                    </View>
                </View>
            );
        } else {
            return null;
        }
    }

    render() {
		return (
            <View style={styles.container}>
                 <StatusBar
                  backgroundColor="#008D33"
                  barStyle="light-content"
                />


                <MapView
                  style={styles.map}
                        initialRegion={{
                        latitude: 34.662496,
                        longitude: 135.503177,
                        latitudeDelta: 0.0063,
                        longitudeDelta: 0.0063,
                        }}
                >
                    <MapView.Marker draggable
                        coordinate={this.state.initLoc}
                        onDragEnd={(e) => this.setState({ initLoc: e.nativeEvent.coordinate })}
                    >
                        <Image style={{zIndex:2, width: 25, height: 42}} source={require('./assets/ic_pickup.png')}/>
                    </MapView.Marker>
                    
                    {this.state.markersblack.map(marker => (
                        
                        <MapView.Marker
                        coordinate={marker.latlng}
                        >
                            <View style={{transform: [{ rotate: marker.rotate}]}}>
                                <Image style={{zIndex:2, width: 25, height: 53}} source={require('./assets/ic_grabcar_premium.png')}/>
                            </View>
                        </MapView.Marker>

                    ))}

                    {this.state.markers.map(marker => (
                        
                        <MapView.Marker
                        coordinate={marker.latlng}
                        >
                            <Image style={{zIndex:2, width: 25, height: 53}} source={require('./assets/ic_grabcar.png')}
                             onLayout={() => this.setState({ initialRender: false })}
                             key={`${this.state.initialRender}`}
                            />
                        </MapView.Marker>

                    ))}

                    

                  
                </MapView>
                <View style={styles.iosOnlyTopBar}/>
                <View style={styles.topBarContainer}>
                    <View
                    style={{
                        marginLeft:21,
                        width:16,
                        height:12,
                        justifyContent:"space-around"
                    }}>
                        <View style={{height:2, backgroundColor:'#fff'}} />
                        <View style={{height:2, backgroundColor:'#fff'}} />
                        <View style={{height:2, backgroundColor:'#fff'}} />


                    </View>

                    <TouchableOpacity
                    style={{
                        marginLeft:(width/2)-90,
                        width:104,
                        height:38,
                        borderRadius:3,
                        backgroundColor:'#3CBF6A',
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                    onPress={this.funcTopHomePickerButton.bind(this)}
                    >
                        <View
                        style={{
                            flexDirection:"row",
                            alignItems:"center"
                        }}
                        >
                            <Text style={{fontWeight:'400',color:'#fff'}}>Transport</Text>
                            <View style={{marginLeft:6}}>
                            <Icon name="chevron-down" size={14} color="#fff" />
                            </View>

                        </View>
                    </TouchableOpacity>
                </View>
                {this._renderTopHomePicker()}

                <View style={styles.homePickerContainer}>
                    <View style={{
                        flex:1.5,
                        alignItems: 'center',
                        justifyContent:'center', 
                    }}>
                        <Image style={{zIndex:2, height:72, width:12, resizeMode: 'contain'}} 
                        source={require('./assets/hitch_pin_without_dropoff.png')}/>
                    </View>

                    <View style={{
                        flex:10.5,
                    }}>
                        <View
                            style={{
                                paddingBottom:19
                            }}
                        >
                            <Text style={{
                                color:"#484848"
                            }}>
                                Namba Station 難波駅
                            </Text>
                        </View>
                        
                        <View 
                            style={{
                                height:0.4,
                                backgroundColor:'#CED7DE',
                            }}
                        />
                        <View
                            style={{
                                paddingTop:19
                            }}
                        >
                            <Text style={{
                                color:"#464646",
                            }}>
                                Where Are You Going ?
                            </Text>
                        </View>

                    </View>

                </View>

                <View style={styles.bottomContainer}>
                        <Image style={{zIndex:2, height:38, width:38, resizeMode: 'contain',marginRight:12, marginBottom: 24, alignSelf:"flex-end"}} 
                        source={require('./assets/ic_locate.png')}/>
                        <View style={styles.mobilPilihanContainer}>
                            <View style={styles.mobilTop}>
                                <View
                                style={{
                                    flex:1,
                                }}
                                >
                                    <View style={{alignSelf: 'center',marginTop:5,height:3,width:29,borderRadius:2,backgroundColor:'#CCD6DD'}}/>

                                </View>

                                <View 
                                style={{
                                    flex:10,
                                    alignItems: 'center',
                                    flexDirection:'row',
                                    paddingLeft:23,
                                    paddingRight:23,
                                }}
                                >
                                    <View style={{
                                        flex:2
                                    }}>
                                        <Image style={{zIndex:2, height:22, width:27, resizeMode: 'contain'}} 
                                        source={require('./assets/ic_budget_active.png')}/>
                                        </View>

                                    <View style={{
                                        flex:8
                                    }}>
                                        <Text style={{color:"#313541", fontSize:15,
                                        }}>GrabCar</Text>
                                    </View>

                                    <View style={{
                                        flex:2,
                        
                                    }}>
                                        <Text style={{alignSelf:"flex-end"}}>2 Min</Text>
                                    </View>
                                    
                                    
                                </View>
                            </View>
                            <View style={styles.mobilEffect}>

                            </View>
                        </View>
                        <View style={styles.dropOffButton}>
                            <Text style={{
                                color:'#fff',
                                fontWeight:'400'
                            }}>CHOOSE YOUR DROP-OFF</Text>
                        </View>
                </View>
            </View>

        );
    }
    

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3A5999',
        height: height,
        width: width,

    },
    bottomContainer:{
        flex:1,
                zIndex:2,

        position: 'absolute',
        ...Platform.select({
        ios: {
            bottom:8,
        },
        android: {
            bottom:30,
        },
        }),
    },
    dropOffButton:{
        marginLeft:12,
        marginRight:12,
        borderRadius:2,
        backgroundColor: '#008D33',
        height:56,
        width:width-24,
        zIndex:2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iosOnlyTopBar:{
        backgroundColor: '#00B140',
        zIndex:2,
        ...Platform.select({
        ios: {
            height: 20,
        },
        android: {
            height: 0,
        },
        }),
    },
    topBarContainer:{
        backgroundColor: '#00B140',
        zIndex:2,
        height: 59,
        flexDirection:'row',
        alignItems: 'center',


    },
    homePickerContainer: {
        zIndex:2,
        marginTop:10,
        marginLeft:6,
        marginRight:6,
        borderRadius:4,
        backgroundColor: '#fff',
        flexDirection:'row',
        paddingTop:24,
        paddingBottom:24,
        
    },
    mobilPilihanContainer: {
        marginLeft:12,
        marginRight:12,
        borderRadius:4,
        marginBottom:17,
        zIndex:2,

    },

    mobilTop: {
        borderRadius:5,
        backgroundColor: '#fff',
        height:72,
        flexDirection:'column',
        zIndex:3,

    }, 
    mobilEffect: {
        height:19,
        marginLeft:14,
        marginRight:14,
        marginTop:-7,
        borderRadius:5,
        backgroundColor: '#F4F6F8',
        zIndex:2,
    },
    map: {
    ...StyleSheet.absoluteFillObject,
    zIndex:1,
    },

  
});

