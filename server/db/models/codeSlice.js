
var codeSlice = new mongoose.Schema({
    text: {
        type: String
    },
    time: {
        type: Date
    },
    associatedCast: {
    	type: Number
    }
});



mongoose.model('CodeSlice', codeSlice);