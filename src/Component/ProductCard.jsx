import React from 'react'
import { Card, CardHeader, CardBody, CardFooter,Heading,Image,Stack,Text,Divider,ButtonGroup,Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import './ProductCars.css'
function ProductCard({id,title,price,rating,description,image}) {

const navigate=useNavigate()
  return (
    <div style={{display:"flex"}} key={id} id='productContainer'>
     {/* <div></div>
     <div></div> */}
     <Card maxW='sm'>
  <CardBody>
    <Image
    style={{height:"200px"}}
      src={image}
      alt={title}
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{title}</Heading>
      <Text>
        {description}
      </Text>
      <Text color='blue.600' fontSize='2xl'>
       Price: {price}
      </Text>
      <Text color='red.600' fontSize='xl'>
       Rating: {rating.rate}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Buy now
      </Button>
      <Button variant='ghost' colorScheme='blue' onClick={()=>navigate(`/products/${id}`)}>
        View Details
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
    </div>
  )
}

export default ProductCard