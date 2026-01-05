// Exploring user defined module in nodejs

// here "getGreetings" is a module (user defined) of nodejs

// New way to export (with exact name)
export let getGreetings = (hours) => {
     if(hours < 3 || hours > 19) return "Good night";
     if(hours < 12) return "Good morning";
     if(hours < 16) return "Good afternoon";
     return "Good evening"
}

// exporting modules (old ways)
// module.exports = getGreetings;


// ESM (new way) (This is default exporting)
// export default getGreetings;