import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
    selector: 'gifs-search-box',
    template: `
        <h5>Buscar:</h5>
        <input type="text"
            class="form-control"
            placeholder="Buscar gifs..."
            (keyup.enter)="searchTag( txtTagInput.value )"
            #txtTagInput
        >
    `
})

export class SearchBoxComponent {

    @ViewChild('txtTagInput')
    public tagInput!: ElementRef<HTMLInputElement>;

    constructor( private gifsService:GifsService ) { }

    searchTag(newTag: string):void {
        const newTag2 = this.tagInput.nativeElement.value;
        console.log(newTag);
        console.log(newTag2);

        this.gifsService.searchTag(newTag2);

        //Limpiar el input
        this.tagInput.nativeElement.value = '';
        
        
    }
}