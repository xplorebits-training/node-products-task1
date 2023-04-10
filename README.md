# **How To Run Program**
Command Line Arguments To Access Following Features :

* Display Products - node products.js display
* Add New Product  - node products.js add
* Edit Product     - node products.js edit
* Delete Product   - node products.js delete
* Filter Products (Categories) - node products.js filter
* Exist Product (Id/Name) - node products.js exist

## **Instructions**

* Properties i have taken for each object is id,name,price,categories
* Here additionally i have taken Id to make products unique and throughout the code i access the products by using id.
* Validations i have taken for object values are :
  Id       : number-integer-min(1)
  Name     : string
  Price    : number-positive
  Category : string
* If user enters wrong data-type while adding or editing products-data. It shows invalid data and terminates.

## **Packages/Module I Used**

* chalk - Chalk package is used to add colours to the output.
* readline - Readline is used to prompt from the user.
* yargs - Yargs is used to execute methond/features from the command-line by above mentioned arguments.
* joi - Joi package is used to check whether user enters data in valid or not 
