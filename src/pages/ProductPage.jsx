import React from 'react'
import {useParams} from 'react-router-dom'
import Loading from '../Component/Loading'
import Error from '../Component/Error'
import { useReducer,useEffect } from 'react'
import axios from 'axios'
import  styles from "./ProductPage.module.css"
import { Button, ButtonGroup } from '@chakra-ui/react'

const productReducer=(prevState,{type,payload})=>{
  switch(type){
    case "LOADING":
      return{...prevState,loading:true,error:false}
  
      case "ERROR":
        return {...prevState,error:true,loading:false}
        case "SUCCESS":
          return {...prevState,error:false,loading:false,data:payload}
          default:
            return prevState
  }
  }

function ProductPage() {
  const {product_id}=useParams()

  const [state,dispatch]=useReducer(productReducer,{
    loading:false,
    error:false,
    data:{}
  })
  
  const {loading,error,data}=state

  const {image,title,id,description,rating,price}=data;
  

  const FetchData=async()=>{
    dispatch({type:"LOADING"})
try {
  const {data}=await axios({
    baseURL:import.meta.env.VITE_BASE_URL,
    url:`/products/${product_id}`,
    method:"GET"
  })
 
  dispatch({type:"SUCCESS",payload:data})

} catch (error) {
  console.log(error)
  dispatch({type:"ERROR"})
}
  }

  useEffect(()=>{
FetchData()
  },[])

  if(loading){
    return <Loading/>
  }
  if(error){
    return <Error/>
  }

  
  
  return (
    <div className={styles.flex}>
      <div>
        <img src={image} alt={title} />
      </div>
      <div>
       <h2>title: {title}</h2> 
       <h2>Rs {price}</h2>
       <h2>Rating {rating?.rate}</h2>
       <p>Description: {description}</p>
       <Button colorScheme='blue' mt={140} ml={300} width={200}>Buy Item</Button>
      </div>
    </div>
  )
}

export default ProductPage