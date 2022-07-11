import { createServer, Model } from 'miragejs';

export const makeServer = ({ environment = "test" } = {}) => {
	let server = createServer({
		environment,
		models: {
			user: Model,
		},
		seeds(server) {
			server.create("user", { name: "Bob" })
			server.create("user", {name: "Alice"})			
		},
		routes() {
			this.namespace = "api"

			this.get('/users', (schema) => {
				return schema.users.all()
			})

			this.get('/pets/feeder', () => ({
				feedStatus: {
					breakfast : ['Opal', 'Rudy', 'Bella'],
					dinner: ['Opal']
				}
			}))
		},
	})

	return server;
}