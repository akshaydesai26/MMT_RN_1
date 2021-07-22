import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
  } from 'react-native';
  import React, { useState } from 'react';
import { useData } from './DataProvider';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
  } from 'react-navigation';

interface Props{
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const AddRecord: React.FC<Props> = ({navigation})=>{

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [age,setAge]=useState('');
    const [address,setAddress]=useState('');
    const [phone,setPhone]=useState('');

    const {dataList,deleteFromDataList,addToDataList} = useData();

    const onSubmit = ()=>{
        addToDataList(name,email,age,address,phone);
        navigation.goBack();
    }

    return(
        <View style={[{backgroundColor:'rgb(80,200,120)',height:'100%',alignItems:'center'}]}>
        <Text style={[{textAlign:'center'}, styles.title]}>Add Record</Text>
        <TextInput style={styles.inputStyle} placeholder="Enter name" placeholderTextColor="gray" onChangeText={(text) => setName(text)}/>
        <TextInput style={styles.inputStyle} placeholder="Enter email" placeholderTextColor="gray"  onChangeText={(text) => setEmail(text)}/>
        <TextInput style={styles.inputStyle} placeholder="Enter age" placeholderTextColor="gray"  onChangeText={(text) => setAge(text)}/>
        <TextInput style={styles.inputStyle} placeholder="Address suite" placeholderTextColor="gray" onChangeText={(text) => setAddress(text)}/>
        <TextInput style={styles.inputStyle} placeholder="Phone" placeholderTextColor="gray"  onChangeText={(text) => setPhone(text)}/>
        
        <View style={{width:'90%', marginTop: 30, elevation:0}}> 
            <Button
                onPress={onSubmit}
                title="Click to submit"
                color="orange"
                
                />
        </View>
        </View>
    )
}

export default AddRecord;

const styles = StyleSheet.create({
    inputStyle:{
        backgroundColor:'white',
        width:'90%',
        marginTop: 20,
        borderRadius: 20,
        elevation: 10
        // borderColor: 'red'
    },
    title:{
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily:'Helvetica Neue',
        textAlignVertical:'center',
        marginTop: 30
      },
})