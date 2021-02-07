require('dotenv').config()
const knex = require('knex')


const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
  })
  
  console.log('knex and driver installed correctly');

//serch by searchTerm w/ one parameter

function searchByAnyNameString (searchTerm){
    knexInstance
    .select('id', 'name', 'price', 'date_added', 'checked', 'category')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
        console.log(result)
      })
}

searchByAnyNameString('Mascarphony');

// pagination 

function paginateProducts(pageNumber) {
    const productsPerPage = 6
    const offset = productsPerPage * (pageNumber - 1)
    knexInstance
      .select('id', 'name', 'price', 'date_added', 'checked', 'category')
      .from('shopping_list')
      .limit(productsPerPage)
      .offset(offset)
      .then(result => {
        console.log(result)
      })
  }
  
  paginateProducts(3)

  // Get all items added after date

  function itemsAddedDaysAgo(daysAgo){
      knexInstance
      .select('id', 'name', 'price', 'date_added', 'checked', 'category')
      .from('shopping_list')
      .where(
        'date_added',
        '>',
        knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
      )
      .then(result => {
        console.log(result)
      })

  }
  itemsAddedDaysAgo(8)

  //Get the total cost for each category
  function eachCategoryTotal(){
      knexInstance
      .select('category')
      .sum('price as total')
      .from('shopping_list')
      .groupBy('category')
      .then(result => {
        console.log('TOTAL COAST FOR EACH CATEGORY')
        console.log(result)
      })

}
eachCategoryTotal()







