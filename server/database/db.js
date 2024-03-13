import mongoose from "mongoose"

const Connection = async (username, password) => {
    const URL = `mongodb+srv://1804ajaykumar:jnojJvAaaM8KautW@cluster0.b3omswl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    try{
        await mongoose.connect(URL, {useNewUrlParser: true});
        console.log('Database connected successfully');
    }
    catch(error){
        console.log('Error while connnection the database', error);
    }
}

export default Connection;