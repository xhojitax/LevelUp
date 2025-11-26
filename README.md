# 🎮 LevelUp - Tienda Gaming Full Stack

Proyecto académico de e-commerce gaming con frontend React y backend Spring Boot + MySQL.

---

## 📂 Estructura del Proyecto
```
LevelUp/
├── levelup-backend/          # Backend Spring Boot + MySQL
├── react-app/                # Frontend React + Bootstrap
└── Level Up/                 # Versión HTML original
```

---

## 🚀 Inicio Rápido

### Prerrequisitos

**Para trabajar en el FRONTEND (React):**
- ✅ Node.js 22 LTS - [Descargar](https://nodejs.org/)
- ✅ Git

**Para trabajar en el BACKEND (Spring Boot):**
- ✅ Java 21 - [Descargar](https://www.oracle.com/java/technologies/downloads/#java21)
- ✅ Maven 3.9+ - [Descargar](https://maven.apache.org/download.cgi)
- ✅ MySQL 8.0 - [Descargar](https://dev.mysql.com/downloads/mysql/)

---

## 👥 Guía para el Equipo

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/xhojitax/LevelUp.git
cd LevelUp
```

### 2️⃣ Trabajar en el Frontend (React)

**Abrir VS Code:**
- Click derecho en la carpeta `react-app`
- **"Open in Integrated Terminal"**

**Instalar dependencias (solo primera vez):**
```bash
npm install
```

**Ejecutar el frontend:**
```bash
npm start
```

✅ **Frontend:** `http://localhost:3000`

**Ejecutar tests:**
```bash
npm test
```

---

### 3️⃣ Trabajar en el Backend (Spring Boot)

⚠️ **Solo si necesitas trabajar en el backend.**

**Leer la documentación completa:**
📖 **[levelup-backend/README.md](levelup-backend/README.md)**

**Resumen rápido:**

1. **Configurar MySQL:**
```sql
CREATE DATABASE levelup_local;
CREATE USER 'levelup_dev'@'localhost' IDENTIFIED BY 'LevelUp2024!Dev';
GRANT ALL PRIVILEGES ON levelup_local.* TO 'levelup_dev'@'localhost';
```

2. **Ejecutar el backend:**
```bash
cd levelup-backend
mvn spring-boot:run -Dmaven.test.skip=true
```

✅ **Backend:** `http://localhost:8080`  
📚 **Swagger:** `http://localhost:8080/swagger-ui.html`

---

## 🔗 Integración Frontend + Backend

**Cuando ambos estén corriendo:**
- Frontend en `http://localhost:3000` consume API del backend
- Backend en `http://localhost:8080` responde peticiones

**El frontend ya está configurado** para conectarse al backend en `react-app/.env`

---

## 📝 Flujo de Trabajo con Git

### Antes de empezar a trabajar:
```bash
git pull
```

### Después de hacer cambios:
```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

---

## 🔐 Credenciales

### Backend - Spring Security
- **Usuario:** `admin`
- **Contraseña:** `admin`

### Base de Datos MySQL
- **Database:** `levelup_local`
- **Usuario:** `levelup_dev`
- **Contraseña:** `LevelUp2024!Dev`

---

## 👥 Equipo

- **Rodrigo** - Full Stack Development
- **Romina Baeza** - Frontend Development
- **Angelica Trujillo** - Frontend Development

---

## 📞 Soporte

Si tienes problemas, consulta:
1. **Frontend:** Documentación en `react-app/`
2. **Backend:** Documentación en `levelup-backend/README.md`
3. Contacta al equipo en WhatsApp

---

## 🎓 Proyecto Académico

**Curso:** Desarrollo Full Stack II  
**Fecha:** Noviembre 2025