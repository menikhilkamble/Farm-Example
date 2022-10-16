const db = require('../../models');
const OrganizationMasters = require('../organizationmaster.controller');

describe('TestingOrganization', ()=> {
	it('it should return name required field', async()=>{
		const next = jest.fn((objOrganization) => {
			expect(objOrganization.status).toBe(500)
			expect(objOrganization.message).toBe('OrganizationMaster not created, name field is empty')
		});
		const res = OrganizationMasters.create({body:{}},{},next)
	});

	it('it should create organization ',async()=>{
		const next=jest.fn((obj)=>{
		});

		const res=await OrganizationMasters.create({body:{name:'organization1'}},{} ,next )
		console.log(res)
		expect(res.name).toBe('organization1')
		await	db.organizationmasters.destroy({where:{id:res.id}})
	});

	it('it should fetch all organizations',async()=>{
		const next=jest.fn((obj)=>{
		});

		const res=await OrganizationMasters.create({body:{name:'organization2'}},{} ,next )
		const allOrganizations=await OrganizationMasters.getAll({query:{}},{},next)
		const isOrganizationThere=allOrganizations.find((i)=>{if(i.id===res.id){return i}})
		expect(isOrganizationThere.name).toBe('organization2')		

		await db.organizationmasters.destroy({where:{id:res.id}})
	});

	it('it should update organization object',async ()=>{
		const next=jest.fn((obj)=>{
		});

		const res=await OrganizationMasters.create({body:{name:'organization3'}},{} ,next )

		const updateNext=jest.fn((obj)=>{})	
		const updatedRes=await OrganizationMasters.update({params:{id:res.id} ,body:{name:'organization4'}  },{},updateNext)
		expect(updatedRes[0]).toBe(1)

		const organizationByIdRow=await db.organizationmasters.findOne({where:{id:res.id}})
		const updatedOrganization=organizationByIdRow.toJSON()
		await	db.organizationmasters.destroy({where:{id:res.id}})
		expect(updatedOrganization.name).toBe('organization4')

	});
});