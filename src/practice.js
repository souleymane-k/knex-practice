require('dotenv').config()
const { query } = require('express');
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

console.log('knex and driver installed correctly');

//display all amazon products

// knexInstance.from('amazong_products').select('*')
//       .then(result =>{
//           console.log(result)
//       })


// display this prosuct = name = Point of view gun/ select product_id', 'name', 'price', 'category

// const qry = knexInstance
//   .select('product_id', 'name', 'price', 'category')
//   .from('amazong_products')
//   .where({ name: 'Point of view gun' })
//   .first()
//   .toQuery()

//   console.log(qry);





  // Now we need to build this query in knex. We can pass 3 arguments to the .where() operator:
// the column, name
// the operator, ILIKE
// the value, %holo%

// const searchTerm = 'holo'

// knexInstance
//   .select('product_id', 'name', 'price', 'category')
//   .from('amazong_products')
//   .where('name', 'ILIKE', `%${searchTerm}%`)
//   .then(result => {
//     console.log(result)
//   })

  // you can put the upper ^ syntax in the function
  // searchByProduceName('holo')

  function searchByProduceName(searchTerm) {
    knexInstance
      .select('product_id', 'name', 'price', 'category')
      .from('amazong_products')
      .where('name', 'ILIKE', `%${searchTerm}%`)
      .then(result => {
        console.log(result)
      })
  }
  
  searchByProduceName('holo')

  // Pagination 

  function paginateProducts(page) {
    const productsPerPage = 10
    const offset = productsPerPage * (page - 1)
    knexInstance
      .select('product_id', 'name', 'price', 'category')
      .from('amazong_products')
      .limit(productsPerPage)
      .offset(offset)
      .then(result => {
        console.log(result)
      })
  }
  
  paginateProducts(3)

  //

  // getProductsWithImages()

function mostPopularVideosForDays(days) {
    knexInstance
      .select('video_name', 'region')
      .count('date_viewed AS views')
      .where(
        'date_viewed',
        '>',
        knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
      )
      .from('whopipe_video_views')
      .groupBy('video_name', 'region')
      .orderBy([
        { column: 'region', order: 'ASC' },
        { column: 'views', order: 'DESC' },
      ])
      .then(result => {
        console.log(result)
      })
  }
  
  mostPopularVideosForDays(30)


