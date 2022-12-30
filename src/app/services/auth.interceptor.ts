import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HTTP_INTERCEPTORS} from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginService } from './login.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(private login:LoginService){

    }
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
        ):
         Observable<HttpEvent<any>> {
        //adding the jwt token (LocalStorage) requset
        let authReq = req;
        const token = this.login.getToken();
        console.log("Inside interceptor!")
        if(token!=null){
            authReq = authReq.clone({setHeaders:{ Authorization: `Bearer ${token}` },
        });
        }
        return next.handle(authReq)

    }

    
}

export const authInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    }


]