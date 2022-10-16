const db = require("../../models");
const PropertyRegionFieldMasters = require('../propertyregionfield.controller');
const PropertyMasters = require('../propertiesmaster.controller');
const RegionMasters = require('../regionmaster.controller');
const FieldMasters = require('../fieldmaster.controller');


describe('TestingPropertyregionfield', () => {
	it('it should return region_id required error',async()=>{
		const next=jest.fn((obj)=>{
			expect(obj.status).toBe(500)
			expect(obj.message).toBe('PropertyRegionField not created, region_id field is empty')
		});
		const res=await PropertyRegionFieldMasters.create({body:{}},{} ,next )
	});

	it('it should return property_id required error',async()=>{
		const next=jest.fn((obj)=>{
			expect(obj.status).toBe(500)
			expect(obj.message).toBe('PropertyRegionField not created, region_id field is empty')
		});
		const res=await PropertyRegionFieldMasters.create({body:{}},{} ,next )
	});

	it('it should create property region field ',async ()=>{
		const next=jest.fn((obj)=>{
		});

		const res=await RegionMasters.create({body:{name:'region'}}  ,{},next)
		await db.regionmasters.destroy({where:{id:res.id}})

		const propertyRes=await PropertyMasters.create({body:{name:'property',property_type:1}},{},next)
		console.log(propertyRes)
		await db.propertiesmasters.destroy({where:{id:propertyRes.id}})

		const fieldRes=await FieldMasters.create({body:{name:'field'}} ,{},next)
		await db.fieldmasters.destroy({where:{id:fieldRes.id}})

		const payload={ region_id:res.id, property_id:propertyRes.id, field_id:fieldRes.id, is_region:true, is_field:false }

		console.log(payload)
		const resultNext=jest.fn(()=>{})
		const result=await PropertyRegionFieldMasters.create({body:{...payload}} ,{},resultNext)

		await	db.propertyregionfields.destroy({where:{id:result.id}})
	}); 

	it('it should update property region field object',async ()=>{
		const next=jest.fn((obj)=>{
		});
		const regionRes=await RegionMasters.create({body:{name:'region'}}  ,{},next)
		const regionRes2=await RegionMasters.create({body:{name:'region updated'}}  ,{},next)

		const propertyRes=await PropertyMasters.create({body:{name:'property',property_type:1}},{},next)
		const propertyRes2=await PropertyMasters.create({body:{name:'property updated',property_type:1}},{},next)

		const fieldRes=await FieldMasters.create({body:{name:'field'}} ,{},next)
		await db.fieldmasters.destroy({where:{id:fieldRes.id}})

		const payload={ region_id:regionRes.id, property_id:propertyRes.id, field_id:fieldRes.id, is_region:true, is_field:false }

		console.log(payload)
		const resultNext=jest.fn(()=>{})
		const result=await PropertyRegionFieldMasters.create({body:{...payload}} ,{},resultNext)

		const updateNext=jest.fn((obj)=>{})	
		const updatedRes=await PropertyRegionFieldMasters.update({params:{id:result.id} ,body:{region_id:regionRes2.id}  },{},updateNext)
		expect(updatedRes[0]).toBe(1)

		const fieldByIdRow=await db.propertyregionfields.findOne({where:{id:result.id}})
		const updatedField=fieldByIdRow.toJSON()
		await	db.propertyregionfields.destroy({where:{id:result.id}})
		expect(updatedField.region_id).toBe(regionRes2.id)
		await db.regionmasters.destroy({where:{id:regionRes.id}})
		await db.propertiesmasters.destroy({where:{id:regionRes2.id}})
		await db.propertiesmasters.destroy({where:{id:propertyRes.id}})
		await db.propertiesmasters.destroy({where:{id:propertyRes2.id}})

	});

	it('it should fetch all property region field',async()=>{
		const next=jest.fn((obj)=>{
		});

		const res=await RegionMasters.create({body:{name:'region'}}  ,{},next)
		await db.regionmasters.destroy({where:{id:res.id}})

		const propertyRes=await PropertyMasters.create({body:{name:'property',property_type:1}},{},next)
		await db.propertiesmasters.destroy({where:{id:propertyRes.id}})

		const fieldRes=await FieldMasters.create({body:{name:'field'}} ,{},next)
		await db.fieldmasters.destroy({where:{id:fieldRes.id}})

		const payload={ region_id:res.id, property_id:propertyRes.id, field_id:fieldRes.id, is_region:true, is_field:false }

		console.log(payload)
		const resultNext=jest.fn(()=>{})
		const result=await PropertyRegionFieldMasters.create({body:{...payload}} ,{},resultNext)
		const allPropertyRegionFieldMasters=await PropertyRegionFieldMasters.getAll({query:{}},{},next)
		const isFieldThere=allPropertyRegionFieldMasters.find((i)=>{if(i.id===result.id){return i}})
		expect(isFieldThere.region_id).toBe(result.region_id)		

		await	db.propertyregionfields.destroy({where:{id:result.id}})
	});

})

