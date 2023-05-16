const http = require("http");
const {randomUUID} = require("crypto"); /*Cria um id randomico */

/*
* GET - Buscar um dado
* POST - Inserir um dado
* PUT - Alterar um dado
* DELETE - Deletar um dado
*/ 


const users = []; /*array de usuarios */


const server = http.createServer((request, response) => { 

    
    if(request.url === "/users"){
        if(request.method === 'GET'){
            return response.end(JSON.stringify(users));
        }
        if(request.method === 'POST'){
            request.on('data', (data) => {
               
                const dataUser = JSON.parse(data);

                const user = {
                    id: randomUUID(),
                    ...dataUser

                }

                users.push(user);
            }).on("end",() =>{
                return response.end(JSON.stringify(users));/*Retorna a resppsta após todo o processamento*/
            });/*Atraves do request.on('data') -> conseguimos pegar as informações da body*/ 
            
            
        };
        if(request.url.startsWith("/users")){
            if(request.method === "PUT"){
                const url = request.url;
                const splitUrl = url.split('/');
                

                const idUser = splitUrl[2];
                const userIndex = users.findIndex((user) => user.id === idUser);

                request
                .on("data", (data) =>{
                    const dataUser = JSON.parse(data);

                    users[userIndex] = {
                        id: idUser,
                        ...dataUser
                    }

                }).on("end", () =>{
                    return response.end(JSON.stringify(users));
                })
            }
        };
    };
}); 

server.listen(4000, ()=> console.log('Server is running on PORT 4000'));

