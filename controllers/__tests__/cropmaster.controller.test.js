const db = require("../../models");
const FieldMasters = require('../fieldmaster.controller');
const CropMasters = require('../cropmaster.controller')

describe('TestingCrop', ()=>{
	it('it should return name required error',async()=>{
		const next = jest.fn((obj)=>{
			expect(obj.status).toBe(500)
			expect(obj.message).toBe('CropMaster not created, name field is empty')
		});
		const res = await CropMasters.create({body:{}},{},next)
	});

	it('it should return field_id required error',async()=>{
		const next = jest.fn((obj)=>{
			expect(obj.status).toBe(500)
			expect(obj.message).toBe('CropMaster not created, field_id field is empty')
		});
		const res = await CropMasters.create({body:{name:'test'}},{},next)
	});

	it('it should create crop master ',async ()=>{
		const next=jest.fn((obj)=>{
		});

		const fieldRes=await FieldMasters.create({body:{name:'fieldCrop1'}} ,{},next)
		
		const res=await CropMasters.create({body:{name:'crop1', field_id:fieldRes.id}}  ,{},next)
		await db.fieldmasters.destroy({where:{id:fieldRes.id}})
		await db.cropmasters.destroy({where:{id:res.id}})
	});

	it('it should fetch all crops',async()=>{
		const next=jest.fn((obj)=>{
		});

		const fieldRes=await FieldMasters.create({body:{name:'fieldCrop2'}},{} ,next )
		const res=await CropMasters.create({body:{name:'crop2', field_id:fieldRes.id}}  ,{},next)

		const allCrops=await CropMasters.getAll({query:{}},{},next)
		console.log(allCrops)
		const allCropsThere=allCrops.find((i)=>{if(i.id===res.id){return i}})
		expect(allCropsThere.name).toBe('crop2')		

		await db.fieldmasters.destroy({where:{id:fieldRes.id}})
		await db.cropmasters.destroy({where:{id:res.id}})
	});

	it('it should update crop object by name',async ()=>{
		const next=jest.fn((obj)=>{
		});

		const fieldRes=await FieldMasters.create({body:{name:'fieldCrop3'}},{} ,next )
		const res=await CropMasters.create({body:{name:'crop3', field_id:fieldRes.id}}  ,{},next)

		const updateNext=jest.fn((obj)=>{})	
		const updatedRes=await CropMasters.update({params:{id:res.id} ,body:{name:'crop4'}  },{},updateNext)
		expect(updatedRes[0]).toBe(1)

		const cropByIdRow=await db.cropmasters.findOne({where:{id:res.id}})
		const updatedField=cropByIdRow.toJSON()

		await db.fieldmasters.destroy({where:{id:fieldRes.id}})
		await db.cropmasters.destroy({where:{id:res.id}})
		
		expect(updatedField.name).toBe('crop4')

	});

	it('it should update crop object by field id',async ()=>{
		const next=jest.fn((obj)=>{
		});

		const fieldRes=await FieldMasters.create({body:{name:'fieldCrop5'}},{} ,next )
		const fieldRes1=await FieldMasters.create({body:{name:'fieldCrop6'}},{} ,next )
		const res=await CropMasters.create({body:{name:'crop5', field_id:fieldRes.id}}  ,{},next)

		const updateNext=jest.fn((obj)=>{})	
		const updatedRes=await CropMasters.update({params:{id:res.id} ,body:{field_id:fieldRes1.id}  },{},updateNext)
		expect(updatedRes[0]).toBe(1)

		const cropByIdRow=await db.cropmasters.findOne({where:{id:res.id}})
		const updatedField=cropByIdRow.toJSON()

		expect(updatedField.field_id).toBe(fieldRes1.id)

		await db.fieldmasters.destroy({where:{id:fieldRes.id}})
		await db.fieldmasters.destroy({where:{id:fieldRes1.id}})
		await db.cropmasters.destroy({where:{id:res.id}})
		
	});
});