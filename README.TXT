//FRONTEND

El proyecto fue creado con el stack MERN( MongoBD, Express , React , Node)

La única configuración que requiere e proyécto para ser inicializado es:
Ejecutar la consola.

acceder a la carpeta donde se encuentra el archivo frontend y copiar la dirección

luego ejecutar el comando: cd %Ruta%
por ultimo ejecutar: npm start
por lo que se debe contar con el webpack npm

NOTA: Se debe tener instalado el packete "axios" pues este no viene predefinido con los modulos de node
para instalarlo se ejecuta el comando 
npm install axios

----------------------------------------------------------------------------------

//BACKEND


Para la parte del backend fueron necesarias multiples dependencias 
las cuales se encuentran en el archivo "packaje.json"
pero si no se reconoce alguna de las que use aqui las escribo

-cors
-moongose
-body-parser
-express

Si no poseen alguna dependencia la puede instalar por medio de npm install y el nombre de la dependencia

Se debe tener instalado mongodb y ejecutar en la consola el comando: mongod
luego se debe ejecutar el comando: mongo
y crear la base de datos por medio del comando:

use task

NOTA: Es importante que la base de datos se llame "task" por la configuración actual del proyecto
Tambien el puerto predefinido en el codigo es el puerto: 4000



ahora para el servidor se utilizó nodemon en mi caso lo tenía instalado de manera global
por lo que si desean instalarlo el comando es: npm install -g nodemon

y ejecutar el siguiente comando: cd mas ruta donde se encuentra el documento llamado "backend"
un ejemplo seria: cd C:\Users\energ\OneDrive\Documents\pruebaTecnica\backend


Y ejecutar el comando: nodemon server
Si se inicializó correctamente debe mostrar el mensaje 
"MongoDB database connection established successfully"

Ahora si la configuración se logro satisfactoriamente el CRUD deberia funcionar correctamente.


-------------------------------------------------------------------------------------------
Gracias por la oportunidad y espero valoren el gran esfuerzo que llevo realizar este CRUD
Espero les guste.

Att: Juan Felipe Gonzalez Ortiz