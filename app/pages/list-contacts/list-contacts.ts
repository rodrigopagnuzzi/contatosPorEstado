import { Component, ViewChild } from '@angular/core';
import { NavController, VirtualScroll,  NavParams,Platform, Content, ViewController, PopoverController  } from 'ionic-angular';
import { Contact, NativeStorage } from 'ionic-native';
import {ContactsService} from '../../providers/contacts-service';
import {State} from '../../interface/state-interface';
import {OptionsPage} from '../options/options';
import {DetailsContactsPage} from '../details-contacts/details-contacts';
import {DomSanitizationService} from '@angular/platform-browser';

/*
  Generated class for the ListContactsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/list-contacts/list-contacts.html',
  providers: [ContactsService]
})
export class ListContactsPage   {
      @ViewChild(Content) content: Content;
    

  loading: boolean;
  noContact: boolean = false;
  groupedContacts = [];
  alphabet: Promise<string[]>;
  list_index_margin: any;
  isIOS: boolean;
  list_index_visibility: any;
   itensCount = new Array<number>() ;

  


 

  constructor( private sanitizer:DomSanitizationService,private popoverCtrl: PopoverController, private platform: Platform,  private viewCtrl: ViewController ,private navCtrl: NavController, public contactsService : ContactsService, private navParams: NavParams) {

    if(platform.is('ios'))
      this.isIOS = true;

    this.loading = true;
    this.list_index_visibility = 'hidden';
   
    if(navParams.get('city') != null)
    this.arrangeContacts( navParams.get('city'));
  

    else {

    NativeStorage.getItem('state').then(
    data => { 

      this.arrangeContacts(data.property);
   },
      
    error =>{ console.error(error) }
  );
    }
  }
  
  arrangeContacts (myState: string){

     this.contactsService.arrangeContacts(myState).then( (contactStruct: { [key:string]:Contact[]; }) =>{

          this.groupContacts(contactStruct);
  this.enableLastContactTab()
    })   

  }

  
    gotoList(index){

       let move: number;
       let x = this.content.getContentDimensions().scrollHeight / this.itensCount[this.itensCount.length-1]

       if(index == 0){
            
             this.content.scrollTo(0,2).then ( () =>{
                
                                 
  });

      
       }

     
       else{
       move =  this.itensCount[index-1] * x;

     
          this.content.scrollTo(0,move).then ( (e) =>{

            console.log(e);
    
    
                     
         
             }); 
     
          
       }

      
     
      

    }


    enableLastContactTab (){

 this.navCtrl.parent.getByIndex(1).enabled = 'true'; 

    }

   

  getImgSanatized (contact : Contact) : any{

        if(contact.photos != null){
        let photo = contact.photos[0].value;
       
         return  this.sanitizer.bypassSecurityTrustUrl(photo);
        }

        return 'images/person_avatar.png';

     
  }

  selectContact(contact : Contact) {

    this.navCtrl.push(DetailsContactsPage, {
      contact: contact
     
        });

  }

   groupContacts(contactStruct : { [key:string]:Contact[]; }){

    
     
     let arr = new Array<string>();

     let totalItens = 0;

      if (Object.keys(contactStruct).length === 0)
        this.noContact = true;

        else

      for (var state in State) {
  
          var isValueProperty = parseInt(state, 10) >= 0

        if (isValueProperty) {
     
  if( contactStruct[State[state]] != null){

      totalItens += contactStruct[State[state]].length +1;
     this.itensCount.push( totalItens ) ; 

         
         arr.push(State[state]);
    

   let sortedContacts = contactStruct[State[state]].sort((a : Contact,b : Contact) => {
     if (a.name != null && b.name != null)
       if (a.name.formatted != null && b.name.formatted != null)
    return  a.name.formatted.localeCompare(b.name.formatted);
    
        return -1;
  
}); 

   

   let newGroup = {
                    letter: this.contactsService.stateShortToFull(State[state]),
                    contacts:sortedContacts  };

                     this.groupedContacts.push(newGroup);
       }
  
            
    };    
         }
          this.dynamicallyChangeCSS(arr);
         this.alphabet = Promise.resolve(arr);
        
         this.loading = false;
  
 
       
      
       }

   
      
 dynamicallyChangeCSS (indexArray : Array<string>){

   this.list_index_visibility = 'visible';

     let height =  this.content.getContentDimensions().scrollHeight / indexArray.length;
    
     if( this.platform.is('ios'))
     this.list_index_margin = height;

     else
      this.list_index_margin = height -2.5;
     

 }

 presentOptions(myEvent) {
    let popover = this.popoverCtrl.create(OptionsPage);
    popover.present({

       ev: myEvent
    });
    
  }
  
  
  savefn() {
     // this.navCtrl.push(AddcontactPage);
  }
  
  findfn(val) {  /* 
      Contacts.find(['*'], {filter: val}).then((contacts) => {
          this.contactsfound = contacts;
         console.log(contacts[25]);
         
      })
      
      if(this.contactsfound.length == 0)
      this.contactsfound.push({displayName: 'No Contacts found'});  
      this.search = true;     */
  }

}
