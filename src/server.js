import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let posts = [{
    id: 1,
    title: 'Hello World',
    coverUrl: 'https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png',
    contentPreview: 'Esta é a estrutura de um post esperado pelo front-end',
    content: 'Este é o conteúdo do post, o que realmente vai aparecer na página do post...',
    commentCount: 2
  }]

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.get("/posts/:id", (req, res) => {
    const id =  req.params.id;
    const response = posts.filter(n => n.id == id);   
    res.send(response[0]);
});

app.post("/posts", (req,res) => {
    let newPost = req.body;
    newPost = {...newPost, id: posts.length +1, contentPreview: "", content: "", commentCount: 0}
    posts.push(newPost);
    res.send("post adicionado");
})

app.listen(4000);