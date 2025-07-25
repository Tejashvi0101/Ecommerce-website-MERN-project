import React , {useEffect}from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Row,Col } from 'react-bootstrap'
import Product from '../components/Product' 
import {listProducts} from '../actions/productActions'
import { useParams } from 'react-router-dom'
import Paginate from '../components/paginate'

const HomeScreen = () => {

  const params = useParams()
  const keyword = params.keyword
  const pageNumber = params.pageNumber || 1

const dispatch = useDispatch();

const productList= useSelector(state=> state.productList);
const { loading, products = [], error, page, pages } = productList;


useEffect(()=>{
dispatch(listProducts(keyword,pageNumber))

},[dispatch,keyword,pageNumber])



  return (
    <>

     <h1>Latest products</h1>  

     {loading ? <h2>Loading....</h2> : error ? <h3>{error}</h3> :<> <Row>
        
        {products.map((product)=>(

                 <Col key={product._id} sm={12} md={6} lg={4} >
                    <Product product={product} />
                    
                 </Col>

        )
        )}

     </Row> 
     
      <Paginate pages={pages} page={page} keyword = {keyword ? keyword : ''}></Paginate>
     </>  }

     

    </>
  )
}

export default HomeScreen