import React, {useState} from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    PermissionsAndroid,
    Platform,
  } from 'react-native';
import {launchCamera} from 'react-native-image-picker'


const trycamera = () => {
    const [image, setImage]= useState(null)
    const camera = async () => {
    let options = {
    mediaType: 'camera',
    maxWidth: 300,
    maxHeight: 550,
    }
    let isCameraPermitted = await requestCameraPermission() 
    if (isCameraPermitted || Platform.Version > 13) { 
        launchCamera (options, response => {
            if (response.errorCode) {
                 alert(response.errorMessage)
            } else {
                console.log(response?.assets) 
                setImage(response?.assets)
            }
        })
    }
}
    const requestCameraPermission= async () => {
    if (Platform. OS === 'android') {
    try {
    const granted = await PermissionsAndroid.request( 
        PermissionsAndroid. PERMISSIONS.CAMERA,
    {
    title: 'Camera Permission',
    message: 'App needs camera permission',
    },
    )
    return granted === PermissionsAndroid.RESULTS.GRANTED
    } catch (err) {
    return false
    }
    } else {
    return true
    }
    }
    
    return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
     <Image source={image} style={{ width: 300, height: 300, borderR: 10 }} />
    <TouchableOpacity onPress={() => camera()}
    style={{width:250, height: 50, borderRadius:10, backgroundColor: '#fff', alignItems:'center', justifyContent: 'center'}}>
    <Text style={{color:'#000', fontSize:16, fontWeight: '600'}}>Camera</Text>
    </TouchableOpacity>
    </View>
    )
}

export default trycamera