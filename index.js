/*
1. Fix the bugs in the codes below, to make the console print out different numbers
from 0 to 100
 */
const printNum = () => {
    for (let i = 0; i <= 100; i++) {
        setTimeout(() => {
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
        let keepDate = []
        let day, month, year

        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] > 31) {
                year = numbers[i]
            }

            if (numbers[i] !== year) {
                keepDate.push(numbers[i])
            }
        }

        for (let i = 0; i < keepDate.length - 1; i++) {
            if (keepDate[i] < keepDate[i + 1]) {
                month = keepDate[i]
                day = keepDate[i + 1]

            } else {
                month = keepDate[i + 1]
                day = keepDate[i]
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
const counter = () => {

    const fromDate = dateFrom
    const toDate = dateTo

    let difference, days, hours, minutes, seconds

    difference = Math.floor((toDate - fromDate) / 1000)

    days = Math.floor(difference / 86400)
    difference -= days * 86400


    hours = Math.floor(difference / 3600) % 24
    difference -= hours * 3600


    minutes = Math.floor(difference / 60) % 60
    difference -= minutes * 60

    seconds = difference % 60

    return `${days} days - ${hours} hours - ${minutes} minutes - ${seconds} seconds`

}
const timer = counter()
console.log(timer)

/*
For exercise 4, see countries.js:
/*  
4. Check the url and read documentation: https://restcountries.com
- Write a function to get all countries, sorted in alphabetical order
- Write a function to find one country based on the search input
The data fetched from url should be displayed in index.html.
*/


/*
5. Provide logic for function generateNewFolderName, which receive an array as argument. Everytime the function gets called,
it should check for folder name. If the folder named 'New Folder' does not exist, it should add the name 'New Folder' to array.
If folder 'New Folder' exists, it should add 'New Folder (1)' to array. If 'New Folder (1)' exists, it should add 'New Folder (2)'
to array, and so on.
*/

const generateNewFolderName = (existingFolders) => {


    if (existingFolders.find(name => name === newFolder)) {
        count++
        newFolder = 'New Folder (' + count + ')'

        generateNewFolderName(folder)
    } else {
        folder.push(newFolder)
    }
}

let count = 0
let newFolder = 'New Folder'
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
    _title;
    #cost;
    #profit;
    price;

    constructor(title, cost, profit, price) {
        if (title.length < 1 || cost <= 0 || profit <= 0 || profit > 0.5) {
            throw new Error("Data is not valid")
        } else {
            this._title = title;
            this.#cost = cost;
            this.#profit = profit;
        }

        price = cost / (1 - profit)
        this.price = price;
    }

    get title() {
        return this._title
    }

    get cost() {
        return this.#cost
    }

    get profit() {
        return this.#profit
    }

    get price() {

        return this.price;
    }


    increasePrice = (value) => {
        this.price += value
    }

    decreasePrice = (value) => {
        this.price -= value

        if (this.price < 0) {
            this.price = 0
        }
    }
}

class TaxableBook extends Book {
    #taxRate;

    constructor(title, cost, profit, price, taxRate = 24) {
        super(title, cost, profit, price);
        this.#taxRate = taxRate;
    }

    get totalPrice() {
        return Math.round(this.price + (this.price * this.#taxRate / 100));
    }

}

const book1 = new Book("The Power of Habits", 14, 0.3)

const book2 = new TaxableBook("The Power of Habits", 14, 0.3, 24)

console.log(`Book 1 title: ${book1.title} - price: ${book1.price}`)
console.log(`Book 2 title: ${book2.title} - price: ${book2.totalPrice}`);
