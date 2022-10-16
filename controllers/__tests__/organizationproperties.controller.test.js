const db = require("../../models");
const OrganizationMasters = require('../organizationmaster.controller');
const PropertiesMasters = require('../propertiesmaster.controller');
const OrganizationPropertiesMasters = require('../organizationproperties.controller');

describe('TestingOrganizationProperties', ()=>{
	it('it should return property_id required error',async()=>{
		const next = jest.fn((obj)=>{
			expect(obj.status).toBe(500)
			expect(obj.message).toBe('OrganizationPropertiesMaster not created, property_id field is empty')
		});
		const res = await OrganizationPropertiesMasters.create({body:{}},{},next)
	});

	it('it should return orginization_id required error',async()=>{
		const next = jest.fn((obj)=>{
			expect(obj.status).toBe(500)
			expect(obj.message).toBe('OrganizationPropertiesMaster not created, orginization_id field is empty')
		});
		const res = await OrganizationPropertiesMasters.create({body:{property_id:1}},{},next)
	});

	it('it should create organizationproperties ',async ()=>{
		const next=jest.fn((obj)=>{
		});


		const organizationpropertiesOrganizationRes = await OrganizationMasters.create({body:{name:'organizationpropertiesOrganization1'}} ,{},next)
		const organizationpropertiesPropertyRes = await PropertiesMasters.create({body:{name:'organizationpropertiesProperty1'}},{} ,next )

		const res=await OrganizationPropertiesMasters.create({body:{property_id:organizationpropertiesPropertyRes.id, orginization_id:organizationpropertiesOrganizationRes.id}}  ,{},next)
		await db.organizationmasters.destroy({where:{id:organizationpropertiesOrganizationRes.id}})
		await db.propertiesmasters.destroy({where:{id:organizationpropertiesPropertyRes.id}})
		await db.organizationpropertiesmasters.destroy({where:{id:res.id}})
	});

	it('it should fetch all crops',async()=>{
		const next=jest.fn((obj)=>{
		});

		const organizationpropertiesOrganizationRes = await OrganizationMasters.create({body:{name:'organizationpropertiesOrganization2'}} ,{},next)
		const organizationpropertiesPropertyRes = await PropertiesMasters.create({body:{name:'organizationpropertiesProperty2'}},{} ,next )

		const res=await OrganizationPropertiesMasters.create({body:{property_id:organizationpropertiesPropertyRes.id, orginization_id:organizationpropertiesOrganizationRes.id}}  ,{},next)
		
		const allOrganizationPropertiess=await OrganizationPropertiesMasters.getAll({query:{}},{},next)
		console.log(allOrganizationPropertiess)
		const allallOrganizationPropertiessThere=allOrganizationPropertiess.find((i)=>{if(i.id===res.id){return i}})
		expect(allallOrganizationPropertiessThere.orginization_id).toBe(organizationpropertiesOrganizationRes.id)		

		await db.organizationmasters.destroy({where:{id:organizationpropertiesOrganizationRes.id}})
		await db.propertiesmasters.destroy({where:{id:organizationpropertiesPropertyRes.id}})
		await db.organizationpropertiesmasters.destroy({where:{id:res.id}})
	});

	it('it should update crop object by organization_id',async ()=>{
		const next=jest.fn((obj)=>{
		});

		const organizationpropertiesOrganizationRes = await OrganizationMasters.create({body:{name:'organizationpropertiesOrganization3'}} ,{},next)
		const organizationpropertiesPropertyRes = await PropertiesMasters.create({body:{name:'organizationpropertiesProperty3'}},{} ,next )
		const organizationpropertiesOrganizationRes2 = await OrganizationMasters.create({body:{name:'organizationpropertiesOrganization4'}} ,{},next)
		
		const res=await OrganizationPropertiesMasters.create({body:{property_id:organizationpropertiesPropertyRes.id, orginization_id:organizationpropertiesOrganizationRes.id}}  ,{},next)
		

		const updateNext=jest.fn((obj)=>{})	
		const updatedRes=await OrganizationPropertiesMasters.update({params:{id:res.id} ,body:{orginization_id:organizationpropertiesOrganizationRes2.id}  },{},updateNext)
		expect(updatedRes[0]).toBe(1)

		const organizationPropertiesByIdRow=await db.organizationpropertiesmasters.findOne({where:{id:res.id}})
		const updatedorganizationProperties = organizationPropertiesByIdRow.toJSON()
		expect(updatedorganizationProperties.orginization_id).toBe(organizationpropertiesOrganizationRes2.id)

		await db.organizationmasters.destroy({where:{id:organizationpropertiesOrganizationRes.id}})
		await db.propertiesmasters.destroy({where:{id:organizationpropertiesPropertyRes.id}})
		await db.organizationmasters.destroy({where:{id:organizationpropertiesOrganizationRes2.id}})
		await db.organizationpropertiesmasters.destroy({where:{id:res.id}})

	});

	it('it should update crop object by property_id',async ()=>{
		const next=jest.fn((obj)=>{
		});

		const organizationpropertiesOrganizationRes = await OrganizationMasters.create({body:{name:'organizationpropertiesOrganization5'}} ,{},next)
		const organizationpropertiesPropertyRes = await PropertiesMasters.create({body:{name:'organizationpropertiesProperty5'}},{} ,next )
		const organizationpropertiesPropertyRes2 = await PropertiesMasters.create({body:{name:'organizationpropertiesProperty6'}} ,{},next)
		
		const res=await OrganizationPropertiesMasters.create({body:{property_id:organizationpropertiesPropertyRes.id, orginization_id:organizationpropertiesOrganizationRes.id}}  ,{},next)
		

		const updateNext=jest.fn((obj)=>{})	
		const updatedRes=await OrganizationPropertiesMasters.update({params:{id:res.id} ,body:{property_id:organizationpropertiesPropertyRes2.id}  },{},updateNext)
		expect(updatedRes[0]).toBe(1)

		const organizationPropertiesByIdRow=await db.organizationpropertiesmasters.findOne({where:{id:res.id}})
		const updatedorganizationProperties = organizationPropertiesByIdRow.toJSON()
		expect(updatedorganizationProperties.property_id).toBe(organizationpropertiesPropertyRes2.id)

		await db.organizationmasters.destroy({where:{id:organizationpropertiesOrganizationRes.id}})
		await db.propertiesmasters.destroy({where:{id:organizationpropertiesPropertyRes.id}})
		await db.organizationmasters.destroy({where:{id:organizationpropertiesPropertyRes2.id}})
		await db.organizationpropertiesmasters.destroy({where:{id:res.id}})

	});
});