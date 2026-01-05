// writing simple code using nodejs

// import process from "process";
// console.log(process)

// let hours = new Date().getHours();

// let name = process.argv[2];

export const getGreeting = (hours) => {
     if(hours < 3 || hours > 19) return "Good Night!";
     if(hours < 11) return "Good Morning!";
     if(hours < 16) return "Good Afternoon!";
     return "Good Evening!"
}

// let greet = getGreeting(hours);

// console.log(`${greet},${name}`)