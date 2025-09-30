# Prueba tecnica Dasboard IoT Deliryum
## Herramientas usadas
- **Visual Studio Code**: Editor de código fuente.
- **Node.js**: Entorno de ejecución para JavaScript.
- **NestJS**: Framework para construir aplicaciones backend escalables.
- **PostgreSQL**: bases de datos relacional.
- **Angular**: Framework para construir aplicaciones web.
- **Docker**: Plataforma para desarrollar, enviar y ejecutar aplicaciones en contenedores.
- **WebSocket**: Protocolo para comunicación en tiempo real.
## Descripción del proyecto
**Modulos que componen el proyecto:**
- ***prueba-tecnica-iot-backend***: API RESTful construida con NestJS para gestionar dispositivos IoT y almacenar datos en PostgreSQL.
- ***prueba-tecnica-iot-frontend***: Aplicación web construida con Angular para visualizar y gestionar dispositivos IoT a través de una interfaz de usuario.
- ***n8n***: **(Simulador de dispositivos vida real)**: Flujos de automatización en http://localhost:5678 para procesar logs, generar métricas y gestionar dispositivos específicos. Incluye workflows preconfigurados en n8n_workflows/.
- ***PostgreSQL***: Base de datos robusta para almacenar datos de dispositivos y logs.
## Requisitos previos
- **Docker**: Asegúrate de tener Docker instalado en tu máquina. Puedes descargarlo desde [aquí](https://www.docker.com/get-started).
- Tambien se recomienda usar Docker Desktop para una mejor experiencia.
## Configuración del entorno de desarrollo
1. Clona el repositorio:
   ```bash
   git clone https://github.com/matcubillos/proyecto-prueba-tecnica-iot.git
   cd proyecto-prueba-tecnica-iot
   ```
2. Abre tu terminal favorita en la carpeta del proyecto: **proyecto-prueba-tecnica-iot**.
3. Construye y levanta los contenedores de Docker:
   ```bash
   docker-compose up --build
   ```
4. Espera a que los contenedores se inicien correctamente. Esto puede tardar unos minutos la primera vez.
5. Una vez que los contenedores estén en funcionamiento, puedes acceder a las siguientes aplicaciones:
   - Abre tu navegador web y ve a `http://localhost:4200` para acceder al dashboard de IoT.
    - La API de NestJS estará disponible en `http://localhost:3000`.

6. Para comenzar a usar **n8n**, recibir métricas constantes e inserciones de logs, debes acceder a `http://localhost:5678` y configurar una cuenta (solo la primera vez).  

    Ingresa en el formulario:  
    - **Email:** `admin@localhost.admin`  
    - **First Name:** `Admin`  
    - **Last Name:** `User`  
    - **Password:** `Admin123`  

    Accede a **Get Started** y luego selecciona **Skip**.  

    Importa los workflows:  
    - Haz clic en **Create Workflow** (arriba a la derecha en botón naranja).  
    - Selecciona los **tres puntos verticales** de la esquina superior derecha.  
    - Selecciona **Import from file** y elige un archivo de la carpeta **`n8n_workflows/`** (ubicada en la raíz del proyecto).  
    - Importa **un workflow a la vez**.  
    - Una vez cargado, activa el workflow con el botón **switch** de la esquina superior derecha (dice **Inactive**, cámbialo a **Active**) y confirma con **Got It!**.  
    - Vuelve a la sección **Workflows** y repite el proceso con los demás workflows.  


7. Listo. Ya tienes todo configurado y funcionando. Puedes comenzar y probar tu dashboard de IoT. El apartado de "Conexion en terreno" comenzará a recibir nuevos logs conexión
Y el apartado de "Métricas" comenzará a actualizarse con datos procesados. Incluido el gráfico individual y ultimas metricas de cada dispositivo individual.

## Funcionamiento del proyecto
### Sidebar
- La barra lateral izquierda muestras las  estadísticas generales de todos los dispositivos IoT activos.
- Puedes ver las lista específica de dispositivos IoT en la sección "Tipos de dispositivos".
- En el pie de la barra lateral izquierda, puedes acceder a revisar la Conexion en terreno de los dispositivos IoT. Esta mostrará los logs de conexión y desconexión y filtrarlos por dispositivo. Útil para verificar si se realizó efectivamente la conexión o desconexión de un dispositivo IoT.

### Dashboard principal
* Dashboard con tarjetas de dispositivos mostrando estado(verde/rojo/amarillo) y si están Online/Offline.
* Filtros: por tipo de dispositivo, estado, y búsqueda por nombre
#### Métricas Detalladas
Click en el ícono "ojo" de cada dispositivo abre modal con:

* Tabla con últimas 2 métricas recibidas,

* Gráfico histórico interactivo (últimas 50 métricas)

**El gráfico se actualiza en tiempo mientras está abierto**

**La tabla muestra las últimas 2 métricas recibidas en tiempo real**
