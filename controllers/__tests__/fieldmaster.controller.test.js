const db = require("../../models");
const FieldMasters = require('../fieldmaster.controller');

describe('TestingField', () => {
	it('it should return name required error',async()=>{
		const next=jest.fn((obj)=>{
			expect(obj.status).toBe(500)
			expect(obj.message).toBe('FieldMaster not created, name field is empty')
		});
		const res=await FieldMasters.create({body:{}},{} ,next )
	});

	it('it should create field ',async()=>{
		const next=jest.fn((obj)=>{
		});

		const res=await FieldMasters.create({body:{name:'field1'}},{} ,next )
		console.log(res)
		expect(res.name).toBe('field1')
		await	db.fieldmasters.destroy({where:{id:res.id}})
	});

	it('it should fetch all fields',async()=>{
		const next=jest.fn((obj)=>{
		});

		const res=await FieldMasters.create({body:{name:'field2'}},{} ,next )
		const allFields=await FieldMasters.getAll({query:{}},{},next)
		const isFieldThere=allFields.find((i)=>{if(i.id===res.id){return i}})
		expect(isFieldThere.name).toBe('field2')		

		await	db.fieldmasters.destroy({where:{id:res.id}})
	});

	it('it should update field object',async ()=>{
		const next=jest.fn((obj)=>{
		});

		const res=await FieldMasters.create({body:{name:'field3'}},{} ,next )

		const updateNext=jest.fn((obj)=>{})	
		const updatedRes=await FieldMasters.update({params:{id:res.id} ,body:{name:'field4'}  },{},updateNext)
		expect(updatedRes[0]).toBe(1)

		const fieldByIdRow=await db.fieldmasters.findOne({where:{id:res.id}})
		const updatedField=fieldByIdRow.toJSON()
		await	db.fieldmasters.destroy({where:{id:res.id}})
		expect(updatedField.name).toBe('field4')

	});
});

