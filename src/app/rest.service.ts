import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  actionUrl = 'http://localhost:3001/backend/';

  constructor(private _http: HttpClient) {
  }

  getAll(objectName, filter): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = new HttpParams().set('filter', filter);
      this._http.get(`${this.actionUrl}${objectName}/list`, {params: {param: JSON.stringify(filter)}})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }
  async getAllSync(objectName) {
    return await this._http.get(`${this.actionUrl}${objectName}`).toPromise();
  }

  save(objectName, obj) {
    return new Promise((resolve, reject) => {
      this._http.post(`${this.actionUrl}${objectName}/add`, obj)
        .subscribe(res => {
          resolve(res);
          console.log(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  update(objectName, obj) {
    return new Promise((resolve, reject) => {
      this._http.put(`${this.actionUrl}${objectName}/${obj.id}`, obj)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  delete(objectName, obj) {
    return new Promise((resolve, reject) => {
      this._http.delete(`${this.actionUrl}${objectName}/${obj.id}`, obj)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveMany(objectName, obj) {
    return new Promise((resolve, reject) => {
      this._http.post(`${this.actionUrl}${objectName}/insertMany`, obj)
        .subscribe(res => {
          resolve(res);
          console.log(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateMany(objectName, obj) {
    return new Promise((resolve, reject) => {
      this._http.post(`${this.actionUrl}${objectName}/updateMany`, obj)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteMany(objectName, obj) {
    return new Promise((resolve, reject) => {
      this._http.post(`${this.actionUrl}${objectName}/deleteMany`, obj)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getOne(id: number): Observable<any> {
    return this._http.get(`${this.actionUrl}${id}`) as Observable<any>;
  }

}
