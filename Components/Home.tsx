import {
    ActivityIndicator,
    Alert,
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableHighlight,
    TouchableOpacity,
    useColorScheme,
    View,
  } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useData } from './DataProvider';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
  } from 'react-navigation';

interface Props{
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const Home: React.FC<Props> = ({navigation})=>{
    const [renderedList,setRenderedList]=useState<userArray[]>([]);
    const [filteredList,setFilteredList]=useState<userArray[]>([]);
    const [listStart,setListStart]=useState(0);
    const [searchText,setSearchText]=useState('');

    const {dataList,deleteFromDataList,addToDataList} = useData();

    const offset = 5;

    useEffect(()=>{
        let newPersonsList = dataList;
        
        setRenderedList(newPersonsList.slice(0,0+offset));
        setFilteredList(newPersonsList);
        setListStart(5);
        console.log(listStart + ' is list start');
        console.log('rendering home'+newPersonsList.length);

   },[dataList])

   function lazyLoad(){
      let newList=renderedList.concat(filteredList.slice(listStart,listStart+offset));
      setRenderedList(newList);
      setListStart(listStart+offset);  
  }

  const setFilter=()=>{
    let temp_list:any[]=dataList;
    let filteredData:any = temp_list.filter((item)=>{
      let itemData = `${item['name'].toUpperCase()}`;
      let searchData = searchText.toUpperCase();
      
      return itemData.indexOf(searchData) > -1;
    })
    setFilteredList(filteredData);
    setRenderedList(filteredData.slice(0,0+offset));
    setListStart(offset);
  }

  function onPressAlert(id:number){
    Alert.alert(
        "Deleting record...",
        "Do you want to continue?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => onLongPressCard(id) }
        ]
      );
  }

  function onPressCard(item:Object) {
    console.log('clicked');
    navigation.navigate('Detail',{item:item});
  }
  const showToast = () => {
    ToastAndroid.showWithGravity(
        "Record Deleted",
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
  };
  function onLongPressCard(id:number){
      console.log('deleting'+id);
      deleteFromDataList(id);
      showToast();
      
  }

  const goToAddRecord = ()=>{
    navigation.navigate('AddRecord');
  }
    
    return(
        <View style={{backgroundColor:'#dcdcdc',height:'100%'}}>
           <View style={{flexDirection:'row'}}>
           <View style={styles.shadow}>
             <TextInput
                // style={[{height: 50, margin:10,borderRadius:20},styles.shadow]}
                placeholder="Type name to search..."
                placeholderTextColor="black"
                onChangeText={(text) => setSearchText(text)}
              />
              </View>
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={setFilter}
              >
                <Text>Tap to search</Text>
              </TouchableOpacity>
              </View>


            <View style={[{flexDirection:'row'},styles.sectionTitle,styles.shadowHead]}> 
                <Text style={styles.titleStyle}>List of people</Text>
                <View style={{flexGrow:1}}></View>
                <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={goToAddRecord}
                    >
                    <Text>Add record</Text>
                </TouchableOpacity>

            </View> 

           <FlatList
              data={renderedList}
            //   extraData={fullList}
              keyExtractor={(item,index) => 'key'+index}
              onEndReached={lazyLoad}
              onEndReachedThreshold={0}
              ListFooterComponent={renderedList.length!==filteredList.length?<ActivityIndicator size="large" color="#0000ff"/>:<Text style={{textAlign:'center'}}>End of results</Text>}
              ListFooterComponentStyle={{ paddingTop: 20,paddingBottom:20}}
              renderItem={({ item }) => (
                <TouchableHighlight onPress={()=>onPressCard(item)} onLongPress={()=>onPressAlert(item['id'])} underlayColor="white">
                <View style={[styles.listItem]}>
                  <Text style={styles.listItemText}><Text style={{fontWeight:'bold'}}>Name:</Text> {item['name']}</Text>
                  <Text style={styles.listItemText}><Text style={{fontWeight:'bold'}}>Email:</Text> {item['email']}</Text>
                  <Text style={styles.listItemText}><Text style={{fontWeight:'bold'}}>Age:</Text> 20</Text>
                  {/* <Text style={styles.listItemText}><Text style={{fontWeight:'bold'}}>Address:</Text> {item['address']['suite']+', '+item['address']['street']+', '+item['address']['city']+', '+item['address']['zipcode']}</Text> */}
                  <Text style={styles.listItemText}><Text style={{fontWeight:'bold'}}>Address:</Text> {item['address']['suite']}</Text>
                  <Text style={styles.listItemText}><Text style={{fontWeight:'bold'}}>Phone:</Text> {item['phone']}</Text>
                </View>
                </TouchableHighlight>
                
              )}
            />
         </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    titleStyle:{
      fontSize: 24,
      fontWeight: 'bold',
      fontFamily:'Helvetica Neue',
      textAlignVertical:'center'
    },
    sectionTitle: {
      backgroundColor: 'rgb(80,200,120)',
      padding: 10,
      justifyContent:'center'
    },
    listItem: {
     marginTop: 10,
     marginLeft: 'auto',
     marginRight: 'auto',
     padding: 20,
     alignItems: 'flex-start',
     backgroundColor: '#fff',
     width: '90%',
     borderRadius: 10
   },
   listItemText: {
     fontSize: 15
   },
   shadow:{
     flexGrow:1,
     marginLeft: 10,
     marginTop:10,
     marginBottom:10,
     backgroundColor:'#fff',
     shadowColor: "#000",
     shadowOffset: {
       width: 0,
       height: 6,
     },
     shadowOpacity: 0.37,
     shadowRadius: 7.49,
     elevation: 5,
     borderRadius: 10
   },
   shadowHead:{
     shadowColor: "#000",
     shadowOffset: {
       width: 0,
       height: 6,
     },
     shadowOpacity: 0.37,
     shadowRadius: 7.49,
     elevation: 20,
   },
   touchableOpacity: { justifyContent:'center', backgroundColor: 'orange', padding: 10, marginLeft:10,marginRight:10,marginBottom:10, marginTop:10,
   shadowColor: "#000",
   shadowOffset: {
     width: 0,
     height: 4,
   },
   shadowOpacity: 0.4,
   shadowRadius: 4,
   elevation: 5,
   borderRadius: 10}
  });

  interface userArray{
    "id": number,
    "name": string,
    "username": string,
    "email": string,
    "address": {
      "street": string,
      "suite": string,
      "city": string,
      "zipcode": string,
      "geo": {
        "lat": string,
        "lng": string
      }
    },
    "phone": string,
    "website": string,
    "company": {
      "name": string,
      "catchPhrase": string,
      "bs": string
    }
}