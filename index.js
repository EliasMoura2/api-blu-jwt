// if(process.env.NODE_ENV !== 'production'){
  // require('dotenv').config();
// }

const app = require('./app')

app.set('port', process.env.PORT || 4000)

const port = app.get("port")

// app.listen(port, () => {
//   console.log(`Server listen on port = ${port}`)
// })

async function init(){
  await app.listen(port, () => {
    console.log(`Server running on port = ${port}`);
  });
}

init();