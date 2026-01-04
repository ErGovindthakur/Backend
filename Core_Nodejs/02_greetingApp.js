// Note why process.argv[2]

/* 
   process.argv[0] already filled, 
   process.argv[1] already filled
*/
const name = process.argv[2]


const hours = new Date().getHours(); // 24 hours formate

console.log(hours)

function getGreetings(hours){
     if(hours < 4 || hours >= 19) return "Good night";
     if(hours < 9 ) return "Good Morning";
     if(hours < 16) return "Good Afternoon";

     return "Good Evening";
}

const greetings = getGreetings(7);
console.log(`${greetings}, ${name}!`)