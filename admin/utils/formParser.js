

class FormParser{
	constructor(){
		this.name = [];
		this.parsedValues = {}
	}
	
	parse(req){
		this.req = req.params;
		return this.req
	}
	
	field(fieldName){
		let fieldValue = this.req[fieldName]['buffer'].toString();
		this.fileType = this.req[fieldName]['type'];
		return fieldValue;
	}
	
	fields(fields){
		let fieldValues = {}
		for( let name = 0; name <fields.length;name++){
			let data1 = fields[name]
			let data2 = this.req[fields[name]]['buffer'].toString()
			this.parsedValues[data1] = data2
		}
			return this.parsedValues;
	}
	
	type(){
		
		return this.fileType;
	}
}



module.exports = new FormParser();