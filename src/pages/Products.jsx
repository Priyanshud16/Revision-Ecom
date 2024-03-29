import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import Loading from '../Component/Loading';
import Error from '../Component/Error';
import ProductCard from '../Component/ProductCard';
import styles from './Products.module.css';
import { useSearchParams } from 'react-router-dom';

const productReducer = (prevState, { type, payload }) => {
  switch (type) {
    case 'LOADING':
      return { ...prevState, loading: true, error: false };

    case 'ERROR':
      return { ...prevState, error: true, loading: false };

    case 'SUCCESS':
      return { ...prevState, error: false, loading: false, data: payload };

    default:
      return prevState;
  }
};

function Products() {
  const [state, dispatch] = useReducer(productReducer, {
    loading: false,
    error: false,
    data: [],
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category")||"all");

  const { loading, error, data } = state;

  
  console.log(searchParams.get("category"));

  const fetchData = async (category) => {
    const categoryObj = category === "all" ? {} : { category }; // Adjusted this line
    
    dispatch({ type: "LOADING" });
    try {
      const { data } = await axios({
        baseURL: import.meta.env.VITE_BASE_URL,
        url: "/products",
        method: "GET",
        params: categoryObj, // Adjusted this line
      });
      dispatch({ type: "SUCCESS", payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR" });
    }
  };

  useEffect(() => {
    setSearchParams((prev)=>{
      const newSearchParam=new URLSearchParams(prev)
      newSearchParam.set("category",category)
      return newSearchParam

    })
    fetchData(category); // Adjusted this line
  }, [category]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <>
      <select value={category} onChange={handleCategoryChange}> {/* Adjusted this line */}
        <option value="all">All</option>
        <option value="men's clothing">men's clothing</option>
        <option value="jewelery">jewelery</option>
        <option value="electronics">electronics</option>
        <option value="women's clothing">women's clothing</option>
      </select>
      <div className={styles.grid}>
        {data.map((ele) => {
          return <ProductCard key={ele.id} {...ele} />;
        })}
      </div>
    </>
  );
}

export default Products;






























// import axios from 'axios'
// import React, { useEffect, useReducer, useState} from 'react'
// import Loading from '../Component/Loading'
// import Error from '../Component/Error'
// import ProductCard from '../Component/ProductCard'
// import styles from "./Products.module.css"
// import {  useSearchParams } from 'react-router-dom'
// const productReducer=(prevState,{type,payload})=>{
// switch(type){
//   case "LOADING":
//     return{...prevState,loading:true,error:false}

//     case "ERROR":
//       return {...prevState,error:true,loading:false}
//       case "SUCCESS":
//         return {...prevState,error:false,loading:false,data:payload}
//         default:
//           return prevState
// }
// }

// function Products() {
// const [state,dispatch]=useReducer(productReducer,{
//   loading:false,
//   error:false,
//   data:[]
// })

// const [category,setCatogory]=useState("men's clothing")

// const {loading,error,data}=state

// const [searchParams,setSearchParams]=useSearchParams()
// console.log(searchParams.get("category"))
//   const FetchData=async()=>{
//     const categoryObj={}
// if(category=="all"){
//   categoryObj["category"]=category
// }
// console.log(categoryObj)

//     dispatch({type:"LOADING"})
// try {
//   const {data}=await axios({
//     baseURL:import.meta.env.VITE_BASE_URL,
//     url:"/products",
//     method:"GET",
//     params:{
//       category:categoryObj
//     }
//   })
 
//   dispatch({type:"SUCCESS",payload:data})
// } catch (error) {
//   console.log(error)
//   dispatch({type:"ERROR"})
// }
//   }

//   useEffect(()=>{
// FetchData(category)
//   },[category])

//   if(loading){
//     return <Loading/>
//   }
//   if(error){
//     return <Error/>
//   }
//   return (
//     <>
//     <select value={category} onChange={(e)=>setCatogory(e.target.value)}>
//       <option value="all">All</option>
//       <option value="men's clothing">men's clothing</option>
//       <option value="jewelery">jewelery</option>
//       <option value="electronics">electronics</option>
//       <option value="women's clothing">women's clothing</option>
//     </select>
//     <div className={styles.grid}>
// {
//   data.map((ele)=>{
//     return <ProductCard key={ele.id} {...ele}/>
//   })
// }
//     </div>
//     </>
//   )
// }

// export default Products