export   function addDots(input) {
    // Convert input to string
    const str = String(input);

    let result = "";
    let count = 0;

    // Loop through the characters of the string in reverse order
    for (let i = str.length - 1; i >= 0; i--) {
      // Add the current character to the result string
      result = str[i] + result;
      count++;

      // Add a dot after every 3 characters
      if (count === 3 && i !== 0) {
        result = "." + result;
        count = 0;
      }
    }

    return result;
  }
