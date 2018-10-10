module.exports = function (){

        async function index(req, res, next) {

            try {
           
              res.render("home");
            } catch (error) {
          
              next(error);
            }     
    }
    async function display(req, res, next) {
      try {
        // get the values from the form (req.body)
        var language = req.body.language;
        var firstName = req.body.firstName;
        console.log(language)
    
        if (!language && firstName !=='') {
          req.flash('info', ' select a language');
        }  
        if (firstName == '') {
          req.flash('info', ' enter a name ');
        }else{
          var displaymessage = await factory.GreetLanguage(language, firstName);
          var  counterdisplay = await factory.Counter();
        }   
        res.render('home', {displaymessage ,counterdisplay})
      } catch (error) {
     
        next(error)
      }
    }
    return {
        index,
        display
    }
}