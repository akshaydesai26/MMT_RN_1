import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useData } from './DataProvider';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
  } from 'react-navigation';
  
import { RouteProp } from '@react-navigation/native';
import {userArray} from './DataProvider';

interface Props{
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    route: RouteProp<{params: { item: userArray }}, 'params'>
}

const Detail: React.FC<Props> = (props)=>{

    const [posts,setPosts]=useState<[]>([]);
    const [filteredPosts,setFilteredPosts]=useState<[]>([]);

    const {dataList,deleteFromDataList,addToDataList} = useData();
    
    let itemProp = props.route.params.item;
    // console.log(props.route);
    useEffect(()=>{
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
      .then(res => {
        const posts1 = res.data;
        setPosts(posts1);
        let filtered_data = posts1.filter((item: { userId: number; })=>item.userId==itemProp['id']);
        setFilteredPosts(filtered_data);
        console.log(filtered_data.length)
      })
      return ()=> console.log('Navigated unmounted')
    },[])

    function deleteFromDetailsPage(id:number){
        deleteFromDataList(id);
        props.navigation.goBack()
    }
    const trash = "\uD83D\uDDD1";

    return(
        <View style={styles.main}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.name}>{itemProp['name']}</Text>
        <View style={{flexGrow:1}}></View>
        <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>deleteFromDetailsPage(itemProp['id'])}><Text style={{fontSize:30}}>{trash}</Text></TouchableOpacity>
        </View>
        <View style={styles.detailsCard}>
            <Text style={{fontWeight:'bold'}}>Other Details</Text>
            <Text>{itemProp['email']}</Text>
            <Text>{itemProp.address.suite}</Text>
            <Text>{itemProp.phone}</Text>
        </View>
        <FlatList
              style={[styles.detailsCard]}
              data={filteredPosts}
              keyExtractor={(item,index) => 'key'+index}
              renderItem={({ item,index }) => (
                <View style={{marginBottom:20,borderBottomWidth:StyleSheet.hairlineWidth,paddingBottom:10}}>
                  <Text style={{fontWeight:'bold'}}>Post {index+1}:</Text>
                  <Text>{item['title']}</Text>
                </View>
              )}
            />
        </View>
    )
}

export default Detail;

const styles=StyleSheet.create({
    name:{
      fontSize: 40,
      fontWeight: 'bold',
      fontFamily:'Helvetica Neue',
      textAlignVertical:'center'
    },

    main:{
        backgroundColor: '#dcdcdc',
        padding: 20,
        height: '100%',
    },

    detailsCard:{
        backgroundColor: 'white',
        borderRadius:10,
        padding: 10,
        marginTop: 20,
        elevation: 10,
    }
})