export class SecureAreaPage{
    constructor(page){
        this.page = page;
        this.displayedText = page.locator('#flash b');
    }
}