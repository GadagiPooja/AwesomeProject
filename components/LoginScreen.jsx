import { View, Text , Image, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from '@clerk/clerk-expo';
import {rS, rV} from './../styles/responsive';




WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const getstart = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);


  return (
    <View>
    <View style={{
        display:'flex',
        alignItems:'center',
        marginTop:rV(120)
    }}>
      <Image source={require('./../assets/images/Task Manager.png')}
      style={{
        height:rV(400),
        width:rS(400),
      }}
      />
    </View>

    <View style={styles.subConatiner}>
            <Text style={{fontSize:20,
                fontFamily:'outfit-bold',
                textAlign:'center'
            }}>Your
                <Text style={{
                    color:Colors.PRIMARY,
                    
                }}> Task Manager</Text> App
            </Text>
            
            <TouchableOpacity style={styles.btn} onPress={getstart}>
                <Text style={{
                    textAlign:'center',
                    color:'#fff',
                    fontFamily:'outfit'
                }}>Get Started</Text>
            </TouchableOpacity>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    subConatiner:{
        backgroundColor:"#fff",padding:20,
        marginTop:-20
         },
         btn:{
            backgroundColor:Colors.PRIMARY,
            padding:10,
            borderRadius:99,
            marginTop:10
         }
})