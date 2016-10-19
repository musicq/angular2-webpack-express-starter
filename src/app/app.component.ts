import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title: string;

    constructor(private http: Http) {}
    
    ngOnInit() {
        this.http.get('/api/example/example-api')
            .map((res: Response) => {
                console.log(res);
                let body = res.text();
                return body || '';
            })
            .subscribe(title => {
                console.log(title);
                this.title = title;
            });
        
    
        let body = JSON.stringify({
            params1: 'this is params1',
            params2: 'this is params2'
        });
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({
            headers: headers
        });
        
        this.http.post('/api/example/example-api', body, options)
            .map((res: Response) => {
                console.log(res);
                let _body = res.json();
                return _body || '';
            })
            .subscribe(resData => {
                console.log(resData);
            });
    }
}
