// Utility functions for string manipulation

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function truncateString(string, maxLength) {
  return string.length > maxLength
    ? `${string.substring(0, maxLength)}...`
    : string;
}

export function numberToWords(num) {
  if (num === 0) return "zero";

  const lessThan20 = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];

  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  const thousands = ["", "thousand", "million", "billion", "trillion"];

  function helper(num) {
    if (num === 0) {
      return "";
    } else if (num < 20) {
      return lessThan20[num] + " ";
    } else if (num < 100) {
      return tens[Math.floor(num / 10)] + " " + helper(num % 10);
    } else {
      return (
        lessThan20[Math.floor(num / 100)] + " hundred " + helper(num % 100)
      );
    }
  }

  function convertIntegerPart(num) {
    let result = "";
    for (let i = 0; num > 0; i++) {
      let chunk = num % 1000;
      if (chunk > 0) {
        result = helper(chunk) + thousands[i] + " " + result;
      }
      num = Math.floor(num / 1000);
    }
    return result.trim();
  }

  function convertFractionalPart(num) {
    let result = "";
    for (let digit of num) {
      result += lessThan20[digit] + " ";
    }
    return result.trim();
  }

  // Split the number into integer and fractional parts
  const [integerPart, fractionalPart] = num.toString().split(".");

  let result = convertIntegerPart(parseInt(integerPart));
  if (fractionalPart !== undefined) {
    result += " point " + convertFractionalPart(fractionalPart);
  }

  return result.trim();
}
