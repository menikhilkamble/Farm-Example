const db = require("../../models");
const PropertiesMasters = require('../propertiesmaster.controller');

describe('TestingProperties', () => {
	it('it should return name required error',async()=>{
		const next=jest.fn((obj)=>{
			expect(obj.status).toBe(500)
			expect(obj.message).toBe('PropertiesMaster not created, name field is empty')
		});
		const res=await PropertiesMasters.create({body:{}},{} ,next )
	});

	it('it should create properties ',async()=>{
		const next=jest.fn((obj)=>{
		});

		const res=await PropertiesMasters.create({body:{name:'properties1'}},{} ,next )
		console.log(res)
		expect(res.name).toBe('properties1')
		await db.propertiesmasters.destroy({where:{id:res.id}})
	});

	it('it should fetch all propertiess',async()=>{
		const next=jest.fn((obj)=>{
		});

		const res=await PropertiesMasters.create({body:{name:'properties2'}},{} ,next )
		const allPropertiess=await PropertiesMasters.getAll({query:{}},{},next)
		const isPropertiesThere=allPropertiess.find((i)=>{if(i.id===res.id){return i}})
		expect(isPropertiesThere.name).toBe('properties2')		

		await db.propertiesmasters.destroy({where:{id:res.id}})
	});

	it('it should update properties object',async ()=>{
		const next=jest.fn((obj)=>{
		});

		const res=await PropertiesMasters.create({body:{name:'properties3'}},{} ,next )

		const updateNext=jest.fn((obj)=>{})	
		const updatedRes=await PropertiesMasters.update({params:{id:res.id} ,body:{name:'properties4'}  },{},updateNext)
		expect(updatedRes[0]).toBe(1)

		const propertiesByIdRow=await db.propertiesmasters.findOne({where:{id:res.id}})
		const updatedProperties=propertiesByIdRow.toJSON()
		await	db.propertiesmasters.destroy({where:{id:res.id}})
		expect(updatedProperties.name).toBe('properties4')

	});
});

