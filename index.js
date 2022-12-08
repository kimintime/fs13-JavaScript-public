/*
1. Fix the bugs in the codes below, to make the console print out different numbers
from 0 to 100
 */
  const printNum = () => {
    for (let i = 0; i <= 100; i++) {
        setTimeout( () => {
          console.log(i);
        }, i * 1000);
      }  
  }
  printNum()

/*
2. Given the array below:
myArr = ['12-24-2014', '09-2022-23', '12-30-2021', '08-02-2021', '07-15-2018', '2019-12-14', '2022-14-12']
the array above has serveral dates, written in order month-day-year
Write the code inside function fixDate(array) below to transform the array to new
format dates day-month-year
expected result: ['24-12-2014', '23-09-2022', '30-12-2021', '08-02-2021', '15-07-2018', '14-12-2019', '14-12-2022'] . 
You only need to produce the same array as expected result, no need to consider other 
possibility.
 */

let myArr = ['12-24-2014', '09-2022-23', '12-30-2021', '08-02-2021', '07-15-2018', '2019-12-14', '2022-14-12']

const fixDate = (array) => {
    return array.map(date => {

        let numbers = date.split('-')
        let day, month, year

        for (let number of numbers) {
            if (number > 31) {
                year = number
            } else if (number <= 12 && !month) {
                month = number
            } else {
                day = number
            }
        }
        date = [day, month, year]
        return date.join('-')
    })
}

let newArr = fixDate(myArr)
console.log(newArr)

/*
3. Counter function
Write a counter funtion to print out in console the time difference between 2 given date
Expected result in the console: 11 days - 13 hours - 38 minutes - 20 seconds
*/
const dateFrom = new Date(500000)
const dateTo = new Date(1000000000)

const getDate = (stamp) => {
    const date = new Date(stamp);
    const years = date.getFullYear();
    const months = date.getMonth();
    const days = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return [years, months, days, hours, minutes, seconds]
}

const counter = (from, to) => {
    const fromDate = getDate(from);
    const toDate = getDate(to);
    const difference = [];

    for(let i = 0; i < fromDate.length; i++) {
        difference[i] = toDate[i] - fromDate[i];
    }

    return `${difference[2]} days - ${difference[3]} hours - ${difference[4]} minutes - ${difference[5]} seconds`
 }

const timer = counter(dateFrom, dateTo)
console.log(timer)


/*  
4. Check the url and read documentation: https://restcountries.com
- Write a function to get all countries, sorted in alphabetical order
- Write a function to find one country based on the search input
The data fetched from url should be displayed in index.html.
*/

const getAllCountries = () => {
    /* provide your code here */
}

const getSingleCountry = () => {
    /* provide your code here */
}

getAllCountries()

/*
5. Provide logic for function generateNewFolderName, which receive an array as argument. Everytime the function gets called,
it should check for folder name. If the folder named 'New Folder' does not exist, it should add the name 'New Folder' to array.
If folder 'New Folder' exists, it should add 'New Folder (1)' to array. If 'New Folder (1)' exists, it should add 'New Folder (2)'
to array, and so on.
*/

let folderNum = 0;
let newFolder = 'New Folder';

const generateNewFolderName = (existingFolders) => {
    
   if(existingFolders.find(name => name === newFolder)) {
       folderNum++;
       newFolder = `New Folder (${folderNum})`;
       generateNewFolderName(folder);
   } else {
       folder.push(newFolder);
   }
}

let folder = []

generateNewFolderName(folder)
generateNewFolderName(folder)
generateNewFolderName(folder)
generateNewFolderName(folder)

console.log(folder); //expect to see ['New Folder', 'New Folder (1)', 'New Folder (2)', 'New Folder (3)']


/* 
6. Complete class Book:
- class Book should have 3 properties: title (read-only, must be a string but cannot be empty), cost (private, must be positive number) and profit (private, positive number > 0 and =< 0.5)
(error should be thrown if data is not valid)
- give the logic to get book's price and profit separately.
- give the logics to increase and decrease the price with a certain amount 
- give the logic to calculate price based on cost and profit. For example: cost 14, profit 0.3 => expected price is 20.

Complete class TaxableBook: 
- inherit Book, but have 1 more private parameter in the constructor: taxRate. 
- give the logic to calculate price with taxRate. For example: 
cost 14, profit 0.3 , tax 24% => expected price is 30.43
*/
class Book {
    title;
    cost;
    profit;
    price;
    
    constructor(title, cost, profit, price = cost/(1 - profit)) {
        if(title.length < 1 || cost <= 0 || profit <= 0 || profit > 0.5) {
            throw new Error("Data is not valid")
        } else {
            this.title = title;
            this.cost = cost;
            this.profit = profit;
        }
        this.price = price;
    }

    get profit() {
        return this.price - this.cost;
    }

    get profitMultiplier() {
        return this.profit;
    }

    get title() {
        return this.title
    }
    
    get price() {
        return this.price;
    }
   
    increasePrice = (value) => {
        this.price += value;
    }
    decreasePrice = (value) => {
        this.price -= value;
        if(this.price < 0) {
            this.price = 0;
        }
    }
}

class TaxableBook extends Book{
    taxRate;

    constructor(title, cost, profit, price, taxRate = 24) {
        super(title, cost, profit, price);
        this.taxRate = taxRate;
    }

    get taxedPrice() {
        return Math.round(this.price + (this.price * 24 / 100));
    }

    get taxRate() {
        return this.taxRate;
    }

    get tax() {
        return this.price * 24 / 100;
    }

}

const book1 = new Book("The Power of Habits", 14, 0.3)
console.log(book1);
const book2 = new TaxableBook("The Power of Habits", 14, 0.3, 24)

console.log(`Book1 title: ${book1.title}`);
console.log(`Book1 profit: ${book1.profit}$ with ${book1.profitMultiplier} profit multiplier`)
console.log(`Book1 price: ${book1.price}$`)
console.log(`Book2 title: ${book2.title}`);
console.log(`Book2 profit: ${book2.profit}$ with ${book2.profitMultiplier} profit multiplier`)
console.log(`Book2 price: ${book2.price}$`);
console.log(`Book2 tax is ${book2.taxRate}%, total price is ${book2.taxedPrice} with tax ${book2.tax}`);