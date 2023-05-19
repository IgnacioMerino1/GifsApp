import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

    public gifList: Gif[] = [];

    private _tagsHistory: string[] = [];
    private apiKey: string = 'dGMJW12nlHSz46O3sy81BZFryoPshmUk'
    private serviceURL: string = 'https://api.giphy.com/v1/gifs';

    constructor( private http: HttpClient) { }
    
    get tagsHistory() {
        // Como se pasa por referencia, lo podrian modificar
        //return this._tagsHistory;

        // Mejor devolver una copia
        return [...this._tagsHistory];
    }

    private organizeHistory(tag: string) {
        tag = tag.toLowerCase();

        if(this.tagsHistory.includes(tag)) {
            this._tagsHistory = this._tagsHistory.filter( (oldTag) => (oldTag !== tag) );
        }

        this._tagsHistory.unshift(tag);
        this._tagsHistory = this._tagsHistory.splice(0,10);
    }

    public searchTag( tag:string ):void  {

        if (tag.length ===0 ) return;
        this.organizeHistory(tag);

        console.log(this._tagsHistory);

        const params = new HttpParams()
            .set('api_key',this.apiKey)
            .set('limit','10')
            .set('q',tag);


        this.http.get<SearchResponse>(`${ this.serviceURL }/search`, { params })
            .subscribe(resp => { 
                console.log(resp);
                this.gifList = resp.data;
                console.log( { gifs: this.gifList } ) ;
            });


    }
}