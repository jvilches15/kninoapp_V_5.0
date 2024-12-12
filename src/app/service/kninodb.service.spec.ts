import { TestBed } from '@angular/core/testing';
import { KninodbService } from './kninodb.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { of } from 'rxjs';


class MockSQLite {
  create(config: any): Promise<SQLiteObject> {
    
    return Promise.resolve({
      executeSql: jasmine.createSpy('executeSql').and.callFake((query: string, params: any[]) => {
        
        if (query.startsWith('SELECT id FROM usuario WHERE email')) {
          return Promise.resolve({ rows: { length: 1, item: () => ({ id: 1 }) } });
        }
        return Promise.resolve({ rows: { length: 0, item: () => ({}) } });
      })
    } as unknown as SQLiteObject); 
  }
}

describe('KninodbService', () => {
  let service: KninodbService;
  let sqlite: SQLite;
  let dbInstance: SQLiteObject;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        KninodbService,
        { provide: SQLite, useClass: MockSQLite } 
      ]
    });
    service = TestBed.inject(KninodbService);
    sqlite = TestBed.inject(SQLite);
  });

  it('debe inicializar la base de datos correctamente', async () => {
    
    const createSpy = spyOn(sqlite, 'create').and.callThrough();
    
    await service.initializedDatabase(); 
    expect(createSpy).toHaveBeenCalledWith({
      name: 'kninodatabase.db',
      location: 'default'
    }); 
  });


});

