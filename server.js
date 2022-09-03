const { app } = require ("./app")
const { db } = require ("./utils/database.util")

const startServer = async ()=> {
    try {
        //Authenticated and synced the database 
        await db.authenticate()
        .then(res => console.log("Authenticated"))
        await db.sync()
        .then(res => console.log("Synced"))

        //Setting server to listen
        const PORT = 4001;
        app.listen(PORT, ()=> {
            console.log("Express app running!")
        })
        
    } catch (error) {
        console.log(error)  
    }
};

startServer();



