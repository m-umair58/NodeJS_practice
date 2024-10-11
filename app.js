const readline = require('readline');
const fs = require('fs');
const http = require('http');
const url = require('url')
// const rl = readline.createInterface({
//     input:process.stdin,
//     output:process.output
// });

// rl.question("Please Enter your full name : ",(name)=>{
//     console.log("You entered the name : "+name);
//     rl.close();
// })

// rl.on('close',()=>{
//     console.log("Interface closed");
//     process.exit(0);
// })

// let textIn = fs.readFileSync('./Files/input.txt','utf-8')
// console.log(textIn)

// let content = `Data read from input.txt:${textIn}\nDate created ${new Date()}`
// fs.writeFileSync('./Files/output.txt',content)

//***********creating as basic server *********/
// const server = http.createServer((request,response) =>{
//     response.end("hello from the sersver!")
//     console.log('a new request has been received')
// });

// server.listen(8000,'127.0.0.1',()=>{
//     console.log('server has been started!')
// })
//******************************************** */

const html = fs.readFileSync('./Template/index.html','utf-8');
let products = JSON.parse(fs.readFileSync('./Data/products.json','utf-8'));
let productListHtml = fs.readFileSync('./Template/products-list.html','utf-8')


let productHtmlArray = products.map((prod)=>{
    let output = productListHtml.replace('{{%IMAGE%}}',prod.image);
    output = output.replace('{{%NAME%}}',prod.name)
    output = output.replace('{{%MODELNAME%}}',prod.modelname)
    output = output.replace('{{%MODELNUMBER%}}',prod.modelnumber)
    output = output.replace('{{%PRICE%}}',prod.price)
    output = output.replace('{{%COLOR%}}',prod.color)
    output = output.replace('{{%ID%}}',prod.id)

    return output
})

const server = http.createServer((request,response) =>{
    let {query,pathname:path} =url.parse(request.url,true);
    // let path = request.url;
    if(path === '/'|| path.toLocaleLowerCase() ==='/home'){
        response.writeHead(200,{
            'Content-Type':'text/html',
            'my-header':'Hello:World'
        });
        response.end(html.replace('{{%Content%}}',"You are in home page"))
    }else if (path.toLocaleLowerCase() ==='/about'){
        response.writeHead(200,{
            'Content-Type':'text/html',
            'my-header':'Hello:World'
        });
        response.end(html.replace('{{%Content%}}','You are in about page!'))
    }else if(path.toLocaleLowerCase()==='/contact'){
        response.writeHead(200,{
            'Content-Type':'text/html',
            'my-header':'Hello:World'
        });
        response.end(html.replace('{{%Content%}}','You are in contact page!')
        )
    }else if(path.toLocaleLowerCase()==='/products'){
        if(!query.id){
            let productResponseHtml = html.replace('{{%Content%}}',productHtmlArray.join(','))
            response.writeHead(200,{'Content-Type':'text/html'});
            response.end(productResponseHtml)
        }
        else{
            response.end("This is a product with id "+query.id)
        }
    }else{
        response.writeHead(404,{
            'Content-Type':'text/html',
            'my-header':'Hello:World'
        })
        response.end(html.replace('{{%Content%}}',"Error 404: Page not found!"))
    }
});

server.listen(8000,'127.0.0.1',()=>{
    console.log('server has been started!')
})
