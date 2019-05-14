import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  actionUrl = 'http://localhost:3001/backend/';
  objectName = 'units';

  constructor(private _http: HttpClient) {
  }

  getAll(filter): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = new HttpParams().set('filter', filter);
      this._http.get(`${this.actionUrl}${this.objectName}/list`, {params: {param: JSON.stringify(filter)}})
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

  save(obj) {
    return new Promise((resolve, reject) => {
      this._http.post(`${this.actionUrl}${this.objectName}`, obj)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  file(obj) {
    return new Promise((resolve, reject) => {
      this._http.post(`${this.actionUrl}${this.objectName}/file`, obj)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  update(obj) {
    return new Promise((resolve, reject) => {
      this._http.put(`${this.actionUrl}${this.objectName}/${obj.id}`, obj)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  delete(obj) {
    return new Promise((resolve, reject) => {
      this._http.delete(`${this.actionUrl}${this.objectName}/${obj.id}`, obj)
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
