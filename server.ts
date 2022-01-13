import * as http from 'http';
import * as path from 'path';
import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { readFileSync, writeFileSync } from 'fs';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const todos = express();

todos.get('/', (_, res) => {
  const data = JSON.parse(readFileSync(path.join(process.cwd(), 'data.json'), 'utf8'));
  res.json(data);
})

todos.post('/', (req, res) => {
  const data = JSON.parse(readFileSync(path.join(process.cwd(), 'data.json'), 'utf8'));
  req.body.id = data.length
  data.push(req.body)
  writeFileSync(path.join(process.cwd() + '/data.json'), JSON.stringify(data));
  return res.json(data);
})

todos.put('/:index', (req, res) => {
  const data = JSON.parse(readFileSync(path.join(process.cwd(), 'data.json'), 'utf8'));
  let mappedArray = data.map(function (ele: any) {
    if (ele.id == req.params.index) ele.is_checked = req.body.is_checked;
    return ele;
  })
  writeFileSync(path.join(process.cwd() + '/data.json'), JSON.stringify(mappedArray));
})


todos.delete('/:index', (req, res) => {
  const data = JSON.parse(readFileSync(path.join(process.cwd(), 'data.json'), 'utf8'));
  data.splice(req.params.index, 1);
  writeFileSync(path.join(process.cwd() + '/data.json'), JSON.stringify(data));
  return res.json(data);
})

app.use('/api/todos', todos);

const httpServer = http.createServer(app);
const host = '0.0.0.0'
const port = 8888
httpServer.listen({ host, port }, () => console.log(`Listening on ${host}:${port}`));
