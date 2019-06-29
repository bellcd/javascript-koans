var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */ // <<< couldn't find all() / any() ... using some()
      // filter to include
      productsICanEat = products.filter((e) => {
        return e.containsNuts === false && !(e.ingredients.some((e) => e === 'mushrooms'));
      });
        // containsNuts === false
        // any() contains mushrooms, exclude these
      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.range(1, 1000).reduce((acc, elem) => {
      if (elem % 3 === 0 || elem % 5 === 0) {
        acc += elem;
      }
      return acc;
    }, 0);    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */ /// ?? flatten() ... it's an array of objects, not arrays ...

    products.forEach(food => {
      food.ingredients.forEach(currentIng => {
        ingredientCount[currentIng] = (ingredientCount[currentIng] || 0) + 1;
      });
    });
    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  function isPrime(num) {
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
  const PRIMES_UNDER_1000 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 183, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997]
  it("should find the largest prime factor of a composite number", function () {
    // assume: composite is a composite number
    function findLargestPrimeFactorOfComposite(composite) {
      // create dividend, divisor, largestPrimeFactor
      let dividend = composite, divisor, quotient, largestPrimeFactor = 1;
      let hasMoreFactors = true;
      // loop
      while (hasMoreFactors) {
        // set divisor to 2
        divisor = 2;
        // attempt division
        // if there's any remainder, or the divisor is NOT prime
        while (dividend % divisor !== 0 || !isPrime(divisor)) {
          // increment divisor
          divisor++;
          if (divisor === dividend) { // reasonably sure this check is uneeded, because we're assuming composite will be a composite number ...
            break;
          }
        }
        // set divisor as largestPrimeFactor if it's bigger than the current one
        largestPrimeFactor = divisor > largestPrimeFactor ? divisor : largestPrimeFactor;
        // calculate quotient & set dividend
        quotient = dividend / divisor;
        dividend = quotient;
        // determine if there are more factors
        hasMoreFactors = !isPrime(dividend);
      }
      // determine if the last prime quotient is bigger than the current largest factor
      largestPrimeFactor = quotient > largestPrimeFactor ? quotient : largestPrimeFactor;
      return largestPrimeFactor;
    }

    expect(findLargestPrimeFactorOfComposite(20)).toBe(5);
    expect(findLargestPrimeFactorOfComposite(45)).toBe(5);
    expect(findLargestPrimeFactorOfComposite(105)).toBe(7);
    expect(findLargestPrimeFactorOfComposite(1994)).toBe(997);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    function isPalindrome(word) {
      if (word.length <= 1) {
        return true;
      } else {
        let first = word.slice(0, 1), last = word.slice(-1);
        if (first === last) {
          return isPalindrome(word.slice(1, -1));
        } else {
          return false;
        }
      }
    }
    // assume
      // for the sake of determining what's a palindrome
        // inputs will be integers
        // negative numbers become positive, ie >>> -9546459 becomes 9546459
    function findLargestPalindrome(num1, num2) {
      // multiply to create number
      let num = num1 * num2;
      // get the absolute value
      num = Math.abs(num);
      // look downwards towards zero, checking for palindrome
      for (let i = num; i > 0; i--) {
        // convert to string
        let str = i + '';
        // determine if palindrome
        if (isPalindrome(str)) {
          return Number.parseInt(str);
        }
      }
    }
    expect(findLargestPalindrome(534, 129)).toBe(68886);
    expect(findLargestPalindrome(-534, -129)).toBe(68886)
    expect(findLargestPalindrome(100, 100)).toBe(9999);
    expect(findLargestPalindrome(-100, -100)).toBe(9999);
    expect(findLargestPalindrome(999, 999)).toBe(997799);
    expect(findLargestPalindrome(-999, -999)).toBe(997799);
    expect(findLargestPalindrome(111, 111)).toBe(12321);
    expect(findLargestPalindrome(-111, -111)).toBe(12321);
  });

  // it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
  //
  //
  // });
  //
  // it("should find the difference between the sum of the squares and the square of the sums", function () {
  //
  // });
  //
  // it("should find the 10001st prime", function () {
  //
  // });
});
