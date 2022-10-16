const db = require("../../models");
const RegionMasters = require('../regionmaster.controller');

describe('TestingRegion', () => {
	it('it should return name required error',async()=>{
		const next=jest.fn((obj)=>{
			expect(obj.status).toBe(500)
			expect(obj.message).toBe('RegionMaster not created, name field is empty')
		});
		const res=await RegionMasters.create({body:{}},{} ,next )
	});

	it('it should create region ',async()=>{
		const next=jest.fn((obj)=>{
		});

		const res=await RegionMasters.create({body:{name:'region1'}},{} ,next )
		console.log(res)
		expect(res.name).toBe('region1')
		await db.regionmasters.destroy({where:{id:res.id}})
	});

	it('it should fetch all regions',async()=>{
		const next=jest.fn((obj)=>{
		});

		const res=await RegionMasters.create({body:{name:'region2'}},{} ,next )
		const allRegions=await RegionMasters.getAll({query:{}},{},next)
		const isRegionThere=allRegions.find((i)=>{if(i.id===res.id){return i}})
		expect(isRegionThere.name).toBe('region2')		

		await	db.regionmasters.destroy({where:{id:res.id}})
	});

	it('it should update region object',async ()=>{
		const next=jest.fn((obj)=>{
		});

		const res=await RegionMasters.create({body:{name:'region3'}},{} ,next )

		const updateNext=jest.fn((obj)=>{})	
		const updatedRes=await RegionMasters.update({params:{id:res.id} ,body:{name:'region4'}  },{},updateNext)
		expect(updatedRes[0]).toBe(1)

		const regionByIdRow=await db.regionmasters.findOne({where:{id:res.id}})
		const updatedRegion=regionByIdRow.toJSON()
		await	db.regionmasters.destroy({where:{id:res.id}})
		expect(updatedRegion.name).toBe('region4')

	});
});

