import { Contacts, Contact } from 'ionic-native';

export class CityToStateUtil {

     static contactsStruct: { [key:string]:Contact[]; } = {};

    constructor() {

       
    }



  public static  rearrangeTelephoneNumbers(contact: Contact[], myState : string ){
        CityToStateUtil.contactsStruct = {};

       let resp :string;

        for(let i = 0; i < contact.length; i++){

       
                            if(contact[i].phoneNumbers != null){

        for(let j = 0; j < contact[i].phoneNumbers.length; j++){

    let tel = contact[i].phoneNumbers[j].value.replace(/[{()}]/g, '').replace(/ /g,'').replace(/-/g, "").trim();
 
     if(tel.length >= 8){
          
           if(tel.indexOf('+') > -1){           
               
             if(tel.substr(tel.indexOf('+')+1,2).localeCompare('55') == 0){
         
                    if (tel.charAt(tel.indexOf('+')+3) == '0'){

                if(tel.length > 15) {
                                        // Ex: +5502121 xxxxx-xxxx
                     resp =  this.findStateFromTelephoneNumber(tel.substr(tel.indexOf('+')+6,2));
                    
                     
                  this.initializeArray(contact[i], resp.substring(resp.length-3));
                  break;

                }
                    else{
                         // Ex: +55021 xxxxx-xxxx
                  resp =  this.findStateFromTelephoneNumber(tel.substr(tel.indexOf('+')+4,2));
                 
                  this.initializeArray(contact[i], resp.substring(resp.length-3));
                  break;
                    }

                    }
                  

                    else if(tel.length == 11 || tel.length == 12){

                         // Ex: +55 xxxxx-xxxx
                         this.initializeArray(contact[i], myState);
                    break;
                    }
                        
                       else {
                         // Ex: +5521 xxxxx-xxxx
                  resp =  this.findStateFromTelephoneNumber(tel.substr(tel.indexOf('+')+3,2));
                  
                  this.initializeArray(contact[i], resp.substring(resp.length-3));
                    break;

               

                    }
                     

             }
             else{
                        // gringa
                      this.initializeArray(contact[i], "##");
                        break;
                  
             }
           }

             else if (tel.charAt(0) == '0'){

                 if(tel.substr(0,2).localeCompare("00") == 0){

                        // Ex: 0047... gringa
                    this.initializeArray(contact[i], "##");
                        break;
                  
                 }
                else if(tel.length > 12) {

                           // Ex: 02121 xxxxx-xxxx
                     resp =  this.findStateFromTelephoneNumber(tel.substr(3,2));
                    
                  this.initializeArray(contact[i], resp.substring(resp.length-3));
                  break;

                }
                else{
                         // Ex: 021 xxxxx-xxxx
                     resp =  this.findStateFromTelephoneNumber(tel.substr(1,2));
                     
                        this.initializeArray(contact[i], resp.substring(resp.length-3));
                          break;
                  
                }
             }
             else if (tel.length == 8 || tel.length == 9){

                   // Ex: xxxxx-xxxx

                  this.initializeArray(contact[i], myState);
                    break;

              

             }
             else if (tel.length == 10 || tel.length == 11){

                         // Ex: 21 xxxxx-xxxx
                    resp =  this.findStateFromTelephoneNumber(tel.substr(0,2));
                    
                    
                        this.initializeArray(contact[i], resp.substring(resp.length-3));
                          break;

             
             }
             
             else{
                       // o que sobrar é gringo
                        this.initializeArray(contact[i], "##");
                       
                          break;

             }
             
     }     
    }
            }
        }              
                      
                    } 


    
     public static  findStateFromTelephoneNumber(ddd : string) : string {

     
      

        let dddNumber = Number.parseInt(ddd);

        if( dddNumber == 68)
        return "Acre - AC";

        else if (dddNumber == 82)
        return "Alagoas - AL";

        else if (dddNumber == 96)
        return "Amapá - AP";

        else if (dddNumber == 92 || dddNumber == 97)
        return "Amazonas - AM";

         else if (dddNumber == 71 || (dddNumber > 72 && dddNumber < 76) || dddNumber == 77 )
        return "Bahia - BA";

          else if (dddNumber == 85 ||  dddNumber == 88 )
        return "Ceará - CE";

          else if (dddNumber == 27 ||  dddNumber == 28 )
        return "Espírito Santo - ES";

          else if (dddNumber == 61 ||  dddNumber == 62 ||  dddNumber == 64 )
        return "Goiás - GO";

           else if (dddNumber == 98 ||  dddNumber == 99 )
        return "Maranhão - MA";

               else if (dddNumber == 65 ||  dddNumber == 66 )
        return "Mato Grosso - MT";

        else if (dddNumber == 67)
        return "Mato Grosso do Sul - MS";


         else if (dddNumber == 37 || (dddNumber > 30 && dddNumber < 36) || dddNumber == 38 )
        return "Minas Gerais - MG";

            else if (dddNumber == 91 ||  dddNumber == 93 ||  dddNumber == 94 )
        return "Pará - PA";

         else if (dddNumber == 83)
    
        return "Paraíba - PB";

        else if ( (dddNumber > 40 && dddNumber < 47)  )
        return "Paraná - PR";

               else if (dddNumber == 81 ||  dddNumber == 87 )
        return "Pernambuco - PE";

         else if (dddNumber == 86 ||  dddNumber == 89 )
        return "Piauí - PI";

         else if (dddNumber == 21 ||  dddNumber == 22 ||  dddNumber == 24 )
        return "Rio de Janeiro - RJ";

         else if (dddNumber == 84)
    
        return "Rio Grande do Norte - RN";

          else if (dddNumber == 51 ||  (dddNumber > 52 && dddNumber < 56))
        return "Rio Grande do Sul - RS";

          else if (dddNumber == 69)
    
        return "Rondônia - RO";

          else if (dddNumber == 95)
    
        return "Roraima - RR";

         else if (dddNumber == 47 ||  dddNumber == 48 ||  dddNumber == 49 )
        return "Santa Catarina - SC";


        else if (dddNumber > 10 && dddNumber < 20  )
        return "São Paulo - SP";

          else if (dddNumber == 79)
    
        return "Sergipe - SE";

           else if (dddNumber == 63)
    
        return "Tocantins - TO";

        return "## - ##";

      


    }

