/**
 * Created by jamie on 24/04/2017.
 * "Write a program that prints the numbers from 1 to 100. But for multiples of three print “Fizz”
 * instead of the number and for the multiples of five print “Buzz”. For numbers which are multiples
 * of both three and five print “FizzBuzz”."
 */
for (let count = 1; count <= 100; count++) {
    if (count % 15 === 0) {
        console.log('Fizz Buzz')
    } else if (count % 5 === 0) {
        console.log('Buzz')
    }
    else if (count % 3 === 0) {
        console.log('Fizz')
    }
    else {
        console.log(count)
    }
}