import { createServer, Model } from 'miragejs';

export const makeServer = ({ environment = "test" } = {}) => {
	let server = createServer({
		environment,
		models: {
			user: Model,
			pet: Model,
			feedStaus: Model,
		},
		seeds(server) {
			// server.create("user", { name: "Bob" })
			server.create("pet", { id: "000-1" ,name: "Opal", species: 0,  iconId: 'brown-dog'});
			server.create("pet", { id: "000-2", name: "Rudy", species: 1, iconId: 'grey-cat'});
			server.create("pet",{ id: "000-3", name: "Bella", species: 1, iconId: 'torty-cat'});
			// server.create("feedStatus", { date: new Date(), } )
		},
		routes() {
			this.namespace = "api"

			this.get('/users', (schema) => {
				return schema.users.all()
			})

			this.get('/pets/feeder', () => ({
				pets: this.schema.pets.all().models,
				feedStatus: {
					breakfast : ['Rudy', 'Bella'],
					dinner: []
				}
			}))

			let newIdIndex = 4;

			this.patch('/pets/feeder', (schema, request) => {
				const attrs = JSON.parse(request.requestBody);
				console.log(attrs);
			})
		},
	})

	return server;
}