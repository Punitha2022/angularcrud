import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
private apiURL="https://jsonplaceholder.typicode.com";

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<any>{
    return this.httpClient.get("http://localhost:8080/restapi/posts")
    .pipe(catchError(this.errorHandler));
  }

delete(id:number):Observable<any>{
  return this.httpClient.delete("http://localhost:8080/restapi/deletepost/"+id)
  
}


create(post:Post):Observable<any>{
  return this.httpClient.post("http://localhost:8080/restapi/savepost", post)
  
  .pipe(
    catchError(this.errorHandler)
  )
}
find(id:number): Observable<any> {
  
  return this.httpClient.get('http://localhost:8080/restapi/viewpost/' + id)

  .pipe(
    catchError(this.errorHandler)
  )
}
update(id:number, post:Post): Observable<any> {
  
  return this.httpClient.put(this.apiURL + '/posts/' + id, JSON.stringify(post))

  .pipe( 
    catchError(this.errorHandler)
  )
}
 
  errorHandler(error:any){
    let errorMessage='';
    if(error.error instanceof ErrorEvent)
    errorMessage=error.error.message;
    else
    errorMessage=`Error Code : ${error.status}\n Message:${error.message}`
    return throwError(()=> new Error(errorMessage));
  }
}
