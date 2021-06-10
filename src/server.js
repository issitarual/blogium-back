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

let comments = [
    {
        id: 1,
        postId: 1,
        author: 'João',
        content: 'Muito bom esse post! Tá de parabéns'
      }, {
        id: 2,
        postId: 1,
        author: 'Maria',
        content: 'Como faz pra dar palmas?'
      }
]

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/posts", (req,res) => {
    let newPost = req.body;
    newPost = {...newPost, id: posts.length +1, contentPreview: "", commentCount: 0}
    posts.push(newPost);
    res.send("post adicionado");
});

app.get("/posts/:id", (req, res) => {
    const id =  req.params.id;
    const response = posts.find(n => n.id == id);   
    res.send(response);
});

app.delete("/posts/:id", (req, res) => {
    const id =  req.params.id;
    posts = posts.filter(n => n.id != id);  
    res.send(posts);
});

app.put("/posts/:id", (req, res) => {
    const id =  req.params.id;
    const editInfo = req.body;
    const {content, coverUrl, title} = editInfo
    let editPost = posts.find(n => n.id == id);
    editPost = {...editPost, id: id, content: content, coverUrl: coverUrl, title: title}
    posts = posts.filter(n => n.id != id);  
    posts.push(editPost);
    res.send(posts);
});

app.get("/posts/:id/comments", (req, res) => {
    const id = req.params.id;
    const response = comments.filter(n => n.postId == id);
    res.send(response)
})

app.post("/posts/:id/comments", (req, res) => {
    const id = req.params.id;
    let newComment = req.body;
    newComment = {... newComment, postId: id, id: comments.length + 1};
    comments.push(newComment);
    let commentPost = posts.find(n => n.id == id);
    commentPost = {...commentPost, id: id, commentCount: commentPost.commentCount +1};
    posts = posts.filter(n => n.id != id);  
    posts.push(commentPost);
    res.send(newComment);
})

app.listen(4000);