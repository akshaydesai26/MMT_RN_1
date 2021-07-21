import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios';

const DataContext = React.createContext({});

export function useData(){
    return useContext(DataContext);
}

const DataProvider=({children})=>{
    const [dataList, setDataList] = useState([]);

    useEffect(()=>{
        axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then(res => {
          const persons = res.data;
          console.log('recalling data');
          //let newPersonsList = [...persons,...persons,...persons,...persons,...persons];
          let newPersonsList: any = [...persons];
          setDataList(newPersonsList);
          
        })
        
     },[])

     const deleteFromDataList = (id:number)=>{
        let temp_list = dataList.filter((item:any)=> item['id']!=id)
        console.log(temp_list.length);
        setDataList(temp_list);
     }

     const addToDataList=(name:string,email:string,age:string,suite:string,phone:string)=>{
        let newRecord = {
          id:Math.round(Math.random()*10000),name:name,email:email,age:age,address:{suite:suite},phone:phone
        }
        let newList:any = [newRecord,...dataList];
        setDataList(newList);
   }

     return(
        <DataContext.Provider value={{dataList,deleteFromDataList,addToDataList}}>
            {children}
        </DataContext.Provider>
     )
}

export default DataProvider;