   private static  initializeArray(c: Contact, est: string){

      

      let e = est.replace(/ /g,'');
      
     
     if(CityToStateUtil.contactsStruct[e] == null){
        CityToStateUtil.contactsStruct[e]= new Array<Contact>();
        CityToStateUtil.contactsStruct[e].push(c)
     }

        else{
            CityToStateUtil.contactsStruct[e].push(c)
        }

    }


     public static  stateShortToFull (state: string){


        switch(state){

            case "AC":
            return "Acre";
             case "AL":
            return "Alagoas";
             case "AP":
            return "Amapá";
             case "AM":
            return "Amazonas";
             case "BA":
            return "Bahia";
             case "CE":
            return "Ceará";
             case "DF":
            return "Distrito Federal";
             case "ES":
            return "Espírito Santo";
             case "GO":
            return "Goiás";
             case "MA":
            return "Maranhão";
             case "MT":
            return "Mato Grosso";
             case "MS":
            return "Mato Grosso do Sul";
             case "PA":
            return "Pará";
             case "PB":
            return "Paraíba";
             case "PR":
            return "Paraná";
             case "PE":
            return "Pernambuco";
             case "PI":
            return "Piauí";
             case "RJ":
            return "Rio de Janeiro";
             case "RN":
            return "Rio Grande do Norte";
             case "RS":
            return "Rio Grande do Sul";
             case "RO":
            return "Rondônia";
             case "RR":
            return "Roraima";
             case "SC":
            return "Santa Catarina";
             case "SP":
            return "São Paulo";
             case "SE":
            return "Sergipe";
                case "TO":
            return "Tocantins";
                 case "##":
            return "Outros Países";

        }


    }


    
       

      

}
