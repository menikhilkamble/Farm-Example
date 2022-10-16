const db = require("../../models");
const FieldMasters = require('../fieldmaster.controller');
const RegionMasters = require('../regionmaster.controller');
const RegionFields = require('../regionfield.controller');

describe('TestingRegionFields', ()=>{
	it('it should return region_id required error',async()=>{
		const next = jest.fn((obj)=>{
			expect(obj.status).toBe(500)
			expect(obj.message).toBe('RegionField not created, region_id field is empty')
		});
		const res = await RegionFields.create({body:{}},{},next)
	});

	it('it should return field_id required error',async()=>{
		const next = jest.fn((obj)=>{
			expect(obj.status).toBe(500)
			expect(obj.message).toBe('RegionField not created, field_id field is empty')
		});
		const res = await RegionFields.create({body:{region_id:1}},{},next)
	});

	it('it should create RegionFields ',async ()=>{
		const next=jest.fn((obj)=>{
		});


		const fieldRes=await FieldMasters.create({body:{name:'regionfieldField1'}},{} ,next )
		const regionRes=await RegionMasters.create({body:{name:'regionfieldRegion1'}},{} ,next )

		const res=await RegionFields.create({body:{region_id:regionRes.id, field_id:fieldRes.id, is_region: true, is_field: false}}  ,{},next)
		await db.fieldmasters.destroy({where:{id:fieldRes.id}})
		await db.regionmasters.destroy({where:{id:regionRes.id}})
		await db.regionfields.destroy({where:{id:res.id}})
	});

	it('it should fetch all crops',async()=>{
		const next=jest.fn((obj)=>{
		});

		const fieldRes=await FieldMasters.create({body:{name:'regionfieldField2'}},{} ,next )
		const regionRes=await RegionMasters.create({body:{name:'regionfieldRegion2'}},{} ,next )

		const res=await RegionFields.create({body:{region_id:regionRes.id, field_id:fieldRes.id, is_region: true, is_field: false}}  ,{},next)
		
		const allRegionFields=await RegionFields.getAll({query:{}},{},next)
		console.log(allRegionFields)
		const allRegionFieldsThere=allRegionFields.find((i)=>{if(i.id===res.id){return i}})
		expect(allRegionFieldsThere.region_id).toBe(allRegionFieldsThere.id)		

		await db.fieldmasters.destroy({where:{id:fieldRes.id}})
		await db.regionmasters.destroy({where:{id:regionRes.id}})
		await db.regionfields.destroy({where:{id:res.id}})
	});
});