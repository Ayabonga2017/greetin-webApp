module.exports = function (){

        async function index_routes(req, res, next) {

            try {
           
              res.render("home");
            } catch (error) {
          
              next(error);
            }     
    }

    return {
        index_routes
    }
}