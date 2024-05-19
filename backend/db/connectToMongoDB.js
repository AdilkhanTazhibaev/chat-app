import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URI);
		console.log("Подключен к MongoDB");
	} catch (error) {
		console.log("Ошибка подключения к MongoDB", error.message);
	}
	console.log(process.env.MONGO_DB_URI)
};

export default connectToMongoDB;
