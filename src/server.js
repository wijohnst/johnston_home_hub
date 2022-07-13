import { createServer, Model } from 'miragejs';
import { format } from 'date-fns';

export const makeServer = ({ environment = "test" } = {}) => {
	let server = createServer({
		environment,
		models: {
			user: Model,
			pet: Model,
			feedStatus: Model,
		},
		seeds(server) {
			// server.create("user", { name: "Bob" })
			server.create("pet", { id: "000-1" ,name: "Opal", species: 0,  iconId: 'brown-dog'});
			server.create("pet", { id: "000-2", name: "Rudy", species: 1, iconId: 'grey-cat'});
			server.create("pet",{ id: "000-3", name: "Bella", species: 1, iconId: 'torty-cat'});
			server.create("feedStatus", { date: format(new Date(), 'MM/dd/yyyy'), breakfast : ['Rudy', 'Bella'], dinner: []})
		},
		routes() {
			this.namespace = "api"

			this.get('/users', (schema) => {
				return schema.users.all()
			})

			this.get('/pets/feeder', () => ({
				pets: this.schema.pets.all().models,
				feedStatus: this.schema.feedStatuses.findBy({ date: format(new Date(), 'MM/dd/yyyy')})
			}))

			this.patch('/pets/feeder', (schema, request) => {
				const attrs = JSON.parse(request.requestBody);
				this.db.feedStatuses.update({date: attrs.targetDate}, {[attrs.targetMeal] : attrs.petsToUpdate});
				
				return this.db.feedStatuses.where({date: attrs.targetDate});
			})
		},
	})

	return server;
}