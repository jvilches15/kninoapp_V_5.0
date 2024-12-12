import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class KninodbService {
  public dbInstance!: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.initializedDatabase();
  }

  
  async initializedDatabase() {
    try {
      if (!this.dbInstance) {
        this.dbInstance = await this.sqlite.create({
          name: 'kninodatabase.db',
          location: 'default',
        });
        await this.CreateTables();
      }
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }

  
  async CreateTables() {
    try {
      await this.dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS usuario(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT,
          apellido TEXT,
          email TEXT UNIQUE,
          password TEXT,
          direccion TEXT,
          fechaNac TEXT
        )`, []
      );

      await this.dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS mascota(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT,
          raza TEXT,
          edad TEXT,  
          usuarioId INTEGER,
          FOREIGN KEY(usuarioId) REFERENCES usuario(id)
        )`, []
      );

      console.log('Tablas creadas con éxito');
    } catch (error) {
      console.error('Error al crear las tablas:', error);
    }
  }

  
  getUsuarioId(email: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id FROM usuario WHERE email = ? LIMIT 1';
      this.dbInstance.executeSql(query, [email])
        .then((res) => {
          if (res.rows.length > 0) {
            resolve(res.rows.item(0).id);
          } else {
            reject('Usuario no registrado');
          }
        })
        .catch((error) => reject(error));
    });
  }

  
  async insertUsuario(usuario: any): Promise<void> {
    const query = 'INSERT INTO usuario (nombre, apellido, email, password, direccion, fechaNac) VALUES (?, ?, ?, ?, ?, ?)';
    try {
      await this.dbInstance.executeSql(query, [
        usuario.nombre,
        usuario.apellido,
        usuario.email,
        usuario.password,
        usuario.direccion,
        usuario.fechaNac
      ]);
      console.log('Usuario insertado con éxito');
    } catch (error) {
      console.error('Error al insertar el usuario:', error);
      throw new Error('Error al insertar el usuario');
    }
  }

  
  async insertMascota(mascota: any, usuarioId: number) {
    const query = 'INSERT INTO mascota (nombre, raza, edad, usuarioId) VALUES (?, ?, ?, ?)';
    try {
      await this.dbInstance.executeSql(query, [
        mascota.nombre,
        mascota.raza,
        mascota.edad,
        
        usuarioId
      ]);
      console.log('Mascota insertada con éxito');
    } catch (error) {
      console.error('Error al insertar la mascota:', error);
    }
  }
  
}
