const Sequelize = require("sequelize");
const db = require("../../models");
const UserMasters = require('../usermaster.controller');

describe('Testing', () => {

	let mockedSequelize;
	beforeEach(async () => {
		mockedSequelize = new Sequelize({
			database: 'Test',
			dialect: 'mysql',
			username: 'root',
			password: 'root123',
			validateOnly: true,
			models: [__dirname + '../../models'],
		});
		await mockedSequelize.sync({ force: true });
	});

	afterEach(async () => {
		jest.clearAllMocks();
		await mockedSequelize.close();
	});

	it('it should be signed-in',async()=>{
		const next=jest.fn((obj)=>{
			expect(obj.status).toBe(401)
			expect(obj.message).toBe('Authentication failed. Invalid user or password.')
		});

		const user={
			email: `amit@gmail.com`,
			password: 'test',
		}

		await UserMasters.sign_in({body:{...user}} ,{},next)
		const userObjectPayload={
			email: `amit@gmail.com`,
			password: 'test',
			status: true
		}

		const userObject=await db.usermasters.create(userObjectPayload);
		const nextF=jest.fn((obj)=>{})
		const res=await UserMasters.sign_in({body:{...userObjectPayload}},{} , nextF)
 		expect(res.email).toBe(userObjectPayload.email)
		expect(res).toHaveProperty('token')
		await db.usermasters.destroy({where:{email:res.email}}  )
	});

	it('it should create a user ',async()=>{
		const next=jest.fn((obj)=>{
			// console.log(obj)
		})

		const userObject={email:'testss@gmail.com',password:'test'}
		const res = await UserMasters.create({body:{...userObject} },{} ,next )
		// console.log(res)
		expect(res.email).toBe(userObject.email)
		await db.usermasters.destroy({where:{id:res.id}}  )
	});

	it('it should return email required error',async()=>{
		const next=jest.fn((obj)=>{
			expect(obj.status).toBe(500)
			expect(obj.message).toBe('UserMaster not created, email field is empty')
		});
		const res=await UserMasters.create({body:{}},{} ,next )
	});

	it('it should return enter valid email error',async()=>{
		const next=jest.fn((obj)=>{
			expect(obj.status).toBe(500)
			expect(obj.message).toBe('UserMaster not created, email field is invalid')
		});
		const res=await UserMasters.create({body:{email:"test",password:"test"}},{} ,next )
	});

	it('it should return password required error',async()=>{
		const next=jest.fn((obj)=>{
			expect(obj.message).toBe('UserMaster not created, password field is empty')
		});
		const res=await UserMasters.create({body:{email:'test@gmail.com'}},{} ,next )
	});

	it('it should fetch all users', async () => {
			jest.spyOn( db.usermasters, 'create')
			jest.spyOn( db.usermasters, 'destroy')

			const user={
				email: `amit@gmail.com`,
				password: 'test',
				status: true
			}

			const userObject=await db.usermasters.create(user);
			const id=userObject.toJSON().id

			const res=await UserMasters.getAll({query:{}},{},()=>{})
			const allUsers=res.responseData;
			const newlyInsertedUser=allUsers.find((i)=>i.email===user.email)
			expect(newlyInsertedUser.id).toBe(id)
			await db.usermasters.destroy({where:{id:id}}  )
	});
});

