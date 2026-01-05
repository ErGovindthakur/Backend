// Exploring user defined module in nodejs

// here "getGreetings" is a module (user defined) of nodejs
let getGreetings = (hours) => {
     if(hours < 3 || hours > 19) return "Good night";
     if(hours < 12) return "Good morning";
     if(hours < 16) return "Good afternoon";
     return "Good evening"
}

// exporting modules (old ways)
module.exports = getGreetings;