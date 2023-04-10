const chalk = require('chalk');
const { type } = require("os");
const readline = require("readline");
const yargs = require("yargs");
const Joi = require('joi');

var products_data= [
    {id:1, name:'A', price:12.0, category:'Furniture'},
    {id:2, name:'A', price:123.0, category:'Dishes'},
    {id:3, name:'B', price:12.0, category:'Furniture'},
    {id:4, name:'D', price:1, category:'Electronic'},
    {id:5, name:'G', price:12.990, category:'Electronic'},
    {id:6, name:'B', price:12.10, category:'Appliances'},
    {id:7, name:'C', price:32, category:'Furniture'}
];

//Create Interface
rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

//Parse command line arguments
yargs.command({
    command: 'display',
    describe: 'Display Product Details',
    handler:displayProduct
})
yargs.command({
    command: 'add',
    describe: 'Add New Product',
    handler:addProduct
})
yargs.command({
    command: 'edit',
    describe: 'Edit Exist Product',
    handler:editProduct
})
yargs.command({
    command:'delete',
    describe: 'Delete Exist Product',
    handler:deleteProduct
})
yargs.command({
    command: 'filter',
    describe: 'Filter Products Categories',
    handler:filterProduct
})
yargs.command({
    command: 'exist',
    describe: 'Check the product exist or not',
    handler: existProduct
})
yargs.parse();


// 1. Function to display products
function displayProduct(){
    console.log(chalk.white('Product Details :'));
    console.table(products_data);
    process.exit();
}


// 2. Function to add product
function addProduct(){
    console.log('Add New Product To The List :');
    rl.question('Enter product id : ', ( id ) => {
        if(products_data.find( x => x.id == id )){
            console.log(chalk.red('Id is already exist...'));
            process.exit();
        }else{
            rl.question('Enter product name : ', (name) => {
                rl.question('Enter price of the product : ', (price) => {
                    rl.question('Enter product category : ', (category) => {
                        products_data.push({ id :parseInt(id), name, price :parseFloat(price), category });
                        const last_product = products_data[products_data.length-1];
                        const { error } = schema.validate(last_product);
                        if (error) {
                            console.log("Invalid input : ",products_data[products_data.length-1]);
                            products_data.pop();
                        } else {
                            console.log(chalk.green('Product is added...'));
                            console.table(products_data);
                        }
                        rl.close();
                    })
                })
            })
        }
    })
}


// 3. Function to edit a product
function editProduct(){
    console.table(products_data);
    rl.question('Please select id to edit :' , (id) => {
        if(!products_data.find( x => x.id == id)){
            console.log(chalk.red('Id is not exist...'));
            process.exit();
        }
        else{
            const index= products_data.findIndex( x => x.id == id);
            rl.question('Enter name : ', name => {
                rl.question('Enter price : ', price => {
                    rl.question('Enter category : ', category =>{
                        price=parseFloat(price);
                        let item = {id, name, price, category };
                        const { error } = schema.validate(item);
                        if (error) {
                            console.log("Invalid input...",item);
                            rl.close();
                        } else {
                            products_data.splice(index,1,item);
                            console.log(chalk.blue('After edit...'));
                            console.table(products_data);
                            rl.close();
                        }
                    })
                })
            })
        }
    })
}


// 4. Function to delete a product
function deleteProduct(){
    console.table(products_data);
    rl.question('Select id to delete : ', id => {
        if(products_data.find( x => x.id == id)){
            const index= products_data.findIndex( x => x.id == id);
            products_data.splice(index,1);
            console.log(chalk.red('After delete...'));
            console.table(products_data);
            rl.close();
        }else{
            console.log(chalk.red(`There is no product with id :${id}...`));
            rl.close(0);
        }
    })
}

// 5. Function to filter a product
function filterProduct(){
    console.log(chalk.yellow('Filter product details'));
    const filtered_products = [...new Set(products_data.map(c => c.category))];
    filtered_products.forEach((data)=> {
        const filter = products_data.filter(x => x.category== data);
        console.log(data,' :');
        console.table(filter);
    })
    process.exit(0);
}

// 6.Function to check product exist or not
function existProduct(){
    rl.question('Enter product ID or Name to check product exist or not : ', (value) =>{
        const product = products_data.find( product_data => product_data.id==value || product_data.name==value)
        if(product){
            console.table(product);
            rl.close();
        }else{
            console.log(chalk.cyan(`There is no product with ${value}...`))
            rl.close();
        }
    })
}

//Check input is validate or not
const schema = Joi.object({
    id: Joi.number().integer().min(1).required(),
    name: Joi.string().required(),
    price: Joi.number().positive().required(),
    category: Joi.string().required(),
});