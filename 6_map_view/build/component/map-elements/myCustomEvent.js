export class myCustomEvent extends CustomEvent{
    constructor(type,dict,data){
        super(type,dict)
        this.data=data
    }
}