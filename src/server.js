import express from 'express'
import morgan from 'morgan'
const app = express();

import {options} from '../configDB.js'
import knex from 'knex'

app.use(express.static( '/public'));
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

//import {routesProducts} from './routes/routesProducts.js';
//app.use("/api/productos", routesProducts);

knex(options).schema.createTableIfNotExists('products', (table) => {
  table.increments('id').primary();
  table.string('nombre');
  table.string('descripcion');
  table.integer('precio');
  table.integer('cantidad');
}).then(() => {
  console.log('Tabla creada');
}
).catch((err) => {
  console.log(err);
}
);

const server = app.listen(PORT, () => {
  console.log(` 🚀 Server started at http://localhost:${PORT}`);
});

server.on("error", (err) => console.log(err));
