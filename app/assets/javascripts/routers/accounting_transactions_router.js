Wavelineup.Routers.AccountingTransactions = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  initialize: function(){
    this.collection = new Wavelineup.Collections.AccountingTransactions();
    this.collection.fetch();
  },

  index: function(){
    var view = new Wavelineup.Views.AccountingTransactionsIndex({collection: this.collection})
    $('#container').html(view.render().el);
  }
});
