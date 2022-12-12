# JavaScript Assignment

## JavaScript Excersises

Exercise solutions can be found in the index.js, with the exception of exercise 4, which is in its own countries.js. 
ES6 syntax is new to me, I had an excellent JavaScript teacher, but he had a more fundamental approach, and when I'm pressed for time, it's one I fall back on, which you'll see in countries.js. 

With the exception of exercise 4, they all stumped me in their own ways. For example, of course I can iterate through an array, but had never seen setTimeout before. I can parse a string and compare values, but how do you switch day, month, and year, when two numbers can meet the same conditions? This was the first time approaching (outside of React projects) an array by mapping, and it still feels odd to say 'not month', but you have to force the number switch somehow.

In exercise 3, the time difference assignment, was straight-up math, and I definitely had some trial and error. I understood what needed to happen, but needed to remind myself how to access an object. Having the from, to parameters threw me, as they're not used, and I removed them.

Exercise 6 is where I fall down the most, and needed help. I barely have experience constructing and using classes in Java. It was a typical quickl end-of-term lesson, so approaching it now was tricky. I understand well that you're constructing a class Book that has its attributes, but it's always the constructor that throws me. It always feels like you're defining it again. I also didn't understand the math in the instructions. 24% sales tax on an item with a price of 20.00 is never going to be 30.43, at least that I know of.

But, I got through it, I think, and maybe one day I'll be tackling projects large enough where it makes sense.

## Restcountries App

The site link is live at: https://kitrestcountries.netlify.app

The original instructions for this website said to use a grid system, so I used bootstrap. Time was of the essence, and I like bootstrap, for nice responsive grid-building, and a library full of options. There's a little bit of JQuery, but just for the scroll animations.

The page can display all countries if you leave the input blank, or can search for countries matching a user-input. For example, searching 'China' results in three results. The user can scroll through the results, and can click-through for more information on that country.

### Note!
The JavaScript isn't new and shiny, but it works. I don't use in-built functions for creating and manipulating elements... much. The reason is simply because it's easier for me to see the html I'm adding, just all about ease-of-use.

### How to use
Simply hit enter (or click the search icon) to show all countries. Click on the red arrow icon to scroll back to top at anytime.

To learn more about a country, click on that country's flag, or the 'More' button. It will scroll automatically to display that information. If you want to close that display, simply click the 'x' button to the left of the flag. Wait a tick, and the page will return you back to where you were.

You can start a new search at anytime, no need to close country results, or refresh the page.

These results are based on the information available at https://restcountries.com.

