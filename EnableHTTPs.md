# Enabling HTTPS
View: [https://medium.com/quick-code/spring-boot-how-to-secure-rest-api-with-https-54ec8f0e4796]  How to secure REST API with HTTPS

To let the application run in HTTPS, we need to configure a certificate.

In production-grade applications, certificates are issued from renowned Certification Authorities (CA) to ensure that our application is a trusted entity.

However, as this is a tutorial, we will create a Self-Signed Certificate and use it in our application.

## How do we create it?
> Java provides the keytool utility to create and manage certificates locally. It’s available with other JDK utilities in JDK_HOME/bin directory.

### Step 1: Generate key  
Run the command prompt in administrator mode. Then execute this command line:

> keytool -genkey -keyalg RSA -alias tutorial -keystore tutorial.jks -storepass password -validity 365 -keysize 4096 -storetype pkcs12  

Comando que he lanzado:
> keytool -genkey -keyalg RSA -alias voteServer -keystore voteServer.jks -storepass v0t3S3rv3r -validity 365 -keysize 4096 -storetype pkcs12  

Here we are generating a certificate with the following options:

- Using the RSA algorithm
- Providing an alias name as tutorial
- Naming the Keystore file as tutorial.jks
- **Validity for one year**  
Once you hit this command, it will prompt a few details, and the certificate will be created.

### Step 2: Install de certificate  
Next, we copy this certificate in the src/main/resources directory to be available at the classpath.

### Step 3: Configurating Spring Boot  
Now, let’s add the following information in the Spring boot application.properties to enable TLS:

> server.ssl.key-store=classpath:tutorial.jks  
> server.ssl.key-store-type=pkcs12  
> server.ssl.key-store-password=password  
> server.ssl.key-password=password  
> server.ssl.key-alias=tutorial  
> server.port=8443  