import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios';


interface Context{
    dataList: userArray[] | [],
    deleteFromDataList: (id:number)=>void,
    addToDataList: (name:string,email:string,age:string,suite:string,phone:string)=>void

}

const defaultContext={
    dataList:[],
    deleteFromDataList: (id:number)=>{console.log('default')},
    addToDataList: (name:string,email:string,age:string,suite:string,phone:string)=>{console.log('default')}
}

const DataContext = React.createContext<Context>(defaultContext);

export function useData(){
    return useContext(DataContext);
}

export interface userArray{
        "id": number,
        "name": string,
        "username"?: string,
        "email": string,
        "address": {
          "street"?: string,
          "suite": string,
          "city"?: string,
          "zipcode"?: string,
          "geo"?: {
            "lat": string,
            "lng": string
          }
        },
        "phone": string,
        "website"?: string,
        "company"?: {
          "name": string,
          "catchPhrase": string,
          "bs": string
        }
}

interface Props{

}


const DataProvider: React.FC<Props>=({children})=>{
    const [dataList, setDataList] = useState<userArray[]>([]);

    useEffect(()=>{
        axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then(res => {
          const persons = res.data;
          console.log('recalling data');
          //let newPersonsList = [...persons,...persons,...persons,...persons,...persons];
          let newPersonsList: userArray[] = [...persons];
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
        let newList:userArray[] = [newRecord,...dataList];
        setDataList(newList);
   }

     return(
        <DataContext.Provider value={{dataList,deleteFromDataList,addToDataList}}>
            {children}
        </DataContext.Provider>
     )
}

export default DataProvider;