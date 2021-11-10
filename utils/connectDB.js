import mongoose from 'mongoose';

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected');
    return;
  }
  mongoose.connect(
    process.env.MONGODB_URL,
    {
      //iz nekog razloga buffer-uje prilikom ubacivanja u MDB bazu ako postoje ovi parametri
      // useCreateIndex: true,
      // useFindAndModify: false,
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log('Connected to mongodb.');
    }
  );
};
export default connectDB;
