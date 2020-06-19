const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');
const PORT = 3333;

const app = express();
const repositories = [];

app.use(cors());
app.use(express.json());

function logRequests(req, res, next) {
    const { method, url } = req;
    const logLabel = `[${method}] ${url}`;

    console.log(logLabel);
    return next();
}

function validateId(req, res, next) {
    const { id } = req.params;

    if(!isUuid(id)) {
        return res.status(400).json({ error: "Invalid repository ID"});
    }

    return next();
}


app.use(logRequests);
app.use('/repositories/:id', validateId);

app.get('/repositories', (req, res) => {
    const { title } = req.query;

    const results = title
        ? repositories.filter(repository => repository.title.includes(title))
        : repositories;

    return res.json(results);
})

app.post('/repositories', (req, res) => {
    const { title, owner } = req.body;
    const repository = {
        id: uuid(),
        title,
        owner
    }
    repositories.push(repository)
    return res.json(repository)
})

app.put('/repositories/:id', (req, res) => {
    const { id } = req.params;
    const { title, owner } = req.body;

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if(repositoryIndex < 0) {
        return res.status(400).json({ message: "repository not found"});
    }

    const repository = {
        id,
        title,
        owner
    }

    repositories[repositoryIndex] = repository;

    return res.json(repository);
})

app.delete('/repositories/:id', (req, res) => {
    const { id } = req.params;

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if(repositoryIndex < 0) {
        return res.status(400).json({ message: "repository not found"});
    }

    repositories.splice(repositoryIndex, 1);
    return res.status(204).send();
})


app.get('/', (req, res) => {
    return res.json({ message: 'Marcel' })
})

app.listen(PORT, () => console.log('🚀 Server is running on port:', PORT